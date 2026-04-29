"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { assetPath } from "@/lib/assetPath";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { items } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const cartQty = mounted ? items.reduce((acc, item) => acc + item.qty, 0) : 0;

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Cửa hàng" },
    { href: "/custom-book", label: "Custom Sách" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Về BookStation" },
  ];

  const supportLinks = [
    { href: "/policies/payment", label: "Phương thức thanh toán" },
    { href: "/policies/shipping", label: "Phương thức vận chuyển" },
    { href: "/policies/privacy", label: "Chính sách bảo mật" },
    { href: "/policies/return", label: "Chính sách đổi trả" },
    { href: "/policies/terms", label: "Điều khoản sử dụng" },
  ];

  return (
    <>
      {/* Top bar – desktop only */}
      <div className="hidden lg:flex bg-primary text-white text-sm px-6 py-2 justify-between items-center">
        <div>Hotline: 1900 6666 | Email: bookstation@gmail.com</div>
      </div>

      <header className="bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img src={assetPath("/images/logo.png")} className="h-10 md:h-9 max-md:h-8" alt="Logo" />
            <h1 className="font-heading text-2xl text-primary font-bold max-lg:text-xl">BookStation</h1>
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden lg:block w-112.5 xl:w-137.5">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm tựa sách, tác giả, nhà xuất bản..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[1.5px] border-accent rounded-full px-5 py-2 w-full focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 w-7.5 h-7.5 bg-primary rounded-full flex items-center justify-center"
            >
              <i className="fa-solid fa-magnifying-glass text-white text-xs" />
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-xl text-primary max-lg:gap-4">
          {mounted && isAuthenticated ? (
            <Link
              href="/profile"
              className="flex flex-col items-center cursor-pointer hover:text-accent transition-colors"
            >
              <i className="fa-regular fa-user text-lg" />
              <span className="text-[10px] font-medium uppercase mt-1 max-lg:hidden">
                {user?.name?.split(" ").pop() || "Tài khoản"}
              </span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex flex-col items-center cursor-pointer hover:text-accent transition-colors"
            >
              <i className="fa-regular fa-user text-lg" />
              <span className="text-[10px] font-medium uppercase mt-1 max-lg:hidden">Tài khoản</span>
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="flex flex-col items-center hover:text-accent transition-colors"
            title={theme === "dark" ? "Chuyển sang sáng" : "Chuyển sang tối"}
          >
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"} text-lg`} />
            <span className="text-[10px] font-medium uppercase mt-1 max-lg:hidden">
              {theme === "dark" ? "Sáng" : "Tối"}
            </span>
          </button>

          <Link
            href="/cart"
            className="flex flex-col items-center cursor-pointer hover:text-accent relative transition-colors"
          >
            <i className="fa-solid fa-cart-shopping text-lg" />
            <span className="text-[10px] font-medium uppercase mt-1 max-lg:hidden">Giỏ hàng</span>
            {cartQty > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartQty}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl text-primary focus:outline-none"
          >
            <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>

        {/* Mobile search */}
        <div className="w-full mt-4 lg:hidden">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm tựa sách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[1.5px] border-accent rounded-full px-5 py-2 w-full focus:outline-none text-sm"
            />
            <button type="submit" className="absolute right-4 text-accent">
              <i className="fa-solid fa-magnifying-glass text-lg" />
            </button>
          </form>
        </div>

        {/* Mobile menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-[#F9F5F0] border-t shadow-xl z-40 lg:hidden`}
        >
          <div className="m-6 p-6 bg-white rounded-2xl border border-gray-100">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-gray-200 py-4">
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-xl font-medium ${pathname === link.href ? "text-primary font-bold" : "text-gray-700"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-gray-200 py-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full text-xl font-medium text-gray-700"
                >
                  <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"} text-lg`} />
                  <span>{theme === "dark" ? "Chế độ sáng" : "Chế độ tối"}</span>
                </button>
              </li>
              <li className="border-b border-gray-200 py-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                >
                  <span className="text-xl font-medium text-gray-700">Hỗ trợ khách hàng</span>
                  <i
                    className={`fa-solid fa-chevron-down text-sm text-gray-400 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                  />
                </div>
                <ul className={`${isSubmenuOpen ? "block" : "hidden"} pl-6 mt-4 space-y-4`}>
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-lg text-gray-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Desktop nav */}
      <nav className="bg-white px-6 py-3 border-t flex justify-center gap-8 items-center max-lg:hidden sticky top-14 z-40 shadow-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-medium border-b-2 pb-1 transition-all cursor-pointer ${
              pathname === link.href
                ? "text-primary font-bold border-primary"
                : "text-gray-500 hover:text-primary border-transparent"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="relative">
          <button
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            className="text-gray-500 font-medium hover:text-primary cursor-pointer border-b-2 border-transparent pb-1 flex items-center gap-1 transition-all"
          >
            <span>Hỗ trợ khách hàng</span>
            <i
              className={`fa-solid fa-chevron-down text-[10px] translate-y-px transition-transform ${isSupportOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isSupportOpen && (
            <ul className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl py-3 min-w-67.5 z-50">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsSupportOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
