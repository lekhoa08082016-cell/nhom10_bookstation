export default function HowToBuyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-[#fafafa] border border-accent rounded-3xl p-10">
        <div className="mb-8">
          <h1 className="font-heading text-5xl font-bold text-primary mb-4">Hướng Dẫn Mua Hàng</h1>
          <div className="h-0.5 bg-accent w-full" />
        </div>

        <div className="text-xl text-primary leading-relaxed space-y-6">
          <div>
            <p className="font-bold text-2xl text-primary mb-3">1. MUA SÁCH CÓ SẴN</p>
            <p><span className="font-semibold">B1:</span> Chọn tác phẩm và thêm vào giỏ hàng.</p>
            <p><span className="font-semibold">B2:</span> Nhập thông tin giao hàng và chọn phương thức thanh toán (Chuyển khoản/COD).</p>
            <p><span className="font-semibold">B3:</span> Xác nhận đặt hàng và chờ nhận sách.</p>
          </div>

          <div className="h-px bg-accent/30" />

          <div>
            <p className="font-bold text-2xl text-primary mb-3">2. DỊCH VỤ CUSTOM SÁCH</p>
            <p className="mb-4">Bạn có thể lựa chọn 1 trong 2 hình thức sau:</p>

            <p className="font-semibold text-lg mb-2">A. Mua sách từ BookStation &amp; Custom</p>
            <p><span className="font-semibold">B1:</span> Chọn mẫu sách có sẵn tại tiệm và nhắn tin qua Zalo/Chat để yêu cầu Custom (Bìa, in tên, đóng sáp...).</p>
            <p><span className="font-semibold">B2:</span> Nhận và duyệt bản vẽ Demo thiết kế trong 24h.</p>
            <p><span className="font-semibold">B3:</span> Thanh toán và chờ BookStation gia công (2-3 ngày).</p>

            <p className="font-semibold text-lg mt-4 mb-2">B. Gửi sách cá nhân của bạn để Custom</p>
            <p><span className="font-semibold">B1:</span> Nhắn tin cho tiệm để nhận tư vấn về quy cách và gửi ảnh tình trạng sách hiện tại của bạn.</p>
            <p><span className="font-semibold">B2:</span> Gửi sách về địa chỉ của BookStation (theo hướng dẫn của tư vấn viên).</p>
            <p><span className="font-semibold">B3:</span> Sau khi tiệm nhận sách, bạn duyệt mẫu thiết kế và thanh toán phí dịch vụ để tiệm bắt đầu gia công.</p>
          </div>

          <div className="h-px bg-accent/30" />

          <div>
            <p className="font-bold text-2xl text-primary mb-3">3. GIAO NHẬN &amp; HỖ TRỢ</p>
            <p><span className="font-semibold">Thời gian:</span> 1-2 ngày (Nội thành), 3-5 ngày (Ngoại thành).</p>
            <p><span className="font-semibold">Lưu ý:</span> Sách Custom cần thêm thời gian gia công thủ công từ 2-4 ngày.</p>
            <p><span className="font-semibold">Hotline:</span> 1900 6666</p>
            <p className="mt-4 italic text-secondary">Cảm ơn bạn đã chọn BookStation để lưu giữ những giá trị riêng!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
