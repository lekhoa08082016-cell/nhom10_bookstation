"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

type OrderStatus = "all" | "processing" | "shipping" | "done" | "cancelled";

const TABS: { key: OrderStatus; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "processing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang giao" },
  { key: "done", label: "Hoàn thành" },
  { key: "cancelled", label: "Đã huỷ" },
];

const STATUS_STYLES: Record<string, { label: string; color: string; icon: string }> = {
  processing: { label: "Đang xử lý", color: "bg-yellow-50 text-yellow-600", icon: "fa-clock" },
  shipping: { label: "Đang giao", color: "bg-blue-50 text-blue-600", icon: "fa-truck" },
  done: { label: "Hoàn thành", color: "bg-green-50 text-green-600", icon: "fa-check-circle" },
  cancelled: { label: "Đã huỷ", color: "bg-red-50 text-red-400", icon: "fa-times-circle" },
};

function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function OrdersPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<OrderStatus>("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [cancelModal, setCancelModal] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { router.push("/auth/login"); return; }
    const key = `bsOrders_${user.email}`;
    setOrders(JSON.parse(localStorage.getItem(key) || "[]"));
  }, [user, router]);

  function cancelOrder(code: string) {
    const key = `bsOrders_${user!.email}`;
    const updated = orders.map((o) =>
      (o.code || o.orderCode) === code ? { ...o, status: "cancelled" } : o
    );
    localStorage.setItem(key, JSON.stringify(updated));
    setOrders(updated);
    setCancelModal(null);
  }

  if (!user) return null;

  const filtered =
    tab === "all" ? orders : orders.filter((o) => o.status === tab);

  const emptyMsg: Record<OrderStatus, string> = {
    all: "Chưa có đơn hàng nào",
    processing: "Không có đơn hàng đang xử lý",
    shipping: "Không có đơn hàng đang giao",
    done: "Chưa có đơn hàng hoàn thành",
    cancelled: "Không có đơn hàng đã huỷ",
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl text-primary font-bold mb-6">Quản Lý Đơn Hàng</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSidebar />

        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 min-w-24 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    tab === t.key
                      ? "text-primary font-semibold border-primary"
                      : "text-gray-500 border-transparent hover:text-primary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-box-open text-3xl text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium text-lg">{emptyMsg[tab]}</p>
                  <p className="text-gray-400 text-sm mt-2">Mua sắm ngay để tạo đơn hàng đầu tiên</p>
                  <Link
                    href="/products"
                    className="inline-block mt-6 bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-secondary transition-colors text-sm"
                  >
                    Mua sắm ngay
                  </Link>
                </div>
              ) : (
                <div id="orders-container" className="space-y-4">
                  {filtered.map((o, i) => {
                    const s = STATUS_STYLES[o.status] || STATUS_STYLES.processing;
                    const itemsText =
                      o.items?.length > 0
                        ? o.items[0].title + (o.items.length > 1 ? ` +${o.items.length - 1} sản phẩm` : "")
                        : o.bookTitle || "Đơn hàng";
                    const total = o.total || 0;
                    return (
                      <div key={i} className="border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-20 bg-linear-to-br from-lightBg to-accent rounded-lg flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-book text-primary text-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-primary text-sm truncate">{itemsText}</span>
                              <span className={`text-xs ${s.color} px-2 py-0.5 rounded-full font-medium whitespace-nowrap flex items-center gap-1`}>
                                <i className={`fa-solid ${s.icon} text-[10px]`} /> {s.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-1">
                              Mã đơn: <span className="font-mono font-semibold text-primary">{o.code || o.orderCode}</span>
                            </p>
                            <p className="text-xs text-secondary mb-3">{o.date || "—"}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-danger">{fmt(total)}</span>
                              <div className="flex gap-2 flex-wrap">
                                <Link
                                  href={`/orders/tracking?code=${o.code || o.orderCode}`}
                                  className="text-xs border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors"
                                >
                                  Theo dõi
                                </Link>
                                {o.status === "done" && (
                                  <Link
                                    href="/reviews"
                                    className="text-xs bg-accent text-primary px-3 py-1.5 rounded-lg hover:bg-accent/80 transition-colors font-semibold"
                                  >
                                    Đánh giá
                                  </Link>
                                )}
                                {o.status === "processing" && (
                                  <button
                                    onClick={() => setCancelModal(o.code || o.orderCode)}
                                    className="text-xs border border-red-300 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                  >
                                    Hủy đơn
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal xác nhận hủy đơn */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-triangle-exclamation text-red-400 text-2xl" />
            </div>
            <h3 className="font-heading font-bold text-primary text-lg mb-2">Hủy đơn hàng?</h3>
            <p className="text-sm text-secondary mb-1">Mã đơn: <span className="font-mono font-semibold text-primary">#{cancelModal}</span></p>
            <p className="text-xs text-gray-400 mb-6">Sau khi hủy, đơn hàng không thể khôi phục lại.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelModal(null)}
                className="flex-1 border-2 border-gray-200 text-gray-500 font-semibold py-2.5 rounded-xl hover:bg-gray-50 text-sm">
                Giữ lại
              </button>
              <button onClick={() => cancelOrder(cancelModal)}
                className="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-xl hover:bg-red-600 text-sm">
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
