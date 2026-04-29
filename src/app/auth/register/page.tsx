"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

function validatePassword(pwd: string): string | null {
  if (pwd.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
  if (!/[A-Z]/.test(pwd)) return "Mật khẩu phải chứa ít nhất một chữ hoa.";
  if (!/[a-z]/.test(pwd)) return "Mật khẩu phải chứa ít nhất một chữ thường.";
  if (!/[0-9]/.test(pwd)) return "Mật khẩu phải chứa ít nhất một chữ số.";
  return null;
}

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", password2: "" });
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function field(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    const pwdError = validatePassword(form.password);
    if (pwdError) { setError(pwdError); return; }

    if (form.password !== form.password2) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!agreed) {
      setError("Vui lòng đồng ý với điều khoản sử dụng.");
      return;
    }

    setIsLoading(true);
    try {
      const { token, user } = await authApi.register({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        password: form.password,
      });
      login(user, token);
      router.push("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Đăng ký thất bại. Vui lòng thử lại.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        <div className="flex-1 p-8 md:p-10 max-md:p-6">
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-2">Đăng Ký</h2>
          <p className="text-secondary text-base mb-8">Tạo tài khoản để bắt đầu mua sắm</p>

          {error && <p className="text-danger text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Họ và tên <span className="text-danger">*</span></label>
                <input type="text" value={form.name} onChange={field("name")} placeholder="Nguyễn Văn A"
                  className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Số điện thoại</label>
                <input type="tel" value={form.phone} onChange={field("phone")} placeholder="0912 345 678"
                  className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email <span className="text-danger">*</span></label>
              <input type="email" value={form.email} onChange={field("email")} placeholder="example@email.com"
                className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Mật khẩu <span className="text-danger">*</span></label>
              <div className="relative">
                <input type={showPwd1 ? "text" : "password"} value={form.password} onChange={field("password")}
                  placeholder="Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số"
                  className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm pr-12 transition-colors" />
                <button type="button" onClick={() => setShowPwd1((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                  <i className={`fa-regular ${showPwd1 ? "fa-eye-slash" : "fa-eye"} text-base`} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Xác nhận mật khẩu <span className="text-danger">*</span></label>
              <div className="relative">
                <input type={showPwd2 ? "text" : "password"} value={form.password2} onChange={field("password2")}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm pr-12 transition-colors" />
                <button type="button" onClick={() => setShowPwd2((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                  <i className={`fa-regular ${showPwd2 ? "fa-eye-slash" : "fa-eye"} text-base`} />
                </button>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-primary cursor-pointer" />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Tôi đồng ý với{" "}
                <Link href="/policies/terms" className="text-accent hover:underline">Điều khoản sử dụng</Link>
                {" "}và{" "}
                <Link href="/policies/privacy" className="text-accent hover:underline">Chính sách bảo mật</Link>
              </label>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors text-base shadow-md disabled:opacity-70 flex justify-center items-center gap-2">
              {isLoading ? <><i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...</> : "Tạo tài khoản"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-primary font-bold hover:text-accent transition-colors ml-1">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
