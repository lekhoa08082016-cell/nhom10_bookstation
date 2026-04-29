// Trang thanh toán qua Ví MoMo
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function MomoPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [secs, setSecs] = useState(15 * 60);
  const [copiedRef, setCopiedRef] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingFee = subtotal > 250000 ? 0 : 30000;
  const total = subtotal + shippingFee;
  const orderCode = "BS2026";
  const momoRef = `BS2026_MoMo_${orderCode}`;

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  function copyRef() {
    navigator.clipboard.writeText(momoRef).then(() => {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 1800);
    });
  }

  function confirm() {
    clearCart();
    router.push("/orders/success");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <div className="bg-white border-b">
        <div className="flex items-center gap-3 py-4">
          <div className="w-1.5 h-7 bg-[#ae2070] rounded-full" />
          <h1 className="font-heading text-2xl text-primary font-bold">Thanh toán qua Ví MoMo</h1>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-3 text-sm font-medium mb-2">
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">1</span>
          Đặt hàng
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-xs" />
        <div className="flex items-center gap-1.5 text-[#ae2070] font-semibold">
          <span className="w-6 h-6 rounded-full bg-[#ae2070] text-white flex items-center justify-center text-xs">2</span>
          Thanh toán
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-xs" />
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">3</span>
          Hoàn thành
        </div>
      </div>

      {/* MoMo card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-[#ae2070] to-[#d63384] px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-[#ae2070] font-black text-base">M</span>
          </div>
          <div>
            <p className="text-white font-bold text-base">BOOKSTATION</p>
            <p className="text-white/80 text-xs">Ví điện tử MoMo</p>
          </div>
        </div>

        <div className="p-5 flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-44 h-44 bg-pink-50 border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center gap-2">
              <i className="fa-solid fa-qrcode text-5xl text-[#ae2070]/40" />
              <p className="text-xs text-[#ae2070]/60 text-center leading-tight px-3">Quét mã QR<br />bằng app MoMo</p>
            </div>
            <p className="text-[11px] text-gray-400">
              Mã QR hợp lệ trong{" "}
              <span className={`font-bold ${secs === 0 ? "text-gray-400" : "text-[#ae2070]"}`}>
                {secs === 0 ? "Hết hạn" : `${m}:${s}`}
              </span>
            </p>
          </div>

          <div className="flex-1 w-full space-y-2 text-sm">
            {[
              { label: "Người nhận", value: "BOOKSTATION" },
              { label: "Mã đơn hàng", value: `#${orderCode}` },
              { label: "Số sản phẩm", value: `${items.length} sản phẩm` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">{row.label}</span>
                <span className="font-semibold text-primary">{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Mã nội dung</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{momoRef}</span>
                <button onClick={copyRef}
                  className={`text-xs border rounded px-2 py-0.5 transition-colors ${copiedRef ? "bg-pink-100 text-pink-700 border-pink-300" : "text-[#ae2070] border-pink-200 hover:text-pink-800"}`}>
                  {copiedRef ? "Đã sao!" : "Sao chép"}
                </button>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-medium">Số tiền thanh toán</span>
              <span className="font-bold text-[#ae2070] text-lg">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps guide */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
          <i className="fa-solid fa-mobile-screen-button text-[#ae2070]" /> Các bước thanh toán
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "fa-mobile-screen", label: "Bước 1", desc: <>Mở ứng dụng<br /><strong>MoMo</strong></> },
            { icon: "fa-qrcode", label: "Bước 2", desc: <>Chọn <strong>Quét mã</strong><br />và quét QR</> },
            { icon: "fa-check-circle", label: "Bước 3", desc: <><strong>Xác nhận</strong><br />thanh toán</> },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-pink-50 border-2 border-pink-100 flex items-center justify-center">
                <i className={`fa-solid ${s.icon} text-[#ae2070] text-2xl`} />
              </div>
              <div>
                <p className="font-semibold text-primary text-sm">{s.label}</p>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex gap-3">
        <i className="fa-solid fa-circle-info text-[#ae2070] mt-0.5 shrink-0" />
        <p className="text-xs text-pink-900 leading-relaxed">
          Đơn hàng sẽ được xác nhận tự động sau khi thanh toán MoMo thành công. Mã QR có hiệu lực trong{" "}
          <strong>15 phút</strong>. Nếu hết hạn, quay lại và đặt hàng lại.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/checkout"
          className="flex-1 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
          <i className="fa-solid fa-chevron-left text-sm" /> Quay lại
        </Link>
        <button onClick={confirm}
          className="flex-1 bg-[#ae2070] text-white font-bold py-3 rounded-xl hover:bg-pink-800 transition-colors shadow-md flex items-center justify-center gap-2">
          <i className="fa-solid fa-check-circle" /> Xác nhận đã thanh toán
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 pb-4">
        Gặp vấn đề? Liên hệ{" "}
        <a href="mailto:bookstation@gmail.com" className="text-accent hover:underline">bookstation@gmail.com</a>{" "}
        hoặc Hotline <strong>1900 6666</strong>
      </p>
    </div>
  );
}
