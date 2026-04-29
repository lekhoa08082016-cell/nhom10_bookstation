"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

export default function CustomBookSuccessPage() {
  const [order, setOrder] = useState<any>({});
  const [orderCode, setOrderCode] = useState("");
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const saved = sessionStorage.getItem('customOrder');
    if (saved) {
      const o = JSON.parse(saved);
      setOrder(o);
      const name = o.name || "KH";
      const phone = o.phone || "000";
      const code = "BS" + Math.floor(10000 + Math.abs(name.charCodeAt(0) * 997 + phone.charCodeAt(0) * 31) % 90000);
      setOrderCode(code);
      sessionStorage.removeItem('customOrder');

      if (user?.email) {
        const newOrder = {
          code,
          date: new Date().toLocaleDateString("vi-VN"),
          status: "processing",
          type: "custom",
          name: o.name,
          phone: o.phone,
          address: o.addr || "—",
          total: o.total || 0,
          deposit: o.deposit || 0,
          appointmentDate: o.date,
          items: o.book ? [{ title: o.book, price: o.bookPrice || 0, qty: 1 }] : [],
        };
        const key = `bsOrders_${user.email}`;
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(key, JSON.stringify([newOrder, ...existing]));
      }
    } else {
      setOrderCode("BS" + Math.floor(10000 + Math.random() * 90000));
    }
  }, [user]);

  const deposit = order.deposit || 113000;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-10 gap-0">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm"><i className="fa-solid fa-check text-xs"></i></div>
          <span className="text-xs mt-1 text-secondary font-medium">Thông tin</span>
        </div>
        <div className="h-[2px] w-16 md:w-24 bg-primary mx-1 mb-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm"><i className="fa-solid fa-check text-xs"></i></div>
          <span className="text-xs mt-1 text-secondary font-medium">Thanh toán</span>
        </div>
        <div className="h-[2px] w-16 md:w-24 bg-primary mx-1 mb-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
          <span className="text-xs mt-1 text-primary font-bold">Hoàn tất</span>
        </div>
      </div>

      {/* Success card */}
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
            <i className="fa-solid fa-circle-check text-5xl text-green-500"></i>
          </div>
        </div>

        <h2 className="font-heading text-3xl text-primary font-bold mb-2">Đặt Lịch<br />Thành Công!</h2>
        <p className="text-secondary text-sm mb-6 leading-relaxed max-w-xs mx-auto">Cảm ơn bạn đã tin tưởng BookStation. Đơn custom của bạn đã được tiếp nhận.</p>

        {/* Order info */}
        <div className="bg-lightBg rounded-xl p-5 mb-6 text-left space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Mã đơn</span>
            <span className="font-bold text-primary">{orderCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Loại dịch vụ</span>
            <span className="font-medium text-primary">Mua sách từ Shop</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Ngày hẹn</span>
            <span className="font-medium text-primary">{order.date || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tiền cọc</span>
            <span className="font-medium text-green-600">{formatPrice(deposit)} ✓</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Trạng thái</span>
            <span className="font-medium text-amber-600 flex items-center gap-1"><i className="fa-solid fa-clock-rotate-left text-xs"></i> Đang xử lý</span>
          </div>
        </div>

        {/* Next steps notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left text-sm text-blue-800 mb-6 flex gap-3">
          <i className="fa-solid fa-circle-info text-blue-400 mt-0.5 shrink-0"></i>
          <div>
            <p className="font-semibold mb-1">Bước tiếp theo</p>
            <p>Chúng tôi sẽ liên hệ qua SĐT <strong>{order.phone || "—"}</strong> trong vòng 24h để xác nhận ngày hẹn và chi tiết custom bìa.</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/orders" className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-secondary transition-colors text-base shadow-md flex items-center justify-center gap-2">
            <i className="fa-solid fa-box"></i> Quản lý đơn hàng
          </Link>
          <Link href="/" className="w-full border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:border-primary hover:text-primary transition-colors text-base">
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}