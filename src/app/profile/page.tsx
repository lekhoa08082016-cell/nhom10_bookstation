"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [gender, setGender] = useState(user?.gender ?? "male");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, phone, gender },
      });
      if (error) throw error;
      updateUser({ name, phone, gender });
      toast.success("Đã lưu thay đổi!");
    } catch {
      toast.error("Lưu thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl text-primary font-bold mb-6">Hồ Sơ Cá Nhân</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSidebar />

        <div className="flex-1 space-y-6">
          {/* Thông Tin Chung */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-6 pb-4 border-b border-gray-100">
              Thông Tin Chung
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Họ và tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Số điện thoại</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none text-sm bg-gray-50 transition-colors"
                />
                <p className="text-xs text-secondary mt-1.5">Email không thể thay đổi</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Giới tính</label>
                <div className="flex gap-6">
                  {[
                    { value: "male", label: "Nam" },
                    { value: "female", label: "Nữ" },
                    { value: "other", label: "Khác" },
                  ].map((g) => (
                    <label key={g.value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input
                        type="radio"
                        name="gender"
                        value={g.value}
                        checked={gender === g.value}
                        onChange={() => setGender(g.value)}
                        className="accent-primary"
                      />
                      {g.label}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-secondary transition-colors text-sm shadow-md disabled:opacity-70 flex items-center gap-2"
              >
                {isSaving ? (
                  <><i className="fa-solid fa-spinner fa-spin" /> Đang lưu...</>
                ) : (
                  "Lưu thay đổi"
                )}
              </button>
            </form>
          </div>

          {/* Bảo Mật */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-6 pb-4 border-b border-gray-100">
              Bảo Mật
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-primary text-sm">Mật khẩu</p>
                <p className="text-xs text-secondary mt-0.5">
                  Cập nhật mật khẩu thường xuyên để bảo vệ tài khoản
                </p>
              </div>
              <Link href="/auth/reset-password">
                <button className="border-[1.5px] border-primary text-primary font-medium py-2 px-6 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm whitespace-nowrap">
                  Đổi mật khẩu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
