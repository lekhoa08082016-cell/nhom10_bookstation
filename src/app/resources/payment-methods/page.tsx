import Link from "next/link";

const METHODS = [
  {
    icon: "fa-money-bill-wave", color: "text-green-600", bg: "bg-green-50",
    title: "Thanh toán khi nhận hàng (COD)",
    desc: "Bạn thanh toán bằng tiền mặt khi nhận được hàng từ shipper. Phương thức an toàn, không cần tài khoản ngân hàng.",
    note: "Áp dụng cho tất cả đơn hàng toàn quốc.",
  },
  {
    icon: "fa-building-columns", color: "text-blue-600", bg: "bg-blue-50",
    title: "Chuyển khoản ngân hàng",
    desc: "Chuyển khoản trực tiếp đến tài khoản MB Bank của BookStation. Đơn hàng được xác nhận trong vòng 15 phút sau khi nhận được giao dịch.",
    note: "STK: 0123 4567 8999 — BOOKSTATION — MB BANK.",
  },
  {
    icon: "fa-wallet", color: "text-[#ae2070]", bg: "bg-pink-50",
    title: "Ví điện tử MoMo",
    desc: "Quét mã QR hoặc nhập số điện thoại để thanh toán qua ví MoMo. Nhanh chóng và tiện lợi.",
    note: "Đơn hàng tự động xác nhận sau khi thanh toán thành công.",
  },
];

export default function PaymentMethodsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Phương thức thanh toán</h1>
        <div className="h-px bg-accent/50 mb-8" />
        <div className="space-y-6">
          {METHODS.map((m) => (
            <div key={m.title} className={`${m.bg} rounded-2xl p-6 flex gap-5`}>
              <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm`}>
                <i className={`fa-solid ${m.icon} ${m.color} text-xl`} />
              </div>
              <div>
                <h2 className="font-bold text-primary text-lg mb-1">{m.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{m.desc}</p>
                <p className="text-xs text-secondary font-medium">{m.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-lightBg rounded-xl p-4 text-sm text-secondary text-center">
          Cần hỗ trợ? Liên hệ <strong>1900 6666</strong> hoặc{" "}
          <a href="mailto:bookstation@gmail.com" className="text-accent hover:underline">bookstation@gmail.com</a>
        </div>
      </div>
    </main>
  );
}
