const SHIPPING_OPTIONS = [
  {
    icon: "fa-truck", color: "text-blue-600",
    title: "Giao tiêu chuẩn", fee: "15.000đ", time: "3–5 ngày làm việc",
    desc: "Giao hàng toàn quốc qua đối tác vận chuyển uy tín. Phù hợp với đơn hàng thông thường.",
  },
  {
    icon: "fa-truck-fast", color: "text-orange-500",
    title: "Giao hỏa tốc", fee: "35.000đ", time: "1–2 ngày làm việc",
    desc: "Giao hàng nhanh trong nội thành và các tỉnh thành lớn. Ưu tiên xử lý trước.",
  },
];

export default function ShippingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Phương thức vận chuyển</h1>
        <div className="h-px bg-accent/50 mb-8" />
        <div className="space-y-6">
          {SHIPPING_OPTIONS.map((s) => (
            <div key={s.title} className="border border-gray-100 rounded-2xl p-6 flex gap-5 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <i className={`fa-solid ${s.icon} ${s.color} text-xl`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h2 className="font-bold text-primary text-lg">{s.title}</h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-danger">{s.fee}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-secondary">{s.time}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-3 text-sm text-gray-600">
          <h2 className="font-heading text-primary text-xl font-bold">Lưu ý quan trọng</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Thời gian giao hàng tính từ khi đơn được xác nhận, không tính ngày lễ/Tết.</li>
            <li>Miễn phí vận chuyển cho đơn hàng từ 500.000đ (áp dụng giao tiêu chuẩn).</li>
            <li>Sách Custom có thể mất thêm 3–7 ngày sản xuất trước khi giao.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
