"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

const VOUCHERS: Record<string, number> = {
  BOOK10: 10000,
  SACH20: 20000,
  NHOM10: 15000,
  FREESHIP30: 30000,
};

const VOUCHER_DESCS: Record<string, string> = {
  BOOK10: "Giảm 10.000đ cho đơn hàng từ 50.000đ",
  SACH20: "Giảm 20.000đ cho đơn hàng từ 100.000đ",
  NHOM10: "Giảm 15.000đ cho đơn hàng từ 75.000đ",
  FREESHIP30: "Giảm 30.000đ cho đơn hàng từ 150.000đ",
};

export default function VoucherChonPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherMsg, setVoucherMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [discountAmt, setDiscountAmt] = useState(0);

  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("cartCheckout") || localStorage.getItem("bsCart") || "[]");
    setCartItems(items);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const total = Math.max(0, subtotal - discountAmt);

  function selectVoucher(code: string) {
    setSelectedVoucher(code);
    setDiscountAmt(VOUCHERS[code] || 0);
    setVoucherMsg({ text: `✓ Áp dụng voucher ${code} thành công! Giảm ${formatPrice(VOUCHERS[code])}`, ok: true });
  }

  function applyManual() {
    const code = voucherInput.trim().toUpperCase();
    if (VOUCHERS[code] !== undefined) {
      selectVoucher(code);
    } else {
      setVoucherMsg({ text: "Mã voucher không hợp lệ hoặc đã hết hạn.", ok: false });
    }
  }

  function proceedCheckout() {
    sessionStorage.setItem("cartCheckout", JSON.stringify(cartItems));
    if (selectedVoucher) {
      sessionStorage.setItem("voucherApplied", selectedVoucher);
    }
    router.push("/checkout");
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Shop cart header */}
      <div className="bg-[#fafafa] border border-accent rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <i className="fa-solid fa-house text-white text-sm" />
          </div>
          <h2 className="font-bold text-primary text-xl">BookStation Official</h2>
        </div>

        <div className="bg-[#fafafa] border border-accent rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
            <span>Sản Phẩm</span>
            <span className="text-center">Đơn Giá</span>
            <span className="text-center">Số lượng</span>
            <span className="text-right">Số tiền</span>
          </div>
          {cartItems.length === 0 ? (
            <div className="px-4 py-4 text-sm text-gray-400">Giỏ hàng trống</div>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="grid grid-cols-4 px-4 py-4 items-center text-sm border-t border-gray-50 first:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-14 bg-linear-to-br from-lightBg to-accent rounded flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-book text-primary text-xs" />
                  </div>
                  <span className="font-semibold text-primary leading-tight line-clamp-2">{item.title}</span>
                </div>
                <span className="text-center text-secondary">{formatPrice(item.price)}</span>
                <span className="text-center font-semibold">{item.qty || 1}</span>
                <span className="text-right font-bold text-primary">{formatPrice((item.price || 0) * (item.qty || 1))}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Voucher section */}
      <div className="bg-white border border-accent rounded-3xl p-6 mb-6">
        <h2 className="font-bold text-primary text-xl mb-4">Chọn Voucher</h2>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value)}
            placeholder="Nhập mã voucher..."
            className="flex-1 border-[1.5px] border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-sm"
          />
          <button
            onClick={applyManual}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-secondary transition-colors text-sm"
          >
            Áp dụng
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(VOUCHERS).map(([code, amt]) => (
            <label
              key={code}
              className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-accent transition-colors ${selectedVoucher === code ? "border-primary bg-lightBg" : "border-gray-100"}`}
            >
              <input
                type="radio"
                name="voucher"
                value={code}
                checked={selectedVoucher === code}
                onChange={() => selectVoucher(code)}
                className="accent-primary"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary tracking-widest">{code}</span>
                  <span className="text-xs bg-accent/20 text-primary px-2 py-0.5 rounded-full">Giảm {formatPrice(amt)}</span>
                </div>
                <p className="text-xs text-secondary mt-0.5">{VOUCHER_DESCS[code]}</p>
              </div>
            </label>
          ))}
        </div>

        {voucherMsg && (
          <p className={`mt-3 text-sm font-semibold ${voucherMsg.ok ? "text-green-600" : "text-danger"}`}>
            {voucherMsg.text}
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white border border-accent rounded-3xl p-6 mb-6">
        <h2 className="font-bold text-primary text-xl mb-4">Tổng kết đơn hàng</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Tạm tính</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Voucher giảm giá</span>
            <span className="font-semibold text-green-600">-{formatPrice(discountAmt)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-bold text-primary">Tổng cộng</span>
            <span className="font-bold text-danger text-xl">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/cart"
          className="flex-1 text-center border-[1.5px] border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors"
        >
          Quay lại giỏ hàng
        </Link>
        <button
          onClick={proceedCheckout}
          className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-secondary transition-colors"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </main>
  );
}
