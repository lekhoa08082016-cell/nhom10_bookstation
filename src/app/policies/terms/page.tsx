export default function TermsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Điều Khoản Sử Dụng</h1>
        <div className="h-px bg-accent/50 mb-6" />
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
          Chào mừng bạn đến với BookStation. Khi sử dụng website và dịch vụ của chúng tôi, bạn đồng ý với các điều khoản dưới đây:
        </p>
        <div className="space-y-8 text-gray-600">
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">1. Trách nhiệm của người dùng</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Bạn cam kết cung cấp thông tin chính xác khi đặt hàng. Không sử dụng website cho các mục đích lừa đảo, phá hoại hoặc phát tán nội dung độc hại.
            </p>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">2. Quyền sở hữu trí tuệ</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Toàn bộ nội dung trên website (bao gồm logo, hình ảnh thiết kế custom, bài viết blog) đều thuộc bản quyền của BookStation. Các đầu sách thuộc bản quyền của tác giả và nhà xuất bản tương ứng.
            </p>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">3. Giới hạn dịch vụ Custom</h2>
            <p className="text-base md:text-lg leading-relaxed">
              BookStation có quyền từ chối in ấn lên bìa các nội dung có tính chất phản cảm, vi phạm pháp luật, thuần phong mỹ tục hoặc vi phạm quyền sở hữu trí tuệ của bên thứ ba. Lịch custom có giới hạn 5 đơn/tháng và xử lý theo nguyên tắc ai đặt trước làm trước.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
