"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, user } = await authApi.login(email, password);
      login(user, token);
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectUrl);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

        <div className="flex-1 p-8 md:p-10 max-md:p-6">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-2">Đăng Nhập</h2>
          <p className="text-secondary text-base mb-8">Mỗi quyển sách, một trạm dừng</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email hoặc số điện thoại</label>
              <input required type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"
                     className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-primary">Mật khẩu</label>
                <Link href="/auth/forgot-password" className="text-sm text-accent hover:text-secondary transition-colors">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <input required type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                       className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm pr-12 transition-colors" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                  <i className={`fa-regular ${showPwd ? "fa-eye-slash" : "fa-eye"} text-base`}></i>
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors text-base shadow-md mt-2 disabled:opacity-70 flex justify-center items-center gap-2">
              {isLoading ? <><i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...</> : "Đăng nhập"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Bạn chưa có tài khoản?
            <Link href="/auth/register" className="text-primary font-bold hover:text-accent transition-colors ml-1">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
