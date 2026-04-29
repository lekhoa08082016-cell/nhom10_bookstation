"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import type { Book } from "@/lib/booksData";
import { fetchBooks } from "@/lib/supabaseBooks";
import BookCard from "@/components/product/BookCard";

export default function SummerCollectionPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [toast, setToast] = useState(false);
  const [summerBooks, setSummerBooks] = useState<Book[]>([]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchBooks().then((data) => setSummerBooks(data.slice(0, 8)));
  }, []);

  const sorted = [...summerBooks].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  function handleAddToCart(e: React.MouseEvent, book: Book) {
    e.preventDefault();
    addItem({ id: book.slug, title: book.title, author: book.author, price: book.price, image: book.image });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 flex items-center gap-2 py-2">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <i className="fa-solid fa-chevron-right text-[8px]" />
        <span className="text-primary font-medium">Bộ Sưu Tập Mùa Hè</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-linear-to-r from-orange-100 via-amber-50 to-orange-100 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-sm border border-orange-200">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <i className="fa-solid fa-sun absolute top-10 left-10 text-6xl text-orange-400 animate-spin-slow" />
          <i className="fa-solid fa-umbrella-beach absolute bottom-10 right-20 text-5xl text-orange-500" />
          <i className="fa-solid fa-plane-departure absolute top-20 right-1/4 text-4xl text-amber-600" />
        </div>
        <div className="relative z-10">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
            Collection 2026
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-4">Trạm Dừng Mùa Hè Rực Rỡ</h1>
          <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Những tựa sách tràn đầy năng lượng, sẵn sàng đồng hành cùng bạn trong những chuyến xê dịch đầy nắng và gió. Khám phá ngay để nhận ưu đãi lên đến 20%!
          </p>
        </div>
      </div>

      {/* Filters / Sort */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <p className="font-medium text-primary text-sm">
          Hiển thị <span className="font-bold text-accent">{sorted.length}</span> tựa sách tuyển chọn
        </p>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">Sắp xếp:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-accent font-medium text-primary bg-gray-50">
            <option value="default">Nổi bật nhất</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {sorted.map((book) => (
          <BookCard
            key={book.slug}
            book={book}
            badge="Mùa Hè"
            badgeClass="bg-orange-500"
            onAddToCart={(e) => handleAddToCart(e, book)}
            className="rounded-2xl p-4 border-gray-100"
          />
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <i className="fa-solid fa-check-circle text-accent" /> Đã thêm vào giỏ hàng!
        </div>
      )}
    </main>
  );
}
