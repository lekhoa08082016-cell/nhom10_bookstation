export default function PaymentPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="bg-white border border-[#D3A3764D] rounded-2xl shadow-sm p-8 md:p-10 max-md:p-5">
        <h2 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Phương Thức Thanh Toán</h2>
        <div className="h-px bg-[#D3A37680] mb-6" />
        <p className="text-[#666666] text-lg md:text-xl leading-relaxed mb-8">
          BookStation cung cấp nhiều phương thức thanh toán linh hoạt và an toàn nhằm mang lại trải nghiệm mua sắm tốt nhất cho khách hàng.
        </p>
        <div className="space-y-8">
          <article>
            <h3 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">1. Thanh toán tiền mặt khi nhận hàng (COD)</h3>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed">
              Khách hàng thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng ngay khi nhận được sách. Phương thức này áp dụng cho đơn hàng sách thông thường trên toàn quốc.
            </p>
          </article>
          <article>
            <h3 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">2. Thanh toán chuyển khoản (Bắt buộc với đơn Custom)</h3>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed">
              Khách hàng chuyển khoản vào tài khoản ngân hàng của BookStation. Vui lòng ghi rõ nội dung chuyển khoản theo cú pháp hướng dẫn lúc đặt hàng.
            </p>
            <p className="text-primary text-base md:text-lg leading-relaxed font-medium mt-2">
              Ngân hàng: Vietcombank - CN Thủ Đức<br />
              Số tài khoản: 10xxxxxxxx<br />
              Chủ tài khoản: BOOKSTATION VN
            </p>
          </article>
          <article>
            <h3 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">3. Thanh toán qua ví điện tử</h3>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed">
              Chúng tôi hiện đang hỗ trợ thanh toán thông qua ví điện tử MoMo, ZaloPay và VNPay. Chức năng sẽ tự động chuyển hướng sang ứng dụng khi bạn lựa chọn tại bước thanh toán.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
