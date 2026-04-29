"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function CustomUsedBookSuccessPage() {
  const [orderCode, setOrderCode] = useState("");
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const code = "CBU" + Math.floor(10000 + Math.random() * 90000);
    setOrderCode(code);

    const saved = sessionStorage.getItem("customOrder");
    const o = saved ? JSON.parse(saved) : null;
    if (o) sessionStorage.removeItem("customOrder");

    if (user?.email) {
      const newOrder = {
        code,
        date: new Date().toLocaleDateString("vi-VN"),
        status: "processing",
        type: "custom-used",
        name: o?.name || user.name,
        phone: o?.phone || user.phone || "—",
        address: o?.addr || "—",
        total: 0,
        appointmentDate: o?.date || "—",
        items: [],
      };
      const key = `bsOrders_${user.email}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([newOrder, ...existing]));
    }
  }, [user]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-3 text-sm font-medium mb-8 max-w-lg mx-auto">
        <div className="flex flex-col items-center gap-1.5 text-primary font-semibold w-24">
          <span className="w-8 h-8 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center text-sm shadow-sm"><i className="fa-solid fa-check" /></span>
          <span className="text-xs text-center leading-tight">Tùy chọn<br/>thiết kế</span>
        </div>
        <div className="h-px bg-accent flex-1 -mt-5" />
        <div className="flex flex-col items-center gap-1.5 text-primary font-semibold w-24">
          <span className="w-8 h-8 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center text-sm shadow-sm"><i className="fa-solid fa-check" /></span>
          <span className="text-xs text-center leading-tight">Gửi thông tin<br/>sách cũ</span>
        </div>
        <div className="h-px bg-accent flex-1 -mt-5" />
        <div className="flex flex-col items-center gap-1.5 text-accent font-semibold w-24">
          <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm shadow-md">3</span>
          <span className="text-xs text-center leading-tight">Xác nhận<br/>hoàn tất</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
            <i className="fa-solid fa-paper-plane text-blue-500 text-3xl" />
          </div>
        </div>
        
        <h1 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-3">Tạo đơn Custom thành công!</h1>
        <p className="text-secondary text-sm md:text-base mb-6 leading-relaxed">
          Yêu cầu Custom sách của bạn đã được hệ thống ghi nhận. Hãy đóng gói sách an toàn và gửi đến Trạm BookStation theo hướng dẫn.
        </p>
        
        <div className="inline-block bg-lightBg border border-accent/30 rounded-xl px-8 py-3 mb-8">
          <span className="text-sm text-secondary">Mã đơn Custom: </span>
          <span className="font-bold text-primary text-xl">#{orderCode}</span>
        </div>

        {/* Reminder note */}
        <div className="text-left bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-4 mb-8">
          <h3 className="font-semibold text-blue-800 text-sm flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation text-blue-500" /> Lưu ý quan trọng
          </h3>
          <ul className="space-y-3 text-sm text-blue-900/80">
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-circle text-[8px] text-blue-400 mt-1.5" />
              <span>Nhớ ghi <strong>Mã đơn Custom (#{orderCode})</strong> lên ngoài kiện hàng để nhân viên dễ dàng đối chiếu khi nhận sách.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-circle text-[8px] text-blue-400 mt-1.5" />
              <span>Sau khi nhận được sách của bạn, chúng tôi sẽ liên hệ qua Zalo/SĐT để xác nhận và chốt phương án thiết kế trước khi tiến hành gia công.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-circle text-[8px] text-blue-400 mt-1.5" />
              <span>Phí gia công sẽ được thu (COD) vào ngày BookStation gửi trả sách đã hoàn thiện cho bạn.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/orders"
            className="border-2 border-primary text-primary font-bold py-3 px-8 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
            <i className="fa-solid fa-box" /> Quản lý đơn hàng
          </Link>
          <Link href="/products"
            className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
            <i className="fa-solid fa-store" /> Dạo cửa hàng
          </Link>
        </div>
      </div>
    </main>
  );
}