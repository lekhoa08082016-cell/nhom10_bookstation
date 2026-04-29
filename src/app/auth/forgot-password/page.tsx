"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gửi yêu cầu thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 max-md:p-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <i className="fa-solid fa-envelope-circle-check text-2xl text-green-500"></i>
            </div>
          </div>
          <h2 className="font-heading text-2xl text-primary font-bold mb-3">Kiểm tra hộp thư!</h2>
          <p className="text-secondary text-sm leading-relaxed mb-2">
            Chúng tôi đã gửi link đặt lại mật khẩu đến
          </p>
          <p className="font-semibold text-primary text-sm mb-6">{email}</p>
          <p className="text-secondary text-xs leading-relaxed mb-8">
            Không thấy email? Kiểm tra thư mục Spam hoặc thử lại với địa chỉ email khác.
          </p>
          <button onClick={() => { setSent(false); setEmail(""); }}
            className="w-full border border-gray-200 text-primary font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm mb-3">
            Thử email khác
          </button>
          <Link href="/auth/login" className="text-sm text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <i className="fa-solid fa-chevron-left text-xs"></i> Quay lại đăng nhập
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 max-md:p-6">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF2DF] flex items-center justify-center">
            <i className="fa-solid fa-lock text-2xl text-primary"></i>
          </div>
        </div>
        <h2 className="font-heading text-3xl text-primary font-bold mb-2 text-center">Quên Mật Khẩu</h2>
        <p className="text-secondary text-sm text-center mb-8 leading-relaxed">
          Nhập email đăng ký của bạn. Chúng tôi sẽ gửi link đặt lại mật khẩu về hộp thư của bạn.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Email <span className="text-danger">*</span></label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors" />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors text-base shadow-md disabled:opacity-70 flex justify-center items-center gap-2">
            {isLoading ? <><i className="fa-solid fa-spinner fa-spin"></i> Đang gửi...</> : "Gửi mã xác nhận"}
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
