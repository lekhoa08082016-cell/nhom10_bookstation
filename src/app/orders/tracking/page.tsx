"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const STEPS = [
  { key: "ordered",   label: "Đặt hàng thành công",          icon: "fa-check",         statusNeeded: ["processing", "shipping", "done"] },
  { key: "confirmed", label: "Shop đã xác nhận & đóng gói",  icon: "fa-box",           statusNeeded: ["shipping", "done"] },
  { key: "shipping",  label: "Đang trên đường giao hàng",    icon: "fa-truck",         statusNeeded: ["done"],  activeOn: ["shipping"] },
  { key: "delivered", label: "Giao hàng thành công",         icon: "fa-house",         statusNeeded: ["done"] },
];

const STATUS_LABEL: Record<string, { label: string; color: string; icon: string }> = {
  processing: { label: "Đang xử lý",  color: "bg-yellow-50 text-yellow-600", icon: "fa-clock" },
  shipping:   { label: "Đang giao",   color: "bg-blue-50 text-blue-600",     icon: "fa-truck" },
  done:       { label: "Hoàn thành",  color: "bg-green-50 text-green-600",   icon: "fa-check-circle" },
  cancelled:  { label: "Đã huỷ",     color: "bg-red-50 text-red-400",       icon: "fa-times-circle" },
};

function fmt(n: number) { return n.toLocaleString("vi-VN") + "đ"; }

function TrackingContent() {
  const params = useSearchParams();
  const code = params.get("code") || "";
  const user = useAuthStore((s) => s.user);

  const key = `bsOrders_${user?.email || "guest"}`;
  const orders: any[] = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem(key) || "[]")
    : [];
  const order = orders.find((o: any) => (o.code || o.orderCode) === code) || null;

  const status = order?.status || "processing";
  const statusInfo = STATUS_LABEL[status] || STATUS_LABEL.processing;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/orders" className="text-secondary hover:text-primary text-sm flex items-center gap-1">
          <i className="fa-solid fa-chevron-left text-xs" /> Quay lại
        </Link>
        <h1 className="font-heading text-2xl text-primary font-bold">Theo Dõi Đơn Hàng</h1>
      </div>

      {/* Order info */}
      <div className="bg-white rounded-2xl border border-accent shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <p className="text-sm text-secondary mb-1">Mã đơn hàng</p>
            <p className="font-bold text-primary text-xl font-mono">#{code || "—"}</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.color}`}>
            <i className={`fa-solid ${statusInfo.icon} mr-1`} /> {statusInfo.label}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-secondary mb-1">Người nhận</p>
            <p className="font-semibold text-primary">{order?.name || user?.name || "—"}</p>
          </div>
          <div>
            <p className="text-secondary mb-1">Số điện thoại</p>
            <p className="font-semibold text-primary">{order?.phone || user?.phone || "—"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-secondary mb-1">Ngày đặt</p>
            <p className="font-semibold text-primary">{order?.date || "—"}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-primary text-lg mb-6">Trạng thái đơn hàng</h2>
        <div className="relative">
          {STEPS.map((step, i) => {
            const isDone   = step.statusNeeded.includes(status);
            const isActive = !isDone && (step.activeOn?.includes(status) ?? false);
            return (
              <div key={step.key} className="flex gap-4 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isDone   ? "bg-primary" :
                    isActive ? "bg-blue-500 animate-pulse" :
                               "bg-gray-200"
                  }`}>
                    <i className={`fa-solid ${step.icon} text-sm ${isDone || isActive ? "text-white" : "text-gray-400"}`} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-1 min-h-8 ${isDone ? "bg-primary" : "bg-gray-200"}`} />
                  )}
                </div>
                <div className="pt-1.5">
                  <p className={`font-semibold text-sm ${isDone ? "text-primary" : isActive ? "text-blue-600" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                  {isDone && i === 0 && order?.date && (
                    <p className="text-xs text-secondary mt-0.5">{order.date}</p>
                  )}
                  {!isDone && !isActive && (
                    <p className="text-xs text-gray-400 mt-0.5">Chưa cập nhật</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      {order?.items?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-primary text-lg mb-4">Sản phẩm đặt mua</h2>
          <div className="space-y-4">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-14 h-18 object-cover rounded-lg shrink-0" />
                ) : (
                  <div className="w-14 h-18 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-book text-gray-300 text-xl" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm line-clamp-1">{item.title}</p>
                  <p className="text-xs text-secondary mt-0.5">x{item.qty || 1}</p>
                </div>
                <p className="font-bold text-danger text-sm shrink-0">{fmt(item.price * (item.qty || 1))}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-sm">
            <span className="font-bold text-primary">Tổng thanh toán:</span>
            <span className="font-bold text-danger text-base">{fmt(order.total || 0)}</span>
          </div>
        </div>
      )}

      {!order && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-3 mb-6">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 shrink-0" />
          <p>Không tìm thấy thông tin đơn hàng <strong>#{code}</strong>. Vui lòng kiểm tra lại mã đơn.</p>
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/products"
          className="flex-1 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
          <i className="fa-solid fa-store text-sm" /> Tiếp tục mua sắm
        </Link>
        <Link href="/orders"
          className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
          <i className="fa-solid fa-box" /> Tất cả đơn hàng
        </Link>
      </div>
    </main>
  );
}

export default function TrackingPage() {
  return (
    <Suspense>
      <TrackingContent />
    </Suspense>
  );
}
