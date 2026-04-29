"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function CustomBookPaymentPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("customOrder");
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  const name = order.name || "—";
  const date = order.date || "—";
  const bookPrice = order.bookPrice || 0;
  const customFee = 150000;
  const total = bookPrice + customFee;
  const deposit = Math.round(total * 0.5);

  const lastName = name.split(" ").pop()?.toUpperCase() || "KH";
  const transferContent = `${lastName} CUSTOM`;

  function copyContent() {
    navigator.clipboard.writeText(transferContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function confirmPayment() {
    router.push("/custom-book/success");
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Progress steps */}
      <div className="flex items-center justify-center mb-10 gap-0">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm"><i className="fa-solid fa-check text-xs"></i></div>
          <span className="text-xs mt-1 text-secondary font-medium">Thông tin</span>
        </div>
        <div className="h-[2px] w-16 md:w-24 bg-primary mx-1 mb-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
          <span className="text-xs mt-1 text-primary font-bold">Thanh toán</span>
        </div>
        <div className="h-[2px] w-16 md:w-24 bg-gray-300 mx-1 mb-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold text-sm">3</div>
          <span className="text-xs mt-1 text-gray-400">Hoàn tất</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Payment panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="font-heading text-2xl text-primary font-bold mb-1">Thanh toán cọc</h2>
          <p className="text-secondary text-sm mb-2">Quét mã QR để thanh toán 50% và giữ lịch ngày <span className="font-semibold text-primary">{date}</span></p>
          <p className="text-xs text-secondary mb-5">Giao dịch sẽ được xác nhận tự động trong 5–10 phút.</p>

          <div className="bg-lightBg rounded-xl p-4 mb-6 space-y-2.5 text-sm">
            <div className="flex justify-between border-b border-accent/20 pb-2">
              <span className="text-gray-500">Ngân hàng</span>
              <span className="font-semibold text-primary">Vietcombank</span>
            </div>
            <div className="flex justify-between border-b border-accent/20 pb-2">
              <span className="text-gray-500">Số tài khoản</span>
              <span className="font-semibold text-primary">1012345678</span>
            </div>
            <div className="flex justify-between border-b border-accent/20 pb-2">
              <span className="text-gray-500">Chủ tài khoản</span>
              <span className="font-semibold text-primary">BOOKSTATION VN</span>
            </div>
            <div className="flex justify-between border-b border-accent/20 pb-2">
              <span className="text-gray-500">Số tiền</span>
              <span className="font-bold text-primary">{formatPrice(deposit)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Nội dung CK</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">{transferContent}</span>
                <button onClick={copyContent} className="text-accent hover:text-primary transition-colors" title="Sao chép">
                  <i className={`fa-regular ${copied ? 'fa-solid fa-check text-green-500' : 'fa-copy'} text-sm`}></i>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-5">
            <div className="w-48 h-48 border-2 border-dashed border-accent rounded-2xl flex flex-col items-center justify-center bg-gray-50 mb-3">
              <i className="fa-solid fa-qrcode text-6xl text-primary opacity-75"></i>
              <p className="text-xs text-gray-400 mt-2">Quét để thanh toán</p>
            </div>
            <p className="text-xs text-gray-400 text-center">Mở app ngân hàng → Quét QR → Xác nhận</p>
          </div>

          <div className="bg-primary text-white rounded-xl p-4 text-center">
            <p className="text-xs opacity-70 mb-1">Tiền cọc (50%)</p>
            <p className="font-heading text-2xl font-bold">{formatPrice(deposit)}</p>
          </div>
        </div>

        {/* Summary + actions panel */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-heading text-xl text-primary font-bold mb-4">Tóm tắt đơn Custom</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span className="text-secondary">Khách hàng:</span>
                <span className="font-medium text-primary line-clamp-1 max-w-[200px] text-right">{name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-secondary">Ngày làm:</span>
                <span className="font-medium text-primary">{date}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-secondary">Phí Custom:</span>
                <span className="font-medium text-primary">{formatPrice(customFee)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-secondary">Giá sách gốc:</span>
                <span className="font-medium text-primary">{formatPrice(bookPrice)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold text-base">
                <span className="text-secondary">Tổng cộng:</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <div className="bg-lightBg rounded-lg p-2.5 flex justify-between text-sm">
                <span className="text-secondary">Tiền cọc ngay (50%):</span>
                <span className="font-bold text-primary">{formatPrice(deposit)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-primary mb-3 flex items-center gap-2"><i className="fa-regular fa-address-card text-accent"></i> Thông tin đặt lịch</h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex gap-2"><span className="w-16 text-gray-400 shrink-0">Họ tên:</span><span className="font-medium text-primary">{name}</span></div>
              <div className="flex gap-2"><span className="w-16 text-gray-400 shrink-0">SĐT:</span><span className="font-medium text-primary">{order.phone || "—"}</span></div>
              <div className="flex gap-2"><span className="w-16 text-gray-400 shrink-0">Ngày hẹn:</span><span className="font-medium text-primary">{date}</span></div>
              <div className="flex gap-2"><span className="w-16 text-gray-400 shrink-0">Sách:</span><span className="font-medium text-primary">{order.book || "—"}</span></div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
            <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 shrink-0"></i>
            <p>Sau khi chuyển khoản, nhấn <strong>"Đã chuyển khoản xong"</strong>. Đơn xác nhận trong <strong>5–10 phút</strong>.</p>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={confirmPayment} className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-secondary transition-colors text-base shadow-md flex items-center justify-center gap-2">
              <i className="fa-solid fa-circle-check"></i> Đã chuyển khoản xong
            </button>
            <button onClick={() => router.push("/custom-book")} className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}