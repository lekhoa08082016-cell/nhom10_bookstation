export default function PrivacyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Chính Sách Bảo Mật</h1>
        <div className="h-px bg-accent/50 mb-6" />
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
          Sự riêng tư của bạn là vô cùng quan trọng với chúng tôi. Chính sách này giải thích cách BookStation thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
        </p>
        <div className="space-y-8 text-gray-600">
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">1. Thu thập thông tin</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Khi bạn tạo tài khoản, đặt hàng hoặc sử dụng dịch vụ Custom, chúng tôi thu thập các thông tin: Họ tên, Số điện thoại, Địa chỉ email, Địa chỉ giao hàng và đường dẫn Mạng xã hội (để liên hệ thiết kế).
            </p>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">2. Sử dụng thông tin</h2>
            <p className="text-base md:text-lg leading-relaxed mb-2">Thông tin của bạn chỉ được sử dụng để:</p>
            <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-1">
              <li>Xử lý và giao đơn hàng.</li>
              <li>Liên lạc để trao đổi thiết kế (Dịch vụ Custom).</li>
              <li>Hỗ trợ khách hàng và giải quyết khiếu nại.</li>
              <li>Gửi email thông báo về sách mới hoặc khuyến mãi (chỉ khi bạn đăng ký nhận).</li>
            </ul>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">3. Cam kết bảo mật</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Chúng tôi cam kết KHÔNG bán, chia sẻ hoặc trao đổi thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào khác nhằm mục đích thương mại.
            </p>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">4. Quyền của bạn</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân bất kỳ lúc nào bằng cách liên hệ qua email <strong>bookstation@gmail.com</strong> hoặc hotline <strong>1900 6666</strong>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
