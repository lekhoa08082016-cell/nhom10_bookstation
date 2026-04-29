"use client";

import { useState } from "react";
import Link from "next/link";
import type { Book } from "@/lib/booksData";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

interface Props {
  book: Book;
  badge?: string;
  badgeClass?: string;
  onAddToCart?: (e: React.MouseEvent) => void;
  className?: string;
}

export default function BookCard({
  book,
  badge,
  badgeClass = "bg-orange-500",
  onAddToCart,
  className = "",
}: Props) {
  const items      = useWishlistStore((s) => s.items);
  const toggle     = useWishlistStore((s) => s.toggle);
  const wishlisted = items.some((i) => i.slug === book.slug);
  const [pop, setPop] = useState(false);

  function handleHeart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPop(true);
    setTimeout(() => setPop(false), 400);
    toggle({
      slug:   book.slug,
      title:  book.title,
      author: book.author,
      price:  book.price,
      image:  book.image,
    });
  }

  return (
    <Link
      href={`/products/${book.slug}`}
      className={`bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all group flex flex-col border border-gray-50 ${className}`}
    >
      {/* Image */}
      <div className="aspect-3/4 overflow-hidden rounded-lg mb-3 bg-gray-50 relative shrink-0">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fa-solid fa-book text-4xl text-gray-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
          {book.discount && (
            <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              -{book.discount}%
            </span>
          )}
          {book.hot && !book.discount && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Hot
            </span>
          )}
          {badge && (
            <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${badgeClass}`}>
              {badge}
            </span>
          )}
        </div>

        {/* Heart button */}
        <button
          onClick={handleHeart}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center
            transition-all duration-200
            ${wishlisted ? "opacity-100" : "opacity-50 lg:opacity-0 lg:group-hover:opacity-100"}
            ${pop ? "animate-heartpop" : ""}`}
          title={wishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <i
            className={`fa-heart text-xs transition-colors ${
              wishlisted ? "fa-solid text-red-500" : "fa-regular text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-primary line-clamp-2 mb-1 group-hover:text-accent transition-colors leading-snug text-sm md:text-base">
          {book.title}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 mb-1">{book.author}</p>
        <div className="flex items-center gap-0.5 mb-2 mt-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`fa-star text-[10px] ${
                i < book.rating ? "fa-solid text-yellow-400" : "fa-regular text-gray-300"
              }`}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({book.reviews})</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-danger text-sm md:text-base">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="w-8 h-8 rounded-full bg-lightBg text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors shrink-0"
              title="Thêm vào giỏ"
            >
              <i className="fa-solid fa-cart-plus text-sm" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
