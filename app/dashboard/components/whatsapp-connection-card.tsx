"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  Card,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  QrCode,
  Smartphone,
  Wifi,
  WifiOff,
  Loader2,
  LogOut,
} from "lucide-react";

import {
  toast,
} from "sonner";

/**
 * =========================================================
 * TYPES
 * =========================================================
 */

type ConnectResponse = {
  qr: string | null;
  alreadyConnected: boolean;
  error: string | null;
  device?: string;
};

type StatusResponse = {
  connected: boolean;
  phoneNumber: string | null;
  deviceName: string | null;
  error: string | null;
};

type LogoutResponse = {
  success: boolean;
  error: string | null;
};

/**
 * =========================================================
 * CONSTANTS
 * =========================================================
 */

const STATUS_POLL_MS = 4000;
const DIALOG_STATUS_POLL_MS = 3000;
const QR_REFRESH_MS = 25000;

/**
 * =========================================================
 * HELPERS
 * =========================================================
 */

function formatPhoneNumber(
  raw: string | null
): string {
  if (!raw) {
    return "";
  }

  const digits =
    raw.replace(/\D/g, "");

  if (
    digits.startsWith("62")
  ) {
    return `+62 ${digits.slice(2)}`;
  }

  if (
    digits.startsWith("0")
  ) {
    return `+62 ${digits.slice(1)}`;
  }

  return `+${digits}`;
}

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */

export function WhatsAppConnectionCard({
  onStatusChange,
}: {
  onStatusChange?: (
    connected: boolean
  ) => void;
}) {
  /**
   * -------------------------------------------------------
   * CONNECTION STATE
   * -------------------------------------------------------
   */

  const [
    connected,
    setConnected,
  ] = useState(false);

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState<string | null>(
    null
  );

  const [
    deviceName,
    setDeviceName,
  ] = useState<string | null>(
    null
  );

  const [
    statusError,
    setStatusError,
  ] = useState<string | null>(
    null
  );

  /**
   * -------------------------------------------------------
   * DEVICE IDENTIFIER
   * -------------------------------------------------------
   *
   * Ini adalah identifier device Fonnte
   * yang dibuat server.
   *
   * Bukan nomor WhatsApp.
   */

  const [
    device,
    setDevice,
  ] = useState<string | null>(
    null
  );

  /**
   * -------------------------------------------------------
   * DIALOG
   * -------------------------------------------------------
   */

  const [
    dialogOpen,
    setDialogOpen,
  ] = useState(false);

  const [
    qr,
    setQr,
  ] = useState<string | null>(
    null
  );

  const [
    qrLoading,
    setQrLoading,
  ] = useState(false);

  const [
    qrError,
    setQrError,
  ] = useState<string | null>(
    null
  );

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);

  /**
   * -------------------------------------------------------
   * REFS
   * -------------------------------------------------------
   */

  const dialogStatusPollRef =
    useRef<
      ReturnType<
        typeof setInterval
      > | null
    >(null);

  const qrRefreshRef =
    useRef<
      ReturnType<
        typeof setInterval
      > | null
    >(null);

  const phoneNumberRef =
    useRef<string | null>(
      null
    );

  /**
   * =======================================================
   * CLEAR TIMERS
   * =======================================================
   */

  const clearDialogTimers =
    useCallback(() => {
      if (
        dialogStatusPollRef.current
      ) {
        clearInterval(
          dialogStatusPollRef.current
        );
      }

      if (
        qrRefreshRef.current
      ) {
        clearInterval(
          qrRefreshRef.current
        );
      }

      dialogStatusPollRef.current =
        null;

      qrRefreshRef.current =
        null;
    }, []);

  /**
   * =======================================================
   * FETCH STATUS
   * =======================================================
   */

  const fetchStatus =
    useCallback(
      async (
        targetDevice?: string
      ) => {
        const deviceId =
          targetDevice ??
          device;

        if (!deviceId) {
          setConnected(false);

          setPhoneNumber(null);

          setDeviceName(null);

          onStatusChange?.(
            false
          );

          return false;
        }

        try {
          const params =
            new URLSearchParams();

          params.set(
            "device",
            deviceId
          );

          const res =
            await fetch(
              `/api/whatsapp/status?${params.toString()}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          const data =
            (await res.json()) as StatusResponse;

          setConnected(
            data.connected
          );

          setPhoneNumber(
            data.phoneNumber
          );

          setDeviceName(
            data.deviceName
          );

          setStatusError(
            data.error
          );

          phoneNumberRef.current =
            data.phoneNumber;

          onStatusChange?.(
            data.connected
          );

          return data.connected;
        } catch {
          return false;
        }
      },
      [
        device,
        onStatusChange,
      ]
    );

  /**
   * =======================================================
   * REQUEST QR
   * =======================================================
   */

  const fetchQr =
    useCallback(
      async () => {
        setQrLoading(true);

        setQrError(null);

        try {
          /**
           * Setiap provisioning baru
           * membuat device baru.
           *
           * Jika sudah memiliki device,
           * refresh QR menggunakan device lama.
           */

          const response =
            await fetch(
              "/api/whatsapp/connect",
              {
                method: "POST",
                cache: "no-store",
              }
            );

          const data =
            (await response.json()) as ConnectResponse;

          if (
            data.alreadyConnected
          ) {
            setDialogOpen(false);

            clearDialogTimers();

            await fetchStatus(
              data.device
            );

            toast.success(
              "WhatsApp sudah terhubung."
            );

            return;
          }

          if (
            !response.ok ||
            data.error
          ) {
            setQr(null);

            setQrError(
              data.error ??
                "Gagal membuat kode QR."
            );

            return;
          }

          if (
            data.device
          ) {
            setDevice(
              data.device
            );
          }

          setQr(
            data.qr
          );
        } catch {
          setQr(null);

          setQrError(
            "Gagal menghubungi server untuk membuat kode QR."
          );
        } finally {
          setQrLoading(false);
        }
      },
      [
        clearDialogTimers,
        fetchStatus,
      ]
    );

  /**
   * =======================================================
   * OPEN CONNECT DIALOG
   * =======================================================
   */

  const handleOpenConnectDialog =
    () => {
      setDialogOpen(true);

      setQr(null);

      setQrError(null);

      /**
       * Buat device + QR.
       */
      void fetchQr();

      /**
       * QR refresh.
       */
      clearDialogTimers();

      qrRefreshRef.current =
        setInterval(
          () => {
            void fetchQr();
          },
          QR_REFRESH_MS
        );

      /**
       * Status polling.
       */
      dialogStatusPollRef.current =
        setInterval(
          async () => {
            if (!device) {
              return;
            }

            const isConnected =
              await fetchStatus();

            if (
              isConnected
            ) {
              setDialogOpen(
                false
              );

              clearDialogTimers();

              toast.success(
                `WhatsApp terhubung ke ${formatPhoneNumber(
                  phoneNumberRef.current
                )}`
              );
            }
          },
          DIALOG_STATUS_POLL_MS
        );
    };

  /**
   * =======================================================
   * DIALOG CHANGE
   * =======================================================
   */

  const handleDialogOpenChange =
    (
      open: boolean
    ) => {
      setDialogOpen(open);

      if (!open) {
        clearDialogTimers();
      }
    };

  /**
   * =======================================================
   * LOGOUT
   * =======================================================
   */

  const handleLogout =
    async () => {
      if (!device) {
        toast.error(
          "Device WhatsApp belum tersedia."
        );

        return;
      }

      if (
        !confirm(
          "Putuskan koneksi WhatsApp ini?"
        )
      ) {
        return;
      }

      setActionLoading(
        true
      );

      try {
        const res =
          await fetch(
            "/api/whatsapp/logout",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  device,
                }),
            }
          );

        const data =
          (await res.json()) as LogoutResponse;

        if (
          data.success
        ) {
          toast.success(
            "WhatsApp berhasil diputuskan."
          );
        } else {
          toast.error(
            data.error ??
              "Gagal memutuskan koneksi WhatsApp."
          );
        }

        await fetchStatus();
      } catch {
        toast.error(
          "Gagal memutuskan koneksi WhatsApp."
        );
      } finally {
        setActionLoading(
          false
        );
      }
    };

  /**
   * =======================================================
   * INITIAL STATUS
   * =======================================================
   *
   * Catatan:
   *
   * Untuk production, device identifier
   * sebaiknya disimpan di database/session
   * sehingga setelah refresh browser kita
   * tetap tahu device milik aplikasi.
   */

  useEffect(() => {
    return () => {
      clearDialogTimers();
    };
  }, [
    clearDialogTimers,
  ]);

  /**
   * =======================================================
   * RENDER
   * =======================================================
   */

  return (
    <>
      <Card className="border-[#e8e0d5] bg-white p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                connected
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {connected ? (
                <Wifi className="w-5 h-5" />
              ) : (
                <WifiOff className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[#3a2e28]">
                  Koneksi WhatsApp
                </p>

                {connected ? (
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                    Terhubung
                  </Badge>
                ) : (
                  <Badge className="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50">
                    Belum Terhubung
                  </Badge>
                )}
              </div>

              <p className="text-xs text-[#9e8e82] mt-0.5">
                {connected ? (
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />

                    {deviceName
                      ? `${deviceName} — `
                      : ""}

                    {formatPhoneNumber(
                      phoneNumber
                    )}
                  </span>
                ) : statusError ? (
                  statusError
                ) : (
                  "Belum ada WhatsApp yang terhubung."
                )}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          {connected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={
                handleLogout
              }
              disabled={
                actionLoading
              }
              className="border-[#d4c9bf] text-[#6b5c53] hover:bg-[#f0ebe5]"
            >
              {actionLoading ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
              )}

              Putuskan
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={
                handleOpenConnectDialog
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <QrCode className="w-3.5 h-3.5 mr-1.5" />

              Hubungkan WhatsApp
            </Button>
          )}
        </div>
      </Card>

      {/* =================================================
          QR DIALOG
          ================================================= */}

      <Dialog
        open={dialogOpen}
        onOpenChange={
          handleDialogOpenChange
        }
      >
        <DialogContent className="sm:max-w-sm bg-white border-[#e8e0d5]">
          <DialogHeader>
            <DialogTitle className="text-[#3a2e28] flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-600" />

              Hubungkan WhatsApp
            </DialogTitle>

            <DialogDescription className="text-[#9e8e82]">
              Buka WhatsApp di HP Anda
              {" > "}
              Perangkat Tertaut
              {" > "}
              Tautkan Perangkat,
              lalu pindai kode QR di
              bawah ini.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-4 min-h-[280px]">
            {qrError ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-red-500">
                  {qrError}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    void fetchQr()
                  }
                >
                  Coba Lagi
                </Button>
              </div>
            ) : qr ? (
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl border border-[#e8e0d5] p-3 bg-white">
                  <Image
                    src={qr}
                    alt="QR Code WhatsApp"
                    width={260}
                    height={260}
                    unoptimized
                  />
                </div>

                <p className="text-xs text-[#b0a098] text-center">
                  Scan QR menggunakan
                  WhatsApp pada HP yang
                  ingin dihubungkan.
                </p>

                <p className="text-xs text-[#b0a098]">
                  QR diperbarui otomatis.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#9e8e82]">
                <Loader2 className="w-8 h-8 animate-spin" />

                <p className="text-sm">
                  Menyiapkan kode QR...
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}