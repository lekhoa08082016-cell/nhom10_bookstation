"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function WishlistPage() {
  const router  = useRouter();
  const user    = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);
  const { items: wishlist, remove } = useWishlistStore();
  const [toast, setToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !user) router.push("/auth/login");
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  function handleAddToCart(book: (typeof wishlist)[0]) {
    addItem({ id: book.slug, title: book.title, author: book.author, price: book.price, image: book.image });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl text-primary font-bold mb-6">Sách Yêu Thích</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSidebar />

        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-6 pb-4 border-b border-gray-100">
              Sách Yêu Thích Của Tôi
            </h2>

            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-regular fa-heart text-3xl text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium text-lg">Chưa có sách yêu thích</p>
                <p className="text-gray-400 text-sm mt-2">
                  Nhấn vào biểu tượng trái tim trên trang sách để lưu yêu thích
                </p>
                <Link
                  href="/products"
                  className="inline-block mt-6 bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-secondary transition-colors text-sm"
                >
                  Khám phá cửa hàng
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {wishlist.map((book) => (
                  <div key={book.slug} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-linear-to-br from-lightBg to-accent overflow-hidden">
                      {book.image ? (
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fa-solid fa-book text-primary text-3xl" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-primary text-sm leading-tight mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-secondary text-xs mb-2">{book.author}</p>
                      <p className="text-danger font-bold">{formatPrice(book.price)}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAddToCart(book)}
                          className="flex-1 bg-primary text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-secondary transition-colors"
                        >
                          Thêm giỏ
                        </button>
                        <Link
                          href={`/products/${book.slug}`}
                          className="flex-1 border border-primary text-primary py-1.5 rounded-lg text-xs font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                        >
                          Xem
                        </Link>
                        <button
                          onClick={() => remove(book.slug)}
                          className="w-8 h-8 border border-danger text-danger rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors shrink-0"
                        >
                          <i className="fa-solid fa-trash text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <i className="fa-solid fa-check-circle text-accent" /> Đã thêm vào giỏ hàng!
        </div>
      )}
    </main>
  );
}
