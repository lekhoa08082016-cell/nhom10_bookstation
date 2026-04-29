"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Book } from "@/lib/booksData";
import { searchBooksRemote } from "@/lib/supabaseBooks";

function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(q);
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchTerm(q);
    setLoading(true);
    searchBooksRemote(q).then((data) => { setResults(data); setLoading(false); });
  }, [q]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push(`/products`);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 max-w-2xl mx-auto text-center">
        <h1 className="font-heading text-3xl text-primary font-bold mb-4">
          {q ? `Kết quả tìm kiếm cho "${q}"` : "Tìm kiếm sản phẩm"}
        </h1>
        <form onSubmit={handleSearch} className="relative flex items-center mb-3 shadow-sm rounded-xl">
          <i className="fa-solid fa-magnifying-glass absolute left-5 text-gray-400 text-lg" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên sách, tác giả bạn muốn tìm..."
            className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-accent text-sm transition-colors"
          />
          <button type="submit" className="absolute right-2 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition-colors text-sm">
            Tìm kiếm
          </button>
        </form>
        {!loading && (
          <p className="text-secondary text-sm font-medium">{results.length} kết quả được tìm thấy</p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-24">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-primary" />
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-magnifying-glass text-3xl text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium text-lg">Không tìm thấy sách phù hợp</p>
          <p className="text-gray-400 text-sm mt-2">Thử tìm kiếm với từ khóa khác</p>
          <Link href="/products" className="inline-block mt-6 bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-secondary transition-colors text-sm">
            Xem tất cả sách
          </Link>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((book) => (
            <Link key={book.slug} href={`/products/${book.slug}`}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="overflow-hidden rounded-lg mb-3 aspect-3/4">
                {book.image ? (
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                    <i className="fa-solid fa-book text-4xl" />
                  </div>
                )}
              </div>
              <h3 className="font-heading font-bold text-primary text-base line-clamp-2 mb-1">{book.title}</h3>
              <p className="text-sm text-secondary mb-2">{book.author}</p>
              <p className="text-danger font-extrabold">{formatPrice(book.price)}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
