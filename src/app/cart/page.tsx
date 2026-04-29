"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

const VOUCHERS: Record<string, number> = { "BOOK10": 10000, "SACH20": 20000, "NHOM10": 15000, "FREESHIP30": 30000 };

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, clearCart } = useCartStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [voucher, setVoucher] = useState("");
  const [discountAmt, setDiscountAmt] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const subtotal = items
    .filter((i) => selected.includes(i.id))
    .reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.max(0, subtotal - discountAmt);
  const selectedQty = items.filter((i) => selected.includes(i.id)).reduce((s, i) => s + i.qty, 0);

  function toggleAll(checked: boolean) { setSelected(checked ? items.map((i) => i.id) : []); }
  function toggleItem(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }
  function applyVoucher() {
    const amt = VOUCHERS[voucher.toUpperCase()];
    if (amt) { setDiscountAmt(amt); setVoucherMsg(`✓ Áp dụng thành công! Giảm ${formatPrice(amt)}`); }
    else { setDiscountAmt(0); setVoucherMsg("✗ Mã không hợp lệ hoặc đã hết hạn."); }
  }
  function confirmRemove(id: string) { setDeleteId(id); setShowModal(true); }
  function doRemove() {
    if (deleteId) { removeItem(deleteId); setSelected((p) => p.filter((x) => x !== deleteId)); }
    setShowModal(false); setDeleteId(null);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 pb-16 flex flex-col items-center justify-center py-24 text-center">
        <div className="w-28 h-28 rounded-full bg-accent/15 flex items-center justify-center mb-6">
          <i className="fa-solid fa-cart-shopping text-5xl text-accent" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-primary mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-secondary text-sm max-w-xs leading-relaxed mb-8">
          Dường như bạn chưa chọn cuốn sách nào. Hãy khám phá kho sách phong phú của chúng tôi nhé!
        </p>
        <Link href="/products" className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary transition-colors flex items-center gap-2 shadow-md">
          <i className="fa-solid fa-store text-sm" /> Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-5 pt-6">
        <h1 className="font-heading text-2xl font-bold text-primary">Giỏ hàng của bạn</h1>
        <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
          <i className="fa-solid fa-trash-can" /> Xóa tất cả
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-lightBg px-5 py-3 flex items-center gap-4 border-b border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.length === items.length} onChange={(e) => toggleAll(e.target.checked)} />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Chọn tất cả ({items.length})</span>
              </label>
            </div>
            {items.map((item) => (
              <div key={item.id} className="px-5 py-4 border-b border-gray-50 flex items-center gap-4">
                <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleItem(item.id)} />
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm line-clamp-2">{item.title}</p>
                  <p className="text-xs text-secondary">{item.author}</p>
                  <p className="text-danger font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1 text-primary hover:bg-gray-50 text-sm">−</button>
                  <span className="px-3 text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 text-primary hover:bg-gray-50 text-sm">+</button>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="text-danger font-bold text-sm">{formatPrice(item.price * item.qty)}</p>
                  <button onClick={() => confirmRemove(item.id)} className="text-xs text-gray-400 hover:text-red-500 mt-1">
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="/products" className="mt-4 flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
            <i className="fa-solid fa-arrow-left text-xs" /> Tiếp tục mua sắm
          </Link>
        </div>

        <div className="lg:w-72 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="font-semibold text-primary text-sm mb-3 flex items-center gap-2">
              <i className="fa-solid fa-tag text-accent" /> Shop Voucher
            </p>
            <div className="flex gap-2">
              <input value={voucher} onChange={(e) => setVoucher(e.target.value)} type="text"
                placeholder="Nhập mã giảm giá..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent" />
              <button onClick={applyVoucher} className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">Áp dụng</button>
            </div>
            {voucherMsg && <p className={`text-xs mt-2 ${discountAmt > 0 ? "text-green-600" : "text-danger"}`}>{voucherMsg}</p>}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="font-semibold text-primary text-sm mb-4">Tóm tắt đơn hàng</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Tạm tính ({selectedQty} sản phẩm)</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Giảm giá voucher</span><span className="text-green-600">-{formatPrice(discountAmt)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Phí vận chuyển</span><span className="text-green-600">Tính khi thanh toán</span>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-primary">Tổng cộng</span>
              <span className="font-bold text-xl text-danger">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                if (selected.length === 0) return;
                const selectedItems = items.filter((i) => selected.includes(i.id));
                sessionStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
                router.push("/checkout");
              }}
              disabled={selected.length === 0}
              className="mt-5 w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <i className="fa-solid fa-lock text-sm" /> Mua Hàng ({selectedQty})
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
            {[
              { icon: "fa-shield-halved", text: "Thanh toán 100% bảo mật" },
              { icon: "fa-rotate-left", text: "Đổi trả dễ dàng trong 7 ngày" },
              { icon: "fa-truck-fast", text: "Giao hàng toàn quốc" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-xs text-gray-500">
                <i className={`fa-solid ${b.icon} text-accent text-base w-5 text-center`} /><span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-trash-can text-red-400 text-2xl" />
            </div>
            <h3 className="font-heading font-bold text-primary text-lg mb-2">Xóa sản phẩm?</h3>
            <p className="text-sm text-secondary mb-6">Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-gray-200 text-gray-500 font-semibold py-2.5 rounded-xl hover:bg-gray-50 text-sm">Hủy</button>
              <button onClick={doRemove} className="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-xl hover:bg-red-600 text-sm">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
