"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    const code = sessionStorage.getItem("lastOrderCode") || "";
    if (code) {
      setOrderCode(code);
      sessionStorage.removeItem("lastOrderCode");
    }
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-4">
      {/* Steps */}
      <div className="flex items-center justify-center gap-3 text-sm font-medium mb-4">
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
            <i className="fa-solid fa-check text-[9px]" />
          </span>
          Đặt hàng
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-xs" />
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
            <i className="fa-solid fa-check text-[9px]" />
          </span>
          Thanh toán
        </div>
        <i className="fa-solid fa-chevron-right text-gray-300 text-xs" />
        <div className="flex items-center gap-1.5 text-green-600 font-semibold">
          <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
            <i className="fa-solid fa-check text-[9px]" />
          </span>
          Hoàn thành
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <i className="fa-solid fa-check text-green-500 text-3xl" />
          </div>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-500 text-sm mb-4">
          Cảm ơn bạn đã tin tưởng mua sắm tại <strong>BookStation</strong>. Đơn hàng của bạn đang được xử lý.
        </p>
        {orderCode && (
          <div className="inline-block bg-lightBg border border-accent/40 rounded-xl px-6 py-2">
            <span className="text-sm text-secondary">Mã đơn hàng: </span>
            <span className="font-bold text-primary text-lg">#{orderCode}</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
          <i className="fa-solid fa-box text-accent" /> Chi tiết đơn hàng
        </h2>
        <div className="divide-y divide-gray-50 text-sm">
          <div className="py-3 flex items-start gap-3">
            <i className="fa-solid fa-truck text-secondary mt-0.5 w-4 shrink-0 text-center" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Phương thức vận chuyển</p>
              <p className="text-primary">Giao tiêu chuẩn (3–5 ngày)</p>
            </div>
          </div>
          <div className="py-3 flex items-start gap-3">
            <i className="fa-solid fa-credit-card text-secondary mt-0.5 w-4 shrink-0 text-center" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Phương thức thanh toán</p>
              <p className="font-medium text-primary">Thanh toán khi nhận hàng (COD)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <i className="fa-solid fa-circle-info text-blue-500 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-800 leading-relaxed">
          Chúng tôi sẽ gửi thông báo xác nhận đơn hàng qua email. Đơn hàng sẽ được giao trong{" "}
          <strong>3–5 ngày làm việc</strong>. Nếu cần hỗ trợ, liên hệ <strong>1900 6666</strong>.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/products"
          className="flex-1 border-2 border-primary text-primary font-semibold py-3.5 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 text-center">
          <i className="fa-solid fa-store text-sm" /> Tiếp tục mua sắm
        </Link>
        <Link href="/orders"
          className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
          <i className="fa-solid fa-file-lines" /> Xem đơn hàng
        </Link>
      </div>
    </main>
  );
}
