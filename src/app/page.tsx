"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Book } from "@/lib/booksData";
import { fetchDiscountBooks, fetchNewBooks } from "@/lib/supabaseBooks";
import BookCard from "@/components/product/BookCard";

const slides = [
  {
    bg: "/images/Banner 1.png",
    badge: "PHIÊN BẢN GIỚI HẠN",
    title: "Bộ Sưu Tập\nMùa Hè 2026",
    desc: "Khám phá những tựa sách làm mát tâm hồn xua tan đi cái nóng của mùa hè oi ả.\nTặng kèm bookmark độc quyền cho 100 đơn hàng đầu tiên.",
    btnLabel: "Khám phá ngay",
    btnHref: "/collections/summer",
    btnClass: "bg-accent hover:brightness-110 text-white",
  },
  {
    bg: "/images/Banner 2.png",
    badge: "PHIÊN BẢN GIỚI HẠN",
    title: "Sách Cũ\nKý Ức Mới",
    desc: "Biến những trang sách cũ thành những tác phẩm nghệ thuật độc bản.\nCustom bìa da thủ công, in lời nhắn cá nhân và chọn bookmark theo phong cách riêng",
    btnLabel: "Bắt đầu Custom",
    btnHref: "/custom-book",
    btnClass: "bg-lightBg text-black hover:bg-white",
  },
  {
    bg: "/images/Banner 3.png",
    badge: "HỆ THỐNG TRẠM DỪNG ĐỌC THỬ",
    title: "Thử trước,\nYêu sau",
    desc: "Hãy trải nghiệm 20% linh hồn của cuốn sách trước khi chính thức sở hữu.",
    btnLabel: "Đọc thử ngay",
    btnHref: "/products",
    btnClass: "bg-white text-black hover:bg-gray-100",
  },
];

const categories = [
  { icon: "fa-book-open", label: "Văn Học" },
  { icon: "fa-arrow-trend-up", label: "Kinh Tế" },
  { icon: "fa-star", label: "Kỹ Năng", iconType: "fa-regular" },
  { icon: "fa-heart", label: "Tâm Lý", iconType: "fa-regular" },
  { icon: "fa-truck", label: "Freeship" },
  { icon: "fa-gift", label: "Quà Tặng" },
];

const authors = [
  { img: "/images/anhtacgia1.png", name: "Nguyễn Nhật Ánh" },
  { img: "/images/anhtacgia2.png", name: "Higashino Keigo" },
  { img: "/images/anhtacgia3.png", name: "Paulo Coelho" },
  { img: "/images/anhtacgia4.png", name: "Haruki Murakami" },
  { img: "/images/anhtacgia5.png", name: "Thích Nhất Hạnh" },
  { img: "/images/anhtacgia6.png", name: "Rosie Nguyễn" },
];

function Countdown() {
  const [time, setTime] = useState({ h: 2, m: 45, s: 30 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        if (prev.h === 0 && prev.m === 0 && prev.s === 0) return prev;
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-3 bg-lightBg border border-danger rounded-full px-5 py-1.5 shadow-sm max-md:px-3">
      <span className="text-xs font-bold text-primary flex items-center gap-2 max-md:hidden">
        <i className="fa-regular fa-clock text-danger text-base" /> KẾT THÚC TRONG:
      </span>
      <div className="flex gap-1.5 items-center">
        <div className="bg-danger text-white px-2 py-0.5 rounded font-bold text-sm">{pad(time.h)}</div>:
        <div className="bg-danger text-white px-2 py-0.5 rounded font-bold text-sm">{pad(time.m)}</div>:
        <div className="bg-danger text-white px-2 py-0.5 rounded font-bold text-sm">{pad(time.s)}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [flashSaleBooks, setFlashSaleBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetchDiscountBooks(5).then(setFlashSaleBooks);
    fetchNewBooks(6).then(setNewBooks);
  }, []);

  return (
    <>
      {/* Banner Slider */}
      <section className="relative h-[420px] md:h-[350px] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent z-10" />
        <div className="w-full h-full relative">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 w-full h-full bg-cover bg-center flex items-center max-md:items-start transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              style={{ backgroundImage: `url('${slide.bg}')` }}
            >
              <div className="relative z-20 pl-32 md:pl-20 max-md:px-6 pr-12 md:pr-8 text-white max-w-4xl max-md:pt-10">
                <p className="text-[10px] md:text-sm uppercase flex items-center gap-2 mb-2 font-semibold tracking-wider">
                  <i className="fa-solid fa-bolt" /> {slide.badge}
                </p>
                <h2 className="font-heading text-2xl md:text-4xl lg:text-6xl leading-tight mb-4 whitespace-pre-line">{slide.title}</h2>
                <p className="text-xs md:text-sm lg:text-base mb-6 md:mb-4 whitespace-pre-line">{slide.desc}</p>
                <Link href={slide.btnHref} className={`inline-block px-8 md:px-10 py-2 md:py-3 rounded shadow-lg font-semibold text-sm md:text-base transition-all uppercase tracking-wide ${slide.btnClass}`}>
                  {slide.btnLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-accent transition-all">
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-accent transition-all">
          <i className="fa-solid fa-chevron-right" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`cursor-pointer transition-all duration-300 rounded-full h-2 md:h-3 ${i === current ? "bg-accent w-10 md:w-10" : "bg-white/50 w-2 md:w-3"}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex justify-between items-center gap-4 overflow-x-auto no-scrollbar max-md:p-4">
          {categories.map((cat) => (
            <Link key={cat.label} href="/products" className="flex flex-col items-center group cursor-pointer min-w-[80px] md:min-w-[70px]">
              <div className="w-16 h-16 rounded-full bg-[#E5E5E5] flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                <i className={`${cat.iconType || "fa-solid"} ${cat.icon} text-primary group-hover:text-white text-2xl transition-colors duration-300`} />
              </div>
              <span className="mt-3 text-secondary font-semibold group-hover:text-accent transition-colors duration-300 max-md:text-xs text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="mt-12 px-4 mb-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between border-b-2 border-danger pb-4 mb-8 max-md:flex-wrap max-md:gap-4">
            <div className="flex items-center gap-6 max-md:gap-3">
              <h3 className="font-heading text-2xl text-primary font-bold flex items-center gap-2 tracking-tight max-md:text-lg">
                <i className="fa-solid fa-bolt text-danger" /> TRẠM DỪNG GIÁ SỐC
              </h3>
              <Countdown />
            </div>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-3 max-md:grid-cols-2 gap-6 md:gap-4">
            {flashSaleBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Back to School Combo */}
      <section className="max-w-6xl mx-auto mb-10 px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="bg-linear-to-r from-primary via-[#613C38] to-[#A4625A] rounded-xl p-10 md:p-8 max-md:p-6 flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-6 md:gap-10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-4xl text-white mb-4 tracking-tight max-md:text-2xl">Combo Trạm Dừng - Back To School</h2>
              <p className="text-white/80 text-xl font-medium max-md:text-sm">
                Giảm thêm <span className="text-accent font-bold text-2xl max-md:text-xl">15%</span> khi mua từ 3 cuốn sách kỹ năng & tham khảo.
              </p>
            </div>
            <Link href="/collections/back-to-school"
              className="relative z-10 bg-accent text-primary font-bold px-10 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-sm max-md:mt-6">
              Mua Combo Ngay
            </Link>
          </div>
        </div>
      </section>

      {/* New Books */}
      <section className="max-w-6xl mx-auto mt-12 mb-20 px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-end border-b border-primary pb-2 mb-8">
            <h3 className="font-heading font-bold text-2xl text-primary uppercase tracking-tight max-md:text-lg">SÁCH MỚI LÊN KỆ</h3>
            <Link href="/products" className="text-sm text-accent hover:text-secondary transition-colors font-medium">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-6 lg:grid-cols-6 md:grid-cols-4 max-md:grid-cols-2 gap-6">
            {newBooks.map((book) => (
              <BookCard key={book.slug} book={book} badge="Mới" badgeClass="bg-danger" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="max-w-6xl mx-auto mt-12 mb-20 px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-center mb-10">
            <h3 className="font-heading font-bold text-2xl text-primary uppercase tracking-tight max-md:text-lg">TÁC GIẢ NỔI BẬT</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {authors.map((author) => (
              <div key={author.name} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-3 border border-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300 max-md:w-[80px] max-md:h-[80px]">
                  <img src={author.img} alt={author.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-[15px] font-semibold text-primary line-clamp-1 max-md:text-xs">{author.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Book Promo */}
      <section className="max-w-6xl mx-auto mt-12 mb-12 px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="bg-lightBg p-10 flex flex-col justify-center max-md:p-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded w-fit uppercase mb-4 tracking-wider">
                Dịch vụ độc quyền
              </span>
              <h3 className="font-heading font-bold text-3xl text-primary leading-tight mb-6 uppercase tracking-tight max-md:text-xl">
                Biến cuốn sách trở thành<br />món quà độc bản
              </h3>
              <ul className="space-y-4 mb-10 max-md:mb-6">
                <li className="flex items-start gap-3.5 text-primary">
                  <i className="fa-solid fa-check-double mt-1 text-secondary text-sm" />
                  <span className="text-sm">Tùy chọn bìa sách theo phong cách riêng.</span>
                </li>
                <li className="flex items-start gap-3.5 text-primary">
                  <i className="fa-solid fa-signature mt-1 text-secondary text-sm" />
                  <span className="text-sm">In lời nhắn cá nhân lên trang lót.</span>
                </li>
                <li className="flex items-start gap-3.5 text-primary">
                  <i className="fa-solid fa-gift mt-1 text-secondary text-sm" />
                  <span className="text-sm">Tặng kèm hộp quà và bookmark cao cấp.</span>
                </li>
              </ul>
              <Link href="/custom-book"
                className="bg-primary text-white font-semibold py-3 px-8 rounded-lg w-fit hover:bg-secondary transition-colors text-sm uppercase tracking-wider shadow-md">
                Trải Nghiệm Custom Ngay
              </Link>
            </div>
            <div className="h-full min-h-[350px] max-md:min-h-[250px] rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none overflow-hidden">
              <img src="/images/anhTrangchu1.png" alt="Custom Sách" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="max-w-6xl mx-auto mb-20 px-4">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 overflow-hidden max-md:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "fa-truck-fast", title: "Giao Hàng Miễn Phí", desc: "Cho đơn hàng từ 250.000đ" },
              { icon: "fa-shield-halved", title: "100% Sách Thật", desc: "Đảm bảo bản quyền từ NXB" },
              { icon: "fa-box-archive", title: "Gói Quà Miễn Phí", desc: "Dịch vụ gói quà thẩm mỹ" },
              { icon: "fa-rotate-left", title: "Đổi Trả Dễ Dàng", desc: "Trong vòng 7 ngày" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center border-r border-gray-100 last:border-0 px-4 max-md:border-b max-md:border-r-0 max-md:pb-4">
                <div className="mb-4 text-2xl text-primary">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <h4 className="font-bold text-primary text-sm mb-1 uppercase tracking-wider">{item.title}</h4>
                <p className="text-xs text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
