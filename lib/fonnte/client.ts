const FONNTE_BASE_URL = "https://api.fonnte.com";

function getToken(): string {
  const token = process.env.FONNTE_TOKEN;
  if (!token) {
    throw new Error(
      "FONNTE_TOKEN belum diatur di environment variable server."
    );
  }
  return token;
}

export type FonnteDeviceStatus = {
  connected: boolean;
  phoneNumber: string | null;
  error: string | null;
};

/**
 * Checks the current connection state of the Fonnte device tied to
 * FONNTE_TOKEN. See: https://docs.fonnte.com/api-device-profile/
 */
export async function getDeviceStatus(): Promise<FonnteDeviceStatus> {
  const res = await fetch(`${FONNTE_BASE_URL}/device`, {
    method: "POST",
    headers: { Authorization: getToken() },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || data.status === false) {
    return {
      connected: false,
      phoneNumber: null,
      error: data.reason ?? data.detail ?? "Gagal mengambil status perangkat.",
    };
  }

  return {
    connected: data.device_status === "connect",
    phoneNumber: data.device ?? null,
    error: null,
  };
}

export type FonnteQrResult = {
  qr: string | null; // data URL, ready to use as <img src>
  alreadyConnected: boolean;
  error: string | null;
};

/**
 * Requests a fresh QR code from Fonnte to link a WhatsApp number to this
 * device. See: https://docs.fonnte.com/api-get-qr/
 */
export async function requestQrCode(): Promise<FonnteQrResult> {
  const res = await fetch(`${FONNTE_BASE_URL}/qr`, {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ type: "qr" }),
    cache: "no-store",
  });

  const data = await res.json();

  if (data.reason === "device already connect") {
    return { qr: null, alreadyConnected: true, error: null };
  }

  if (!res.ok || data.status === false || !data.url) {
    return {
      qr: null,
      alreadyConnected: false,
      error: data.reason ?? data.detail ?? "Gagal membuat kode QR.",
    };
  }

  return {
    qr: `data:image/png;base64,${data.url}`,
    alreadyConnected: false,
    error: null,
  };
}

export type FonnteActionResult = {
  success: boolean;
  error: string | null;
};

/**
 * Disconnects the WhatsApp number currently linked to this device.
 * See: https://docs.fonnte.com/api-disconnect-device/
 */
export async function disconnectDevice(): Promise<FonnteActionResult> {
  const res = await fetch(`${FONNTE_BASE_URL}/disconnect`, {
    method: "POST",
    headers: { Authorization: getToken() },
    cache: "no-store",
  });

  const data = await res.json();

  // "device already disconnected" is treated as a success - end state
  // matches what the caller wanted.
  if (!res.ok || (data.status === false && data.detail !== "device already disconnected")) {
    return {
      success: false,
      error: data.detail ?? data.reason ?? "Gagal memutuskan perangkat.",
    };
  }

  return { success: true, error: null };
}

/**
 * Sends a WhatsApp text message, optionally with an image attachment, to
 * a single target number. See: https://docs.fonnte.com/api-send-message/
 */
export async function sendMessage(
  target: string,
  message: string,
  imageUrl?: string
): Promise<FonnteActionResult> {
  const res = await fetch(`${FONNTE_BASE_URL}/send`, {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      target,
      message,
      ...(imageUrl ? { url: imageUrl } : {}),
      countryCode: "62",
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.status) {
    return {
      success: false,
      error: data.reason ?? data.detail ?? "Gagal mengirim pesan.",
    };
  }

  return { success: true, error: null };
}