"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/lib/utils";

const VOUCHERS_DATA = [
  { code: 'BOOK10', discount: 10000, desc: 'Giảm 10.000đ cho đơn hàng từ 100.000đ' },
  { code: 'SACH20', discount: 20000, desc: 'Giảm 20.000đ cho đơn hàng từ 200.000đ' },
  { code: 'NHOM10', discount: 15000, desc: 'Giảm 15.000đ khi mua 3 cuốn sách trở lên' },
  { code: 'FREESHIP30', discount: 30000, desc: 'Miễn phí vận chuyển, giảm 30.000đ' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingFee, setShippingFee] = useState(15000);
  const [note, setNote] = useState("");

  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherMsg, setVoucherMsg] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Đọc các sản phẩm được tích chọn từ trang Giỏ hàng truyền sang
    const selectedFromCart = sessionStorage.getItem("checkoutItems");
    if (selectedFromCart) {
      setCheckoutItems(JSON.parse(selectedFromCart));
    } else {
      // Fallback: Nếu không truyền gì, lấy toàn bộ giỏ hàng
      setCheckoutItems(useCartStore.getState().items);
    }

    // Đọc voucher được áp dụng từ Kho Voucher (Profile) nếu có
    const appliedVoucher = sessionStorage.getItem("voucherApplied");
    if (appliedVoucher) {
      setVoucherInput(appliedVoucher);
      const found = VOUCHERS_DATA.find(v => v.code === appliedVoucher);
      if (found) {
        setSelectedVoucher(found.code);
        setVoucherMsg({ text: `✓ Áp dụng voucher ${found.code} thành công! Giảm ${formatPrice(found.discount)}`, type: 'success' });
      }
      sessionStorage.removeItem("voucherApplied");
    }

    setIsLoading(false);
  }, []);

  const handleApplyVoucher = (codeToApply = voucherInput) => {
    const code = codeToApply.trim().toUpperCase();
    const found = VOUCHERS_DATA.find(v => v.code === code);
    if (found) {
      setSelectedVoucher(found.code);
      setVoucherMsg({ text: `✓ Áp dụng voucher ${found.code} thành công! Giảm ${formatPrice(found.discount)}`, type: 'success' });
    } else {
      setVoucherMsg({ text: 'Mã voucher không hợp lệ hoặc đã hết hạn.', type: 'error' });
    }
  };

  const handleSelectVoucherRadio = (code: string) => {
    setSelectedVoucher(code);
    setVoucherInput(code);
    const found = VOUCHERS_DATA.find(v => v.code === code);
    if (found) {
      setVoucherMsg({ text: `✓ Áp dụng voucher ${found.code} thành công! Giảm ${formatPrice(found.discount)}`, type: 'success' });
    }
  };

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const appliedVoucherObj = VOUCHERS_DATA.find(v => v.code === selectedVoucher);
  const discountAmt = appliedVoucherObj ? appliedVoucherObj.discount : 0;
  const total = Math.max(0, subtotal + shippingFee - discountAmt);

  if (isLoading) return null;

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-heading text-2xl text-primary font-bold mb-4">Giỏ hàng trống</h2>
        <p className="text-secondary mb-8">Bạn cần chọn ít nhất một sản phẩm để tiến hành thanh toán.</p>
        <Link href="/products" className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary transition-colors">
          Trở lại cửa hàng
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const orderCode = 'BS' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      code: orderCode,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'processing',
      name: user?.name || "Nguyễn Văn A",
      phone: user?.phone || "09XX.XXX.XXX",
      address: "Số 1 Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh",
      total: total,
      discount: discountAmt,
      voucherCode: selectedVoucher,
      note: note,
      paymentMethod: paymentMethod,
      items: checkoutItems.map(i => ({ title: i.title, price: i.price, qty: i.qty, image: i.image }))
    };

    const key = `bsOrders_${user?.email || 'guest'}`;
    const existingOrders = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([newOrder, ...existingOrders]));

    // Lưu mã đơn hàng để trang success đọc
    sessionStorage.setItem("lastOrderCode", orderCode);

    if (paymentMethod === "momo") router.push("/checkout/momo");
    else if (paymentMethod === "bank") router.push("/checkout/bank-transfer");
    else {
      useCartStore.getState().clearCart();
      router.push("/orders/success");
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-4">
      <h1 className="font-heading text-2xl text-primary font-bold mb-4">Thanh toán</h1>

      {/* Delivery address */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-primary flex items-center gap-2"><i className="fa-solid fa-map-pin text-accent" /> Địa chỉ nhận hàng</h2>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <p className="font-semibold text-primary">{user?.name || "Nguyễn Văn A"}</p>
              <span className="text-xs border border-accent text-accent px-2 py-0.5 rounded-full">Mặc định</span>
            </div>
            <p className="text-sm text-gray-500">{user?.phone || "09XX.XXX.XXX"}</p>
            <p className="text-sm text-secondary mt-1">Số 1 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh</p>
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
          <i className="fa-solid fa-house text-accent text-sm" /> <span className="font-semibold text-primary text-sm">BookStation Official</span>
        </div>
        
        {checkoutItems.map((item, idx) => (
          <div key={idx} className="px-5 py-4 border-b border-gray-50 flex gap-4 md:grid md:grid-cols-12 md:items-center">
            <div className="md:col-span-6 flex items-center gap-3">
              <img src={item.image} alt={item.title} className="w-14 h-18 rounded-lg object-cover" />
              <div>
                <p className="font-semibold text-primary text-sm line-clamp-1">{item.title}</p>
                <p className="text-xs text-secondary">{item.author}</p>
              </div>
            </div>
            <div className="hidden md:block md:col-span-2 text-center text-sm font-medium text-primary">{formatPrice(item.price)}</div>
            <div className="md:col-span-2 text-center text-sm">x{item.qty}</div>
            <div className="md:col-span-2 text-right text-sm font-bold text-primary">{formatPrice(item.price * item.qty)}</div>
          </div>
        ))}

        <div className="px-5 py-4 bg-gray-50/50">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Lời nhắn:</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Lưu ý cho người bán..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent" />
        </div>

        <div className="px-5 py-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Đơn vị vận chuyển:</p>
          <div className="space-y-2">
            <label className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-accent transition-colors">
              <div className="flex items-center gap-2">
                <input type="radio" name="shipping" value="15000" checked={shippingFee === 15000} onChange={() => setShippingFee(15000)} className="accent-primary" />
                <span className="text-sm font-medium text-primary">Giao tiêu chuẩn</span><span className="text-xs text-secondary">(3–5 ngày)</span>
              </div>
              <span className="text-sm font-semibold text-primary">{formatPrice(15000)}</span>
            </label>
            <label className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-accent transition-colors">
              <div className="flex items-center gap-2">
                <input type="radio" name="shipping" value="35000" checked={shippingFee === 35000} onChange={() => setShippingFee(35000)} className="accent-primary" />
                <span className="text-sm font-medium text-primary">Giao hỏa tốc</span><span className="text-xs text-secondary">(1–2 ngày)</span>
              </div>
              <span className="text-sm font-semibold text-primary">{formatPrice(35000)}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Voucher section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
          <i className="fa-solid fa-ticket text-accent" /> Chọn Voucher
        </h2>

        <div className="flex gap-3 mb-5">
          <input 
            type="text" 
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value)}
            placeholder="Nhập mã voucher..." 
            className="flex-1 border-[1.5px] border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-accent text-sm uppercase"
          />
          <button onClick={() => handleApplyVoucher()} className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-secondary transition-colors text-sm shrink-0">
            Áp dụng
          </button>
        </div>

        <div className="space-y-3">
          {VOUCHERS_DATA.map((v) => (
            <label key={v.code} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${selectedVoucher === v.code ? 'border-accent bg-[#FFF2DF]/50' : 'border-gray-100 hover:border-accent'}`}>
              <input 
                type="radio" 
                name="voucher" 
                value={v.code} 
                checked={selectedVoucher === v.code}
                onChange={() => handleSelectVoucherRadio(v.code)}
                className="accent-primary" 
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary tracking-widest">{v.code}</span>
                  <span className="text-[10px] bg-accent/20 text-primary px-2 py-0.5 rounded-full font-semibold">Giảm {formatPrice(v.discount)}</span>
                </div>
                <p className="text-xs text-secondary mt-0.5">{v.desc}</p>
              </div>
            </label>
          ))}
        </div>

        {voucherMsg && (
          <p className={`mt-3 text-sm font-semibold ${voucherMsg.type === 'success' ? 'text-green-600' : 'text-danger'}`}>
            {voucherMsg.text}
          </p>
        )}
      </div>

      {/* Payment methods & Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="mb-5">
          <p className="text-sm font-semibold text-primary mb-3">Phương thức thanh toán:</p>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-lightBg' : 'border-gray-200 hover:border-accent'}`}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-primary" />
              <div className="flex items-center gap-2"><i className="fa-solid fa-money-bill-wave text-green-600" /> <span className="text-sm font-medium text-primary">Thanh toán khi nhận hàng</span></div>
            </label>
            <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-primary bg-lightBg' : 'border-gray-200 hover:border-accent'}`}>
              <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-primary" />
              <div className="flex items-center gap-2"><i className="fa-solid fa-building-columns text-blue-600" /> <span className="text-sm font-medium text-primary">Chuyển khoản ngân hàng</span></div>
            </label>
            <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'momo' ? 'border-primary bg-lightBg' : 'border-gray-200 hover:border-accent'}`}>
              <input type="radio" name="payment" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} className="accent-primary" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#ae2070] flex items-center justify-center">
                  <i className="fa-solid fa-m text-white text-[9px]"></i>
                </div>
                <span className="text-sm font-medium text-primary">Ví MoMo</span>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
          <div className="flex justify-between text-gray-500"><span>Tổng tiền hàng:</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-gray-500"><span>Phí vận chuyển:</span><span>{formatPrice(shippingFee)}</span></div>
          {discountAmt > 0 && (
            <div className="flex justify-between text-green-600 font-medium"><span>Voucher giảm giá:</span><span>-{formatPrice(discountAmt)}</span></div>
          )}
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
            <span className="text-primary">Tổng thanh toán:</span><span className="text-danger text-xl">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-xs text-gray-500 text-center">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <Link href="/policies/terms" className="text-accent hover:underline">Điều khoản BookStation</Link></p>
          <button onClick={handlePlaceOrder} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-colors text-base shadow-md tracking-wide">
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </main>
  );
}