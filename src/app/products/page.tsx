"use client";

import { useState, useEffect, useMemo } from "react";
import type { Book } from "@/lib/booksData";
import { fetchBooks } from "@/lib/supabaseBooks";
import BookCard from "@/components/product/BookCard";

const THE_LOAI = [
  "Sách Giáo dục – Gia đình",
  "Sách Kinh Tế – Kĩ Năng",
  "Sách Khoa học – Triết học",
  "Sách Nghệ thuật sống – Tâm lý",
  "Sách Lịch sử",
  "Sách Tâm linh – Tôn giáo",
  "Sách Thiếu nhi",
  "Sách Văn Học Việt Nam",
  "Sách Văn hóa – Nghệ thuật",
  "Sách Văn học nước ngoài",
  "Sách Y học – Thực dưỡng",
];
const NGON_NGU = ["Tiếng Việt", "Tiếng Anh", "Song ngữ"];

const PAGE_SIZE = 9;

export default function ProductsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages]   = useState<string[]>([]);
  const [onlyHot, setOnlyHot]                       = useState(false);
  const [onlyDiscount, setOnlyDiscount]             = useState(false);

  // ── Accordion open state ─────────────────────────────────────────────────
  const [open, setOpen] = useState({ theLoai: true, ngonNgu: true, khac: true });
  const toggle = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));

  useEffect(() => {
    fetchBooks().then(data => { setBooks(data); setLoading(false); });
  }, []);

  // ── Reset về trang 1 khi filter/sort thay đổi ───────────────────────────
  useEffect(() => { setPage(1); }, [selectedCategories, selectedLanguages, onlyHot, onlyDiscount, sortBy]);

  // ── Derived: filtered + sorted ───────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = books;
    if (selectedCategories.length > 0)
      result = result.filter(b => selectedCategories.includes(b.category ?? ""));
    if (selectedLanguages.length > 0)
      result = result.filter(b => selectedLanguages.includes(b.language ?? "Tiếng Việt"));
    if (onlyHot)      result = result.filter(b => b.hot);
    if (onlyDiscount) result = result.filter(b => !!b.discount);
    return [...result].sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "hot")        return (b.hot ? 1 : 0) - (a.hot ? 1 : 0);
      return 0;
    });
  }, [books, selectedCategories, selectedLanguages, onlyHot, onlyDiscount, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount =
    selectedCategories.length + selectedLanguages.length + (onlyHot ? 1 : 0) + (onlyDiscount ? 1 : 0);

  function toggleItem<T>(list: T[], setList: (v: T[]) => void, item: T) {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  }

  function clearAll() {
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setOnlyHot(false);
    setOnlyDiscount(false);
  }

  function goToPage(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full lg:w-72 mb-6">
        <h1 className="text-xl md:text-2xl font-extrabold text-primary uppercase tracking-widest pb-2 border-b-4 border-primary inline-block">
          Tất cả danh mục
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start">

        {/* ── Sidebar ───────────────────────────────────────────────────── */}
        <aside className="w-full lg:w-72 shrink-0">

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <button onClick={clearAll}
              className="w-full mb-3 flex items-center justify-between bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors">
              <span>{activeFilterCount} bộ lọc đang bật</span>
              <span>Xóa tất cả ✕</span>
            </button>
          )}

          {/* Thể loại */}
          <div className="mb-3 border border-gray-100 rounded-lg overflow-hidden lg:border-none">
            <div onClick={() => toggle("theLoai")}
              className="bg-[#8C6E63]/75 text-white px-4 py-2.5 flex justify-between items-center cursor-pointer select-none">
              <span className="font-bold text-sm tracking-wide">Thể loại</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${open.theLoai ? "" : "-rotate-90"}`} />
            </div>
            {open.theLoai && (
              <div className="bg-white border border-gray-200 px-4 py-2 lg:border-t-0">
                {THE_LOAI.map(cat => (
                  <label key={cat} className="flex items-center gap-2 py-1.5 text-xs cursor-pointer hover:text-primary transition-colors"
                    style={{ color: selectedCategories.includes(cat) ? "var(--color-primary)" : undefined }}>
                    <input type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat)}
                      className="w-4 h-4 shrink-0 accent-primary" />
                    <span className={selectedCategories.includes(cat) ? "font-semibold" : ""}>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Ngôn ngữ */}
          <div className="mb-3 border border-gray-100 rounded-lg overflow-hidden lg:border-none">
            <div onClick={() => toggle("ngonNgu")}
              className="bg-[#8C6E63]/75 text-white px-4 py-2.5 flex justify-between items-center cursor-pointer select-none">
              <span className="font-bold text-sm tracking-wide">Ngôn ngữ</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${open.ngonNgu ? "" : "-rotate-90"}`} />
            </div>
            {open.ngonNgu && (
              <div className="bg-white border border-gray-200 px-4 py-2 lg:border-t-0">
                {NGON_NGU.map(lang => (
                  <label key={lang} className="flex items-center gap-2 py-1.5 text-xs cursor-pointer hover:text-primary transition-colors"
                    style={{ color: selectedLanguages.includes(lang) ? "var(--color-primary)" : undefined }}>
                    <input type="checkbox"
                      checked={selectedLanguages.includes(lang)}
                      onChange={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                      className="w-4 h-4 shrink-0 accent-primary" />
                    <span className={selectedLanguages.includes(lang) ? "font-semibold" : ""}>{lang}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Khác */}
          <div className="mb-3 border border-gray-100 rounded-lg overflow-hidden lg:border-none">
            <div onClick={() => toggle("khac")}
              className="bg-[#8C6E63]/75 text-white px-4 py-2.5 flex justify-between items-center cursor-pointer select-none">
              <span className="font-bold text-sm tracking-wide">Lọc thêm</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${open.khac ? "" : "-rotate-90"}`} />
            </div>
            {open.khac && (
              <div className="bg-white border border-gray-200 px-4 py-2 lg:border-t-0">
                <label className="flex items-center gap-2 py-1.5 text-xs cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" checked={onlyHot} onChange={e => setOnlyHot(e.target.checked)}
                    className="w-4 h-4 shrink-0 accent-primary" />
                  <span className={onlyHot ? "font-semibold text-primary" : ""}>
                    <i className="fa-solid fa-fire text-danger mr-1" />Sách nổi bật
                  </span>
                </label>
                <label className="flex items-center gap-2 py-1.5 text-xs cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" checked={onlyDiscount} onChange={e => setOnlyDiscount(e.target.checked)}
                    className="w-4 h-4 shrink-0 accent-primary" />
                  <span className={onlyDiscount ? "font-semibold text-primary" : ""}>
                    <i className="fa-solid fa-tag text-danger mr-1" />Đang giảm giá
                  </span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="flex-1 w-full">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <p className="text-sm text-secondary">
              {loading ? "Đang tải..." : (
                <><span className="font-bold text-primary">{filtered.length}</span> sản phẩm
                {totalPages > 1 && <span className="ml-2 text-gray-400">(trang {page}/{totalPages})</span>}</>
              )}
            </p>
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary bg-white text-gray-700 appearance-none cursor-pointer">
                <option value="default">Mới nhất</option>
                <option value="hot">Nổi bật</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
              </select>
              <i className="fa-solid fa-chevron-down text-xs absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-primary"></i>
              <p className="text-sm text-secondary">Đang tải sách...</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <i className="fa-solid fa-book-open text-4xl text-gray-300"></i>
              <p className="font-semibold text-primary">Không tìm thấy sách phù hợp</p>
              <p className="text-sm text-secondary">Thử thay đổi bộ lọc hoặc</p>
              <button onClick={clearAll} className="text-accent text-sm font-semibold hover:underline">Xóa tất cả bộ lọc</button>
            </div>
          )}

          {/* Grid */}
          {!loading && paged.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {paged.map(book => (
                <BookCard key={book.slug} book={book} className="md:p-4" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-12 mb-8 flex-wrap">
              {/* Prev */}
              <button onClick={() => goToPage(page - 1)} disabled={page === 1}
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-semibold border bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <i className="fa-solid fa-chevron-left" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                const isFirst = p === 1;
                const isLast = p === totalPages;
                const nearCurrent = Math.abs(p - page) <= 1;
                if (!isFirst && !isLast && !nearCurrent) {
                  if (p === 2 || p === totalPages - 1) return <span key={p} className="px-1 text-gray-400 text-sm">…</span>;
                  return null;
                }
                return (
                  <button key={p} onClick={() => goToPage(p)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-semibold border transition-all ${p === page ? "bg-primary text-white border-primary shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>
                    {p}
                  </button>
                );
              })}

              {/* Next */}
              <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-semibold border bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
