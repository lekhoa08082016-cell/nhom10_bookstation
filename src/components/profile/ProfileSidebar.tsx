"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const NAV_ITEMS = [
  { href: "/profile", icon: "fa-regular fa-user", label: "Hồ sơ cá nhân" },
  { href: "/orders", icon: "fa-solid fa-box", label: "Quản lý đơn hàng" },
  { href: "/voucher", icon: "fa-solid fa-ticket", label: "Kho voucher" },
  { href: "/wishlist", icon: "fa-regular fa-heart", label: "Sách yêu thích" },
  { href: "/reviews", icon: "fa-regular fa-star", label: "Đánh giá của tôi" },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const name = user?.name || "Người dùng";
  const initial = name.trim() ? name.trim()[0].toUpperCase() : "N";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-br from-primary to-secondary p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
            {initial}
          </div>
          <p className="font-bold text-white text-lg">{name}</p>
          <span className="text-xs text-white/70 bg-white/20 px-3 py-1 rounded-full mt-1 inline-block">
            Thành viên bạc
          </span>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "bg-lightBg text-primary font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <i
                      className={`${item.icon} w-5 text-center ${
                        isActive ? "text-accent" : "text-secondary"
                      }`}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="border-t border-gray-100 pt-2 mt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-red-50 text-sm transition-colors font-light w-full text-left"
              >
                <i className="fa-solid fa-right-from-bracket w-5 text-center" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
