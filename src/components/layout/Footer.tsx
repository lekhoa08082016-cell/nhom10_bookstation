import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-[#FFF2DF] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Logo & tagline */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="BookStation Logo" className="h-14 w-auto object-contain" />
              <h2 className="font-heading font-bold text-3xl tracking-tight">BookStation</h2>
            </div>
            <p className="font-heading italic text-xl text-accent">"Mỗi quyển sách, một trạm dừng"</p>
            <div className="text-sm leading-relaxed opacity-80 max-w-md">
              <p>Dự án môn học Thiết Kế Web - Nhóm 10.</p>
              <p>Hệ thống bán sách trực tuyến kết hợp dịch vụ custom bìa độc đáo.</p>
            </div>
          </div>

          {/* Liên Kết */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-accent text-lg mb-6 uppercase tracking-wider">Liên Kết</h4>
            <ul className="space-y-4 text-[15px]">
              <li><Link href="/" className="hover:text-accent transition-colors">Trang chủ</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Cửa hàng</Link></li>
              <li><Link href="/custom-book" className="hover:text-accent transition-colors">Custom sách</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Về BookStation</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Hỗ Trợ */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-accent text-lg mb-6 uppercase tracking-wider">Hỗ Trợ</h4>
            <ul className="space-y-4 text-[15px]">
              <li><Link href="/policies/privacy" className="hover:text-accent transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/policies/terms" className="hover:text-accent transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="/policies/shipping" className="hover:text-accent transition-colors">Phương thức vận chuyển</Link></li>
              <li><Link href="/policies/return" className="hover:text-accent transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="/policies/payment" className="hover:text-accent transition-colors">Phương thức thanh toán</Link></li>
              <li className="pt-2 opacity-90 font-medium">Liên hệ: bookstation@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FFF2DF]/10 pt-8 mt-8 text-center">
          <p className="text-xs opacity-60 tracking-widest uppercase">
            © 2026 BOOKSTATION - ĐỒ ÁN WEB NHÓM 10 (HK2 2025-2026).
          </p>
        </div>
      </div>
    </footer>
  );
}
