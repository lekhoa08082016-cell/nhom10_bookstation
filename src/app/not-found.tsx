import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-lightBg min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-heading font-bold whitespace-nowrap"
        style={{
          fontSize: "clamp(80px, 20vw, 200px)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(62, 37, 34, 0.06)",
          letterSpacing: "0.1em",
        }}
      >
        BOOKSTATION
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Top-left logo */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity z-10">
        <img src="/images/logo.png" alt="BookStation" className="h-8" />
        <span className="font-heading font-bold text-primary text-lg hidden sm:block">BookStation</span>
      </Link>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* Floating book stack */}
        <div className="animate-bounce mb-4" style={{ filter: "drop-shadow(0 8px 24px rgba(62,37,34,0.15))" }}>
          <div className="relative inline-block">
            <div className="w-28 h-36 mx-auto relative">
              <div className="absolute bottom-0 left-2 w-24 h-32 bg-secondary rounded-r-lg shadow-lg -rotate-6 origin-bottom-left" />
              <div className="absolute bottom-0 left-1 w-24 h-32 bg-accent rounded-r-lg shadow-lg -rotate-2 origin-bottom-left" />
              <div className="absolute bottom-0 left-0 w-24 h-32 bg-primary rounded-r-lg shadow-xl flex flex-col items-center justify-center gap-2 overflow-hidden">
                <div className="w-12 h-0.5 bg-white/30 rounded" />
                <i className="fa-solid fa-book-open text-white/60 text-2xl" />
                <div className="w-10 h-0.5 bg-white/30 rounded" />
                <div className="w-8 h-0.5 bg-white/30 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* 404 number */}
        <h1
          className="font-heading font-bold text-primary leading-none mb-0"
          style={{ fontSize: "clamp(90px, 22vw, 160px)", lineHeight: 1, letterSpacing: "-4px" }}
        >
          404
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 justify-center my-4">
          <div className="h-px flex-1 max-w-20 bg-accent/40" />
          <i className="fa-solid fa-bookmark text-accent text-sm" />
          <div className="h-px flex-1 max-w-20 bg-accent/40" />
        </div>

        {/* Text */}
        <h2 className="font-heading text-2xl md:text-3xl text-primary font-bold mb-3">
          Dòng thời gian bị gián đoạn
        </h2>
        <p className="text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-sm mx-auto">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Có lẽ đây là lúc để khám phá một cuốn sách mới?
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary transition-colors shadow-lg flex items-center gap-2 justify-center"
          >
            <i className="fa-solid fa-house text-sm" /> Quay về trang chủ
          </Link>
          <Link
            href="/products"
            className="border-2 border-primary text-primary font-semibold px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center gap-2 justify-center"
          >
            <i className="fa-solid fa-store text-sm" /> Khám phá cửa hàng
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-secondary">
          <Link href="/products" className="hover:text-primary transition-colors">Cửa hàng</Link>
          <span className="text-accent/50">·</span>
          <Link href="/custom-book" className="hover:text-primary transition-colors">Custom Sách</Link>
          <span className="text-accent/50">·</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span className="text-accent/50">·</span>
          <Link href="/auth/login" className="hover:text-primary transition-colors">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
