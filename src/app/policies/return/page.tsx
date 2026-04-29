export default function ReturnPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
        <h1 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Chính sách đổi trả</h1>
        <div className="h-px bg-accent/50 mb-6" />
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
          BookStation luôn mong muốn mang đến cho bạn những cuốn sách chất lượng nhất. Nếu có bất kỳ sự cố nào, chúng tôi áp dụng chính sách đổi trả như sau:
        </p>
        <div className="space-y-8 text-gray-600">
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">1. Điều kiện áp dụng</h2>
            <p className="text-base md:text-lg leading-relaxed mb-2">Yêu cầu đổi trả được chấp nhận trong vòng 7 ngày kể từ ngày nhận hàng với các trường hợp:</p>
            <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-1">
              <li>Sách bị lỗi do nhà xuất bản (thiếu trang, in ngược, lem mực,...).</li>
              <li>Sách bị hư hỏng nặng trong quá trình vận chuyển (ướt, rách nát).</li>
              <li>Giao sai đầu sách so với đơn đặt hàng.</li>
            </ul>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">2. Quy định với Sách Custom</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Vì tính chất cá nhân hóa độc bản, Sách Custom không được hỗ trợ đổi trả trừ khi lỗi in ấn trên bìa/lời nhắn xuất phát từ phía BookStation (sai sót so với thiết kế đã chốt với khách).
            </p>
          </article>
          <article>
            <h2 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">3. Quy trình thực hiện</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Vui lòng chụp ảnh/quay video tình trạng sách và liên hệ với chúng tôi qua Zalo hoặc Hotline <strong>1900 6666</strong> để được nhân viên hướng dẫn tạo mã trả hàng miễn phí.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
