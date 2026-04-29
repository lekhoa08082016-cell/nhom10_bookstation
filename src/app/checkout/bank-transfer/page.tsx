"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function BankTransferPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [copiedStk, setCopiedStk] = useState(false);
  const [copiedAmt, setCopiedAmt] = useState(false);
  const [copiedNd, setCopiedNd] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingFee = subtotal > 250000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const orderCode = "BS2026_01";
  const accNumber = "0123 4567 8999";
  const accNumberRaw = "012345678999";

  function copyText(text: string, type: "stk" | "amt" | "nd") {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "stk") { setCopiedStk(true); setTimeout(() => setCopiedStk(false), 2000); }
      else if (type === "amt") { setCopiedAmt(true); setTimeout(() => setCopiedAmt(false), 2000); }
      else { setCopiedNd(true); setTimeout(() => setCopiedNd(false), 2000); }
    });
  }

  function confirm() {
    clearCart();
    router.push("/orders/success");
  }

  const bookSummary = items.length > 0
    ? items.map((i) => `${i.title} x${i.qty}`).join(", ")
    : "—";

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-3 text-sm font-medium mb-2">
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">1</span>
          Đặt hàng
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-xs" />
        <div className="flex items-center gap-1.5 text-primary font-semibold">
          <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
          Thanh toán
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-xs" />
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">3</span>
          Hoàn thành
        </div>
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <i className="fa-solid fa-receipt text-accent" /> Thông tin đơn hàng
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Mã đơn hàng:</span>
            <span className="font-semibold text-primary">#{orderCode}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Sản phẩm:</span>
            <span className="font-medium text-primary text-right max-w-[60%]">{bookSummary}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Phí vận chuyển:</span>
            <span>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
            <span className="text-primary">Số tiền cần chuyển:</span>
            <span className="text-primary text-lg">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Bank info + QR */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
          <i className="fa-solid fa-building-columns text-blue-600" /> Thông tin chuyển khoản
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* QR placeholder */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-44 h-44 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400">
              <i className="fa-solid fa-qrcode text-5xl text-gray-300" />
              <p className="text-xs text-center leading-tight px-3">Quét mã để<br />chuyển khoản nhanh</p>
            </div>
            <p className="text-[11px] text-gray-400">MB BANK – VietQR</p>
          </div>

          {/* Bank details */}
          <div className="flex-1 space-y-3 w-full">
            <div className="bg-blue-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Ngân hàng</span>
                <span className="font-bold text-blue-700 text-sm">MB BANK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Số tài khoản</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary text-sm tracking-wider">{accNumber}</span>
                  <button
                    onClick={() => copyText(accNumberRaw, "stk")}
                    className={`text-xs border rounded px-2 py-0.5 transition-colors ${copiedStk ? "bg-green-50 text-green-600 border-green-200" : "text-blue-600 hover:text-blue-800 border-blue-200"}`}
                  >
                    {copiedStk ? "Đã chép" : "Sao chép"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Chủ tài khoản</span>
                <span className="font-semibold text-primary text-sm">BOOKSTATION</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Số tiền</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-700 text-sm">{total > 0 ? formatPrice(total) : "—"}</span>
                  <button
                    onClick={() => copyText(String(total), "amt")}
                    className={`text-xs border rounded px-2 py-0.5 transition-colors ${copiedAmt ? "bg-green-50 text-green-600 border-green-200" : "text-blue-600 hover:text-blue-800 border-blue-200"}`}
                  >
                    {copiedAmt ? "Đã chép" : "Sao chép"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Nội dung CK</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary text-sm">{orderCode}</span>
                  <button
                    onClick={() => copyText(orderCode, "nd")}
                    className={`text-xs border rounded px-2 py-0.5 transition-colors ${copiedNd ? "bg-green-50 text-green-600 border-green-200" : "text-blue-600 hover:text-blue-800 border-blue-200"}`}
                  >
                    {copiedNd ? "Đã chép" : "Sao chép"}
                  </button>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2">
              <i className="fa-solid fa-circle-exclamation text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-800 leading-relaxed">
                Vui lòng nhập <strong>đúng nội dung chuyển khoản</strong> để đơn hàng được xử lý tự động. Đơn hàng sẽ được xác nhận trong vòng <strong>15 phút</strong> sau khi chuyển khoản thành công.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer instructions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
          <i className="fa-solid fa-list-ol text-accent" /> Hướng dẫn chuyển khoản
        </h2>
        <ol className="space-y-3">
          {[
            <>Mở ứng dụng <strong>MB Bank</strong> hoặc bất kỳ ứng dụng ngân hàng nào hỗ trợ QR/chuyển khoản liên ngân hàng.</>,
            <>Nhập số tài khoản <strong>0123 4567 8999</strong> – Ngân hàng <strong>MB Bank</strong>, chủ tài khoản <strong>BOOKSTATION</strong>.</>,
            <>Nhập <strong>đúng số tiền</strong> và <strong>nội dung chuyển khoản</strong> như trên.</>,
            <>Nhấn <strong>"Xác nhận đã chuyển khoản"</strong> sau khi giao dịch thành công.</>,
          ].map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/checkout"
          className="flex-1 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-chevron-left text-sm" /> Quay lại
        </Link>
        <button
          onClick={confirm}
          className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-check-circle" /> Xác nhận đã chuyển khoản
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 pb-4">
        Gặp vấn đề? Liên hệ{" "}
        <a href="mailto:bookstation@gmail.com" className="text-accent hover:underline">bookstation@gmail.com</a>{" "}
        hoặc Hotline <strong>1900 6666</strong>
      </p>
    </main>
  );
}
