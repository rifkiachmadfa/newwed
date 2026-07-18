"use client";

import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Send, Trash2, Users, Heart, Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Guest = {
  id: number;
  name: string;
  phone: string;
  slug: string;
  createdAt: string;
};

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/invitation/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={`h-6 w-6 p-0 transition-colors ${
        copied
          ? "text-emerald-600 hover:text-emerald-600"
          : "text-[#b0a098] hover:text-[#6b5c53]"
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </Button>
  );
}

export default function DashboardPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blasting, setBlasting] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "" });

  const fetchGuests = async () => {
    const res = await fetch("/api/guests");
    const data = await res.json();
    setGuests(data);
  };

  useEffect(() => {
    let ignore = false;
    fetch("/api/guests")
      .then((r) => r.json())
      .then((data) => { if (!ignore) setGuests(data); });
    return () => { ignore = true; };
  }, []);

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Nama dan nomor HP wajib diisi.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Tamu berhasil ditambahkan!");
      setForm({ name: "", phone: "" });
      setOpen(false);
      fetchGuests();
    } else {
      toast.error("Gagal menambahkan tamu.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus tamu ini?")) return;
    await fetch(`/api/guests/${id}`, { method: "DELETE" });
    toast.success("Tamu dihapus.");
    fetchGuests();
  };

  const handleBlast = async (guest: Guest) => {
    setBlasting(guest.id);
    try {
      const res = await fetch("/api/blast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId: guest.id }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Undangan terkirim ke ${guest.name}!`);
      } else {
        toast.error(data.error ?? "Gagal mengirim undangan.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghubungi server.");
      console.error(err);
    } finally {
      setBlasting(null);
    }
  };

  const handleBlastAll = async () => {
    if (!confirm(`Kirim undangan ke semua ${guests.length} tamu?`)) return;
    for (const guest of guests) {
      await handleBlast(guest);
      await new Promise((r) => setTimeout(r, 3000 + Math.random() * 2000));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="border-b border-[#e8e0d5] bg-white/80 backdrop-blur px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <div>
              <h1 className="text-lg font-semibold text-[#3a2e28] tracking-tight">
                Dashboard Undangan
              </h1>
              <p className="text-xs text-[#9e8e82]">Khaharani & Yono</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-rose-50 text-rose-600 border-rose-100">
            <Users className="w-3 h-3 mr-1" />
            {guests.length} Tamu
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#6b5c53] uppercase tracking-widest">
            Daftar Tamu
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBlastAll}
              disabled={guests.length === 0}
              className="border-[#d4c9bf] text-[#6b5c53] hover:bg-[#f0ebe5]"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Blast Semua
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Tambah Tamu
            </Button>
          </div>
        </div>

        <Separator className="bg-[#e8e0d5]" />

        {/* Table */}
        <div className="rounded-xl border border-[#e8e0d5] bg-white overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#faf8f5] border-[#e8e0d5]">
                <TableHead className="text-xs font-medium text-[#9e8e82] uppercase tracking-wider w-8">#</TableHead>
                <TableHead className="text-xs font-medium text-[#9e8e82] uppercase tracking-wider">Nama</TableHead>
                <TableHead className="text-xs font-medium text-[#9e8e82] uppercase tracking-wider">Nomor HP</TableHead>
                <TableHead className="text-xs font-medium text-[#9e8e82] uppercase tracking-wider">Link Undangan</TableHead>
                <TableHead className="text-xs font-medium text-[#9e8e82] uppercase tracking-wider text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-[#b0a098]">
                    Belum ada tamu ditambahkan.
                  </TableCell>
                </TableRow>
              ) : (
                guests.map((guest, idx) => (
                  <TableRow key={guest.id} className="border-[#f0ebe5] hover:bg-[#fdf9f6]">
                    <TableCell className="text-[#b0a098] text-sm">{idx + 1}</TableCell>
                    <TableCell className="font-medium text-[#3a2e28]">{guest.name}</TableCell>
                    <TableCell className="text-[#6b5c53]">{guest.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#9e8e82] font-mono bg-[#f5f0eb] px-2 py-0.5 rounded">
                          /invitation/{guest.slug}
                        </span>
                        <CopyLinkButton slug={guest.slug} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1.5 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBlast(guest)}
                          disabled={blasting === guest.id}
                          className="h-8 px-2.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          <Send className="w-3.5 h-3.5 mr-1" />
                          {blasting === guest.id ? "..." : "Kirim"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(guest.id)}
                          className="h-8 px-2 text-red-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Guest Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white border-[#e8e0d5]">
          <DialogHeader>
            <DialogTitle className="text-[#3a2e28] flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-rose-400" />
              Tambah Tamu
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[#6b5c53] text-sm">Nama Tamu</Label>
              <Input
                id="name"
                placeholder="contoh: Bapak Budi Santoso"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-[#d4c9bf] focus-visible:ring-rose-300"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[#6b5c53] text-sm">Nomor HP / WhatsApp</Label>
              <Input
                id="phone"
                placeholder="contoh: 08123456789"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border-[#d4c9bf] focus-visible:ring-rose-300"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-[#d4c9bf] text-[#6b5c53]"
            >
              Batal
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}