const FONNTE_BASE_URL = "https://api.fonnte.com";

/**
 * =========================================================
 * FONNTE API TYPES
 * =========================================================
 */

type FonnteApiResponse = {
  status?: boolean;
  reason?: string;
  detail?: string;
  url?: string;

  device?: string;
  device_status?: string;
  name?: string;

  connected?: number;
  devices?: number;
  messages?: number;

  expired?: string;
  quota?: string;
  package?: string;
  autoread?: string;

  token?: string;

  data?: unknown;
};

/**
 * =========================================================
 * PUBLIC TYPES
 * =========================================================
 */

export type FonnteDevice = {
  device: string;
  name: string;
  status: string;
  expired: string;
  quota: string;
  package: string;
  autoread: string;
  token: string;
};

export type FonnteDevicesResult = {
  success: boolean;
  connected: number;
  devices: number;
  messages: number;
  data: FonnteDevice[];
  error: string | null;
};

export type FonnteDeviceStatus = {
  connected: boolean;
  phoneNumber: string | null;
  deviceName: string | null;
  error: string | null;
};

export type FonnteQrResult = {
  qr: string | null;
  alreadyConnected: boolean;
  error: string | null;
};

export type FonnteActionResult = {
  success: boolean;
  error: string | null;
};

export type FonnteCreateDeviceResult = {
  success: boolean;
  device: string | null;
  token: string | null;
  error: string | null;
};

/**
 * =========================================================
 * ACCOUNT TOKEN
 * =========================================================
 */

function getAccountToken(): string {
  const token =
    process.env.FONNTE_ACCOUNT_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "FONNTE_ACCOUNT_TOKEN belum diatur di environment variable server."
    );
  }

  return token;
}

/**
 * =========================================================
 * RESPONSE PARSER
 * =========================================================
 */

async function parseResponse(
  res: Response
): Promise<FonnteApiResponse> {
  let data: unknown;

  try {
    data = await res.json();
  } catch {
    throw new Error(
      `Fonnte mengembalikan response yang tidak valid. HTTP ${res.status}`
    );
  }

  if (
    typeof data !== "object" ||
    data === null ||
    Array.isArray(data)
  ) {
    throw new Error(
      `Response Fonnte bukan object JSON. HTTP ${res.status}`
    );
  }

  return data as FonnteApiResponse;
}

/**
 * =========================================================
 * ERROR MESSAGE
 * =========================================================
 */

function getErrorMessage(
  data: FonnteApiResponse,
  fallback: string
): string {
  return (
    data.reason ??
    data.detail ??
    fallback
  );
}

/**
 * =========================================================
 * NORMALIZE PHONE
 * =========================================================
 */

function normalizePhone(
  phone: string
): string {
  return phone
    .replace(/\D/g, "")
    .replace(/^0/, "62");
}

/**
 * =========================================================
 * PARSE DEVICE
 * =========================================================
 */

function parseDevice(
  value: unknown
): FonnteDevice | null {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const data =
    value as Record<string, unknown>;

  if (
    typeof data.device !== "string" ||
    typeof data.token !== "string"
  ) {
    return null;
  }

  return {
    device: data.device,

    name:
      typeof data.name === "string"
        ? data.name
        : "",

    status:
      typeof data.status === "string"
        ? data.status
        : "",

    expired:
      typeof data.expired === "string"
        ? data.expired
        : "",

    quota:
      typeof data.quota === "string"
        ? data.quota
        : "",

    package:
      typeof data.package === "string"
        ? data.package
        : "",

    autoread:
      typeof data.autoread === "string"
        ? data.autoread
        : "",

    token: data.token,
  };
}

/**
 * =========================================================
 * GET ALL DEVICES
 * =========================================================
 *
 * Account Token
 *
 * POST /get-devices
 */

export async function getDevices(): Promise<FonnteDevicesResult> {
  const res = await fetch(
    `${FONNTE_BASE_URL}/get-devices`,
    {
      method: "POST",

      headers: {
        Authorization: getAccountToken(),
      },

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  if (
    !res.ok ||
    data.status === false
  ) {
    return {
      success: false,
      connected: 0,
      devices: 0,
      messages: 0,
      data: [],
      error: getErrorMessage(
        data,
        "Gagal mengambil daftar device Fonnte."
      ),
    };
  }

  const rawDevices =
    Array.isArray(data.data)
      ? data.data
      : [];

  const devices = rawDevices
    .map(parseDevice)
    .filter(
      (
        device
      ): device is FonnteDevice =>
        device !== null
    );

  return {
    success: true,

    connected:
      Number(data.connected ?? 0),

    devices:
      Number(
        data.devices ??
          devices.length
      ),

    messages:
      Number(data.messages ?? 0),

    data: devices,

    error: null,
  };
}

/**
 * =========================================================
 * GET DEVICE BY NUMBER
 * =========================================================
 */

export async function getDevice(
  deviceNumber: string
): Promise<FonnteDevice | null> {
  const result =
    await getDevices();

  if (!result.success) {
    throw new Error(
      result.error ??
        "Gagal mengambil device Fonnte."
    );
  }

  const normalizedNumber =
    normalizePhone(deviceNumber);

  return (
    result.data.find(
      (device) =>
        normalizePhone(
          device.device
        ) === normalizedNumber
    ) ?? null
  );
}

/**
 * =========================================================
 * ADD DEVICE
 * =========================================================
 *
 * Account Token
 *
 * POST /add-device
 *
 * IMPORTANT:
 * `device` adalah identifier device Fonnte.
 * Tidak harus nomor WhatsApp yang akan discan.
 */

export async function addDevice(
  deviceNumber: string,
  name: string
): Promise<FonnteCreateDeviceResult> {
  const accountToken =
    getAccountToken();

  const device =
    deviceNumber.trim();

  const deviceName =
    name.trim();

  if (!device) {
    return {
      success: false,
      device: null,
      token: null,
      error:
        "Device identifier tidak boleh kosong.",
    };
  }

  if (
    device.length < 8 ||
    device.length > 15
  ) {
    return {
      success: false,
      device: null,
      token: null,
      error:
        "Device identifier harus memiliki 8–15 karakter.",
    };
  }

  if (
    !/^\d+$/.test(device)
  ) {
    return {
      success: false,
      device: null,
      token: null,
      error:
        "Device identifier harus berupa angka.",
    };
  }

  if (
    deviceName.length < 2 ||
    deviceName.length > 30
  ) {
    return {
      success: false,
      device: null,
      token: null,
      error:
        "Nama device harus 2–30 karakter.",
    };
  }

  const body =
    new URLSearchParams();

  body.set("device", device);
  body.set("name", deviceName);

  const res = await fetch(
    `${FONNTE_BASE_URL}/add-device`,
    {
      method: "POST",

      headers: {
        Authorization:
          accountToken,

        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body,

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  if (
    !res.ok ||
    data.status === false
  ) {
    return {
      success: false,
      device: null,
      token: null,
      error: getErrorMessage(
        data,
        "Gagal membuat device Fonnte."
      ),
    };
  }

  /**
   * Beberapa response API dapat mengembalikan
   * token/device secara langsung.
   *
   * Kalau tidak, kita ambil ulang daftar device
   * menggunakan Account Token.
   */

  let createdDevice =
    typeof data.device === "string"
      ? data.device
      : device;

  let createdToken =
    typeof data.token === "string"
      ? data.token
      : null;

  if (!createdToken) {
    const devices =
      await getDevices();

    if (devices.success) {
      const found =
        devices.data.find(
          (item) =>
            normalizePhone(
              item.device
            ) ===
            normalizePhone(
              createdDevice
            )
        );

      if (found) {
        createdDevice =
          found.device;

        createdToken =
          found.token;
      }
    }
  }

  if (!createdToken) {
    return {
      success: false,
      device: null,
      token: null,
      error:
        "Device berhasil dibuat, tetapi Device Token tidak berhasil diperoleh.",
    };
  }

  return {
    success: true,
    device: createdDevice,
    token: createdToken,
    error: null,
  };
}

/**
 * =========================================================
 * DEVICE STATUS
 * =========================================================
 *
 * Device Token
 *
 * POST /device
 */

export async function getDeviceStatus(
  deviceToken: string
): Promise<FonnteDeviceStatus> {
  const token =
    deviceToken.trim();

  if (!token) {
    return {
      connected: false,
      phoneNumber: null,
      deviceName: null,
      error:
        "Device token tidak tersedia.",
    };
  }

  const res = await fetch(
    `${FONNTE_BASE_URL}/device`,
    {
      method: "POST",

      headers: {
        Authorization: token,
      },

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  if (
    !res.ok ||
    data.status === false
  ) {
    return {
      connected: false,
      phoneNumber: null,
      deviceName: null,
      error: getErrorMessage(
        data,
        "Gagal mengambil status perangkat."
      ),
    };
  }

  return {
    connected:
      data.device_status ===
      "connect",

    phoneNumber:
      typeof data.device ===
      "string"
        ? data.device
        : null,

    deviceName:
      typeof data.name ===
      "string"
        ? data.name
        : null,

    error: null,
  };
}

/**
 * =========================================================
 * REQUEST QR
 * =========================================================
 *
 * Device Token
 *
 * POST /qr
 */

export async function requestQrCode(
  deviceToken: string
): Promise<FonnteQrResult> {
  const token =
    deviceToken.trim();

  if (!token) {
    return {
      qr: null,
      alreadyConnected: false,
      error:
        "Device token tidak tersedia.",
    };
  }

  const body =
    new URLSearchParams();

  body.set("type", "qr");

  const res = await fetch(
    `${FONNTE_BASE_URL}/qr`,
    {
      method: "POST",

      headers: {
        Authorization: token,

        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body,

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  if (
    data.reason ===
    "device already connect"
  ) {
    return {
      qr: null,
      alreadyConnected: true,
      error: null,
    };
  }

  if (
    !res.ok ||
    data.status === false
  ) {
    return {
      qr: null,
      alreadyConnected: false,
      error: getErrorMessage(
        data,
        "Gagal membuat kode QR."
      ),
    };
  }

  if (
    typeof data.url !==
      "string" ||
    !data.url
  ) {
    return {
      qr: null,
      alreadyConnected: false,
      error:
        "Fonnte tidak mengembalikan kode QR.",
    };
  }

  return {
    qr:
      `data:image/png;base64,${data.url}`,

    alreadyConnected: false,

    error: null,
  };
}

/**
 * =========================================================
 * DISCONNECT DEVICE
 * =========================================================
 */

export async function disconnectDevice(
  deviceToken: string
): Promise<FonnteActionResult> {
  const token =
    deviceToken.trim();

  if (!token) {
    return {
      success: false,
      error:
        "Device token tidak tersedia.",
    };
  }

  const res = await fetch(
    `${FONNTE_BASE_URL}/disconnect`,
    {
      method: "POST",

      headers: {
        Authorization: token,
      },

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  const alreadyDisconnected =
    data.detail ===
    "device already disconnected";

  if (
    !res.ok ||
    (
      data.status === false &&
      !alreadyDisconnected
    )
  ) {
    return {
      success: false,

      error: getErrorMessage(
        data,
        "Gagal memutuskan perangkat."
      ),
    };
  }

  return {
    success: true,
    error: null,
  };
}

/**
 * =========================================================
 * DELETE DEVICE
 * =========================================================
 *
 * Ini berbeda dengan disconnect.
 *
 * Disconnect:
 *   WhatsApp keluar dari device.
 *
 * Delete:
 *   Device dihapus dari account Fonnte.
 */

export async function deleteDevice(
  deviceToken: string
): Promise<FonnteActionResult> {
  const token =
    deviceToken.trim();

  if (!token) {
    return {
      success: false,
      error:
        "Device token tidak tersedia.",
    };
  }

  const res = await fetch(
    `${FONNTE_BASE_URL}/delete-device`,
    {
      method: "POST",

      headers: {
        Authorization: token,
      },

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  if (
    !res.ok ||
    data.status === false
  ) {
    return {
      success: false,

      error: getErrorMessage(
        data,
        "Gagal menghapus device."
      ),
    };
  }

  return {
    success: true,
    error: null,
  };
}

/**
 * =========================================================
 * SEND MESSAGE
 * =========================================================
 */

export async function sendMessage(
  deviceToken: string,
  target: string,
  message: string,
  imageUrl?: string
): Promise<FonnteActionResult> {
  const token =
    deviceToken.trim();

  if (!token) {
    return {
      success: false,
      error:
        "Device token tidak tersedia.",
    };
  }

  const normalizedTarget =
    normalizePhone(target);

  if (!normalizedTarget) {
    return {
      success: false,
      error:
        "Nomor tujuan tidak valid.",
    };
  }

  const body =
    new URLSearchParams();

  body.set(
    "target",
    normalizedTarget
  );

  body.set(
    "message",
    message
  );

  body.set(
    "countryCode",
    "62"
  );

  if (imageUrl) {
    body.set(
      "url",
      imageUrl
    );
  }

  const res = await fetch(
    `${FONNTE_BASE_URL}/send`,
    {
      method: "POST",

      headers: {
        Authorization: token,

        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body,

      cache: "no-store",
    }
  );

  const data =
    await parseResponse(res);

  if (
    !res.ok ||
    data.status === false
  ) {
    return {
      success: false,

      error: getErrorMessage(
        data,
        "Gagal mengirim pesan."
      ),
    };
  }

  return {
    success: true,
    error: null,
  };
}