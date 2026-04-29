"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/booksData";
import { fetchBookBySlug, fetchRelatedBooks } from "@/lib/supabaseBooks";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import BookCard from "@/components/product/BookCard";

export default function BookDetailsClient({ slug }: { slug: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBookBySlug(slug).then((b) => {
      setBook(b);
      if (b) fetchRelatedBooks(b.slug, 4).then(setRelatedBooks);
      setPageLoading(false);
    });
  }, [slug]);

  const addItem = useCartStore((s) => s.addItem);
  const wishlistItems  = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const [qty, setQty] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);
  const [toast, setToast] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-primary"></i>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-heading text-2xl text-primary font-bold mb-4">Không tìm thấy sách</h2>
        <Link href="/products" className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-secondary transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  function handleQtyChange(delta: number) {
    setQty((prev) => Math.max(1, prev + delta));
  }

  function handleAddToCart() {
    addItem({ id: book!.slug, title: book!.title, author: book!.author, price: book!.price, image: book!.image, qty: qty });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function buyNow() {
    addItem({ id: book!.slug, title: book!.title, author: book!.author, price: book!.price, image: book!.image, qty: qty });
    router.push("/cart");
  }

  function handleCustomBook() {
    sessionStorage.setItem("customSelectedBook", JSON.stringify({
      slug: book!.slug,
      title: book!.title,
      author: book!.author,
      price: book!.price,
      image: book!.image,
    }));
    router.push("/custom-book");
  }

  return (
    <main className="max-w-6xl mx-auto px-4 pb-12 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 flex items-center gap-2 py-3">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <i className="fa-solid fa-chevron-right text-[8px]" />
        <Link href="/products" className="hover:text-primary transition-colors">Cửa hàng</Link>
        <i className="fa-solid fa-chevron-right text-[8px]" />
        <span className="text-primary font-medium">{book.title}</span>
      </nav>

      {/* Main product section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-7">
        <div className="flex flex-col md:flex-row gap-7">
          {/* Left: Book cover */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-52 h-72 rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-gray-100">
                {book.image ? (
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-solid fa-book-open text-5xl text-gray-300"></i>
                )}
              </div>
              {book.discount && (
                <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  -{book.discount}%
                </span>
              )}
              {book.hot && (
                <span className="absolute -bottom-2 -left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  Bán chạy
                </span>
              )}
            </div>
            <Link href={`/products/${book.slug}/docthu`} className="flex items-center gap-2 border-2 border-primary text-primary text-sm font-semibold px-5 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors w-full justify-center">
              <i className="fa-solid fa-book-open-reader"></i> Đọc thử
            </Link>
          </div>

          {/* Right: Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <h1 className="font-heading text-2xl md:text-3xl text-primary font-bold leading-snug">{book.title}</h1>
            </div>

            <div className="flex items-center gap-3 mb-3 text-sm flex-wrap">
              <span className="text-yellow-400 font-bold">★★★★★</span>
              <span className="text-gray-500">({book.reviews} đánh giá)</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Đã bán <span className="font-semibold text-primary">{book.sold}</span></span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-extrabold text-danger">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">{formatPrice(book.originalPrice)}</span>
                  <span className="text-xs font-bold bg-danger/10 text-danger px-2 py-0.5 rounded-full">-{book.discount}%</span>
                </>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-gray-500">Tác giả:</div><div className="font-medium text-primary">{book.author}</div>
              <div className="text-gray-500">Nhà XB:</div><div className="font-medium text-primary">{book.publisher}</div>
              <div className="text-gray-500">Nhà CC:</div><div className="font-medium text-primary">{book.provider}</div>
              <div className="text-gray-500">Hình thức bìa:</div><div className="font-medium text-primary">{book.coverType}</div>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium text-gray-600">Số lượng:</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => handleQtyChange(-1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors text-primary font-bold text-lg">−</button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => handleQtyChange(1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors text-primary font-bold text-lg">+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button onClick={handleAddToCart} className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
              </button>
              <button onClick={buyNow} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
                <i className="fa-solid fa-bolt"></i> Mua ngay
              </button>
              {(() => {
                const wishlisted = wishlistItems.some((i) => i.slug === book.slug);
                return (
                  <button
                    onClick={() => {
                      setHeartPop(true);
                      setTimeout(() => setHeartPop(false), 400);
                      toggleWishlist({ slug: book.slug, title: book.title, author: book.author, price: book.price, image: book.image });
                    }}
                    className={`w-full sm:w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all shrink-0
                      ${wishlisted ? "border-red-400 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500"}
                      ${heartPop ? "animate-heartpop" : ""}`}
                    title={wishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                  >
                    <i className={`fa-heart text-lg ${wishlisted ? "fa-solid" : "fa-regular"}`} />
                  </button>
                );
              })()}
            </div>

            <div className="bg-lightBg border border-accent/40 rounded-xl p-4">
              <p className="font-semibold text-primary text-sm mb-1"><i className="fa-solid fa-paint-brush text-accent mr-1.5"></i> Custom sách</p>
              <p className="text-xs text-secondary leading-relaxed mb-2">Biến cuốn sách này thành món quà độc bản: Thay đổi thiết kế bìa, in lời nhắn riêng, tặng kèm hộp quà.</p>
              <button onClick={handleCustomBook} className="text-sm font-semibold text-primary hover:text-accent transition-colors inline-block">Trải nghiệm Custom ngay ›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-heading text-xl text-primary font-bold mb-4">Mô tả sản phẩm</h2>
        <div className={`text-sm text-gray-700 leading-relaxed ${!descExpanded ? 'line-clamp-5' : ''}`}>
          {book.description}
        </div>
        <button onClick={() => setDescExpanded(!descExpanded)} className="mt-3 text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1">
          {descExpanded ? 'Thu gọn' : 'Xem thêm'} <i className={`fa-solid fa-chevron-down text-xs transition-transform ${descExpanded ? 'rotate-180' : ''}`}></i>
        </button>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-heading text-xl text-primary font-bold mb-5">Đánh giá từ khách hàng</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center bg-lightBg rounded-xl p-6 min-w-[120px]">
            <p className="text-5xl font-extrabold text-primary">{book.rating}</p>
            <p className="text-yellow-400 text-xl mt-1">★★★★★</p>
            <p className="text-xs text-secondary mt-1">({book.reviews} nhận xét)</p>
          </div>
        </div>
      </div>

      {/* You may also like */}
      {relatedBooks.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h2 className="font-heading text-xl text-primary font-bold">Có thể bạn sẽ thích</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBooks.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 animate-[fade-in-up_0.3s_ease-out]">
          <i className="fa-solid fa-check-circle text-accent" /> Đã thêm vào giỏ hàng!
        </div>
      )}
    </main>
  );
}
