"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { fetchHotBooks } from "@/lib/supabaseBooks";
import type { Book } from "@/lib/booksData";
import BookCard from "@/components/product/BookCard";

export default function BackToSchoolPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetchHotBooks(6).then((data) => { setBooks(data); setLoading(false); });
  }, []);

  function handleAddToCart(e: React.MouseEvent, book: Book) {
    e.preventDefault();
    addItem({ id: book.slug, title: book.title, author: book.author, price: book.price, image: book.image });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function addAllCombo() {
    books.forEach((b) => {
      addItem({ id: b.slug, title: b.title, author: b.author, price: b.price, image: b.image });
    });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  const totalOriginal = books.reduce((sum, b) => sum + (b.originalPrice ?? b.price), 0);
  const comboPrice    = Math.round(books.reduce((sum, b) => sum + b.price, 0) * 0.85);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-heading font-bold text-primary text-5xl md:text-[70px] leading-[1.1]">
          Combo Back To School
        </h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-primary" />
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.slug}
              book={book}
              onAddToCart={(e) => handleAddToCart(e, book)}
              className="border-primary border"
            />
          ))}
        </div>
      )}

      {/* Combo CTA */}
      {!loading && books.length > 0 && (
        <div className="mt-12 bg-white border border-accent rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">
              Mua Trọn Combo ({books.length} cuốn)
            </h2>
            <p className="text-secondary">Tiết kiệm hơn khi mua trọn bộ Combo Back To School</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-gray-400 line-through text-lg">
                {totalOriginal.toLocaleString("vi-VN")} đ
              </span>
              <span className="text-danger font-bold text-3xl">
                {comboPrice.toLocaleString("vi-VN")} đ
              </span>
              <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">-15%</span>
            </div>
          </div>
          <button
            onClick={addAllCombo}
            className="bg-primary text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-secondary transition-colors whitespace-nowrap"
          >
            <i className="fa-solid fa-cart-shopping mr-2" /> Thêm trọn combo
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <i className="fa-solid fa-check-circle text-accent" /> Đã thêm vào giỏ hàng!
        </div>
      )}
    </main>
  );
}
