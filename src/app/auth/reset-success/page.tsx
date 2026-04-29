import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <i className="fa-solid fa-circle-check text-4xl text-green-500"></i>
          </div>
        </div>
        <h2 className="font-heading text-3xl text-primary font-bold mb-3">Đổi Mật Khẩu<br/>Thành Công!</h2>
        <p className="text-secondary text-sm mb-8 leading-relaxed max-w-xs mx-auto">Mật khẩu của bạn đã được cập nhật thành công. Vui lòng đăng nhập lại bằng mật khẩu mới.</p>
        <Link href="/auth/login" className="block w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors text-base shadow-md">
          Đăng nhập ngay
        </Link>
        <Link href="/" className="block mt-4 text-sm text-secondary hover:text-primary transition-colors">
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}