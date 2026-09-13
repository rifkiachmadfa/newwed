"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode, Smartphone, Wifi, WifiOff, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

type StatusResponse = {
  connected: boolean;
  phoneNumber: string | null;
  error: string | null;
};

type ConnectResponse = {
  qr: string | null;
  alreadyConnected: boolean;
  error: string | null;
};

const STATUS_POLL_MS = 4000;
const DIALOG_STATUS_POLL_MS = 3000;
const QR_REFRESH_MS = 25000;

function formatPhoneNumber(raw: string | null): string {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) {
    return `+62 ${digits.slice(2)}`;
  }
  return `+${digits}`;
}

export function WhatsAppConnectionCard({
  onStatusChange,
}: {
  onStatusChange?: (connected: boolean) => void;
}) {
  const [connected, setConnected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const dialogStatusPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qrRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phoneNumberRef = useRef<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp/status");
      const data: StatusResponse = await res.json();
      setConnected(data.connected);
      setPhoneNumber(data.phoneNumber);
      phoneNumberRef.current = data.phoneNumber;
      setStatusError(data.error);
      onStatusChange?.(data.connected);
      return data.connected;
    } catch {
      return false;
    }
  }, [onStatusChange]);

  // Background poll so the badge / button states stay fresh even when the
  // QR dialog is closed.
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, STATUS_POLL_MS);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const clearDialogTimers = () => {
    if (dialogStatusPollRef.current) clearInterval(dialogStatusPollRef.current);
    if (qrRefreshRef.current) clearInterval(qrRefreshRef.current);
    dialogStatusPollRef.current = null;
    qrRefreshRef.current = null;
  };

  const fetchQr = useCallback(async () => {
    setQrLoading(true);
    setQrError(null);
    try {
      const res = await fetch("/api/whatsapp/connect", { method: "POST" });
      const data: ConnectResponse = await res.json();

      if (data.alreadyConnected) {
        setDialogOpen(false);
        clearDialogTimers();
        await fetchStatus();
        toast.success("WhatsApp sudah terhubung.");
        return;
      }

      if (data.error) {
        setQrError(data.error);
        setQr(null);
        return;
      }

      setQr(data.qr);
    } catch {
      setQrError("Gagal menghubungi server untuk membuat kode QR.");
    } finally {
      setQrLoading(false);
    }
  }, [fetchStatus]);

  const handleOpenConnectDialog = () => {
    setDialogOpen(true);
    setQr(null);
    setQrError(null);
    fetchQr();

    // Refresh the QR before it expires, and poll status so the dialog
    // auto-closes the moment the phone finishes scanning.
    qrRefreshRef.current = setInterval(fetchQr, QR_REFRESH_MS);
    dialogStatusPollRef.current = setInterval(async () => {
      const isConnected = await fetchStatus();
      if (isConnected) {
        setDialogOpen(false);
        clearDialogTimers();
        toast.success(`WhatsApp terhubung ke ${formatPhoneNumber(phoneNumberRef.current)}`);
      }
    }, DIALOG_STATUS_POLL_MS);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) clearDialogTimers();
  };

  useEffect(() => clearDialogTimers, []);

  const handleLogout = async () => {
    if (!confirm("Putuskan koneksi WhatsApp ini?")) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/whatsapp/logout", { method: "POST" });
      const data: { success: boolean; error: string | null } = await res.json();
      if (data.success) {
        toast.success("WhatsApp berhasil diputuskan.");
      } else {
        toast.error(data.error ?? "Gagal memutuskan koneksi WhatsApp.");
      }
      await fetchStatus();
    } catch {
      toast.error("Gagal memutuskan koneksi WhatsApp.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <Card className="border-[#e8e0d5] bg-white p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                connected ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}
            >
              {connected ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[#3a2e28]">Koneksi WhatsApp</p>
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
                    Nomor terhubung: {formatPhoneNumber(phoneNumber)}
                  </span>
                ) : statusError ? (
                  statusError
                ) : (
                  "Tidak ada nomor WhatsApp yang terhubung. Silakan hubungkan dahulu untuk mengirim undangan."
                )}
              </p>
            </div>
          </div>

          {connected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={actionLoading}
              className="border-[#d4c9bf] text-[#6b5c53] hover:bg-[#f0ebe5]"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Putuskan
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleOpenConnectDialog}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <QrCode className="w-3.5 h-3.5 mr-1.5" />
              Hubungkan WhatsApp
            </Button>
          )}
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-sm bg-white border-[#e8e0d5]">
          <DialogHeader>
            <DialogTitle className="text-[#3a2e28] flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-600" />
              Hubungkan WhatsApp
            </DialogTitle>
            <DialogDescription className="text-[#9e8e82]">
              Buka WhatsApp di HP Anda &gt; Perangkat Tertaut &gt; Tautkan
              Perangkat, lalu pindai kode QR di bawah ini.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-4 min-h-[280px]">
            {qrError ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-red-500">{qrError}</p>
                <Button variant="outline" size="sm" onClick={fetchQr}>
                  Coba Lagi
                </Button>
              </div>
            ) : qr ? (
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl border border-[#e8e0d5] p-3 bg-white">
                  <Image src={qr} alt="QR Code WhatsApp" width={260} height={260} unoptimized />
                </div>
                <p className="text-xs text-[#b0a098]">
                  Kode QR akan diperbarui otomatis jika kedaluwarsa.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#9e8e82]">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm">
                  {qrLoading ? "Menyiapkan kode QR..." : "Memuat..."}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}