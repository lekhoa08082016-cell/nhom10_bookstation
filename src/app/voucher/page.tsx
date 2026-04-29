"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

const VOUCHERS = [
  {
    code: "CUSTOM10",
    discount: "Giảm 10%",
    type: "Dịch vụ Custom",
    description: "Cho dịch vụ Custom sách",
    expiry: "31/12/2026",
    gradient: "from-[#FDF5E6] to-[#D3A376]",
    href: "/custom-book",
    actionLabel: "Dùng ngay",
    isPrimary: true,
  },
  {
    code: "BOOK10",
    discount: "Giảm 10.000đ",
    type: "Giảm tiền",
    description: "Giảm 10.000đ cho đơn từ 100.000đ",
    expiry: "30/06/2026",
    gradient: "from-lightBg to-accent/30",
    href: "/cart",
    actionLabel: "Sao chép",
    isPrimary: false,
  },
  {
    code: "SACH20",
    discount: "Giảm 20.000đ",
    type: "Giảm tiền",
    description: "Giảm 20.000đ cho đơn từ 200.000đ",
    expiry: "30/06/2026",
    gradient: "from-[#f0fff4] to-[#8C6E63]/30",
    href: "/cart",
    actionLabel: "Sao chép",
    isPrimary: false,
  },
  {
    code: "NHOM10",
    discount: "Giảm 15.000đ",
    type: "Giảm tiền",
    description: "Giảm 15.000đ khi mua 3 cuốn sách trở lên",
    expiry: "31/12/2026",
    gradient: "from-[#fff0f0] to-[#D3A376]/30",
    href: "/cart",
    actionLabel: "Sao chép",
    isPrimary: false,
  },
  {
    code: "FREESHIP30",
    discount: "Giảm 30.000đ",
    type: "Freeship",
    description: "Miễn phí vận chuyển, giảm 30.000đ",
    expiry: "30/06/2026",
    gradient: "from-[#e8f4fd] to-[#8C6E63]/30",
    href: "/cart",
    actionLabel: "Sao chép",
    isPrimary: false,
  },
];

export default function VoucherPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  if (!user) return null;

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
  };

  const [defaultVoucher, ...others] = VOUCHERS;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl text-primary font-bold mb-6">Kho Voucher</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSidebar />

        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-6 pb-4 border-b border-gray-100">
              Kho Voucher tích lũy
            </h2>

            {/* Featured voucher */}
            <div className="border border-accent rounded-2xl overflow-hidden shadow-sm mb-4">
              <div className={`bg-linear-to-r ${defaultVoucher.gradient} p-5`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary bg-white/60 px-2 py-0.5 rounded-full">
                    {defaultVoucher.type}
                  </span>
                  <span className="text-xs text-secondary">HSD: {defaultVoucher.expiry}</span>
                </div>
                <p className="font-bold text-primary text-2xl tracking-widest">{defaultVoucher.code}</p>
                <p className="text-danger font-bold text-lg">{defaultVoucher.discount}</p>
              </div>
              <div className="bg-white px-5 py-3 flex items-center justify-between">
                <p className="text-sm text-secondary">{defaultVoucher.description}</p>
                <Link
                  href={defaultVoucher.href}
                  className="text-xs text-white font-semibold bg-primary px-4 py-1.5 rounded-lg hover:bg-secondary transition-colors whitespace-nowrap ml-3"
                >
                  Dùng ngay
                </Link>
              </div>
            </div>

            {/* Grid of other vouchers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {others.map((v) => (
                <div key={v.code} className="border border-accent rounded-2xl overflow-hidden shadow-sm">
                  <div className={`bg-linear-to-r ${v.gradient} p-5`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary bg-white/60 px-2 py-0.5 rounded-full">
                        {v.type}
                      </span>
                      <span className="text-xs text-secondary">HSD: {v.expiry}</span>
                    </div>
                    <p className="font-bold text-primary text-2xl tracking-widest">{v.code}</p>
                    <p className="text-danger font-bold text-lg">{v.discount}</p>
                  </div>
                  <div className="bg-white px-5 py-3 flex items-center justify-between">
                    <p className="text-sm text-secondary">{v.description}</p>
                    <button
                      onClick={() => copyVoucher(v.code)}
                      className="text-xs text-primary font-semibold border border-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors whitespace-nowrap ml-3"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
