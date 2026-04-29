"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidLink, setIsValidLink] = useState(false);

  useEffect(() => {
    // Supabase tự xử lý URL hash (#type=recovery) và bắn event PASSWORD_RECOVERY
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsValidLink(true);
    });

    // Trường hợp user F5 lại trang — session đã có sẵn
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setIsValidLink(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    setIsLoading(true);
    try {
      await authApi.resetPassword(password);
      router.push("/auth/reset-success");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đặt lại mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 max-md:p-6">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF2DF] flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-2xl text-primary"></i>
          </div>
        </div>
        <h2 className="font-heading text-3xl text-primary font-bold mb-2 text-center">Đặt Lại Mật Khẩu</h2>
        <p className="text-secondary text-sm text-center mb-8 leading-relaxed">
          Tạo mật khẩu mới an toàn cho tài khoản của bạn. Mật khẩu phải có ít nhất 8 ký tự.
        </p>

        {!isValidLink && (
          <div className="bg-red-50 border border-red-100 text-danger text-sm px-4 py-3 rounded-lg mb-5 text-center">
            Liên kết không hợp lệ hoặc đã hết hạn.{" "}
            <Link href="/auth/forgot-password" className="font-semibold underline">Yêu cầu lại</Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Mật khẩu mới <span className="text-danger">*</span></label>
            <div className="relative">
              <input required type={showPwd1 ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự" minLength={8}
                className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm pr-12 transition-colors" />
              <button type="button" onClick={() => setShowPwd1(!showPwd1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <i className={`fa-regular ${showPwd1 ? "fa-eye-slash" : "fa-eye"} text-base`}></i>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Xác nhận mật khẩu mới <span className="text-danger">*</span></label>
            <div className="relative">
              <input required type={showPwd2 ? "text" : "password"} value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Nhập lại mật khẩu mới" minLength={8}
                className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm pr-12 transition-colors" />
              <button type="button" onClick={() => setShowPwd2(!showPwd2)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <i className={`fa-regular ${showPwd2 ? "fa-eye-slash" : "fa-eye"} text-base`}></i>
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading || !isValidLink}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors text-base shadow-md mt-1 disabled:opacity-70 flex justify-center items-center gap-2">
            {isLoading ? <><i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...</> : "Cập nhật mật khẩu"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/auth/login" className="text-sm text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <i className="fa-solid fa-chevron-left text-xs"></i> Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}
