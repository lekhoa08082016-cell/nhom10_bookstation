export default function ShippingPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="bg-white border border-[#D9D9D9] rounded-2xl shadow-sm p-8 md:p-10 max-md:p-5">
        <h2 className="font-heading text-primary text-3xl md:text-4xl font-bold mb-4">Phương Thức Vận Chuyển</h2>
        <div className="h-[1px] bg-[#D3A37680] mb-6"></div>
        <p className="text-[#666666] text-lg md:text-xl leading-relaxed mb-8">BookStation hợp tác với các đơn vị vận chuyển uy tín (Giao Hàng Tiết Kiệm, Viettel Post, J&T Express) để giao sách đến tận tay bạn trong thời gian sớm nhất.</p>
        <article className="mb-8">
          <h3 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">1. Thời gian giao hàng</h3>
          <p className="text-base md:text-lg leading-relaxed text-[#666666]">Nội thành TP.HCM: Giao hàng trong vòng 1-2 ngày làm việc.<br/>Các tỉnh thành khác: Giao hàng từ 3-5 ngày làm việc tùy vào khu vực.<br/>Sách Custom: Vui lòng tính thêm 3-5 ngày gia công thiết kế trước khi sách được bàn giao cho đơn vị vận chuyển.</p>
        </article>
        <article>
          <h3 className="font-heading text-primary text-2xl md:text-3xl font-bold mb-2">2. Phí vận chuyển</h3>
          <p className="text-base md:text-lg leading-relaxed text-[#666666] mb-4">Phí vận chuyển sẽ được tự động tính toán dựa trên khối lượng sách và địa chỉ nhận hàng của quý khách.</p>
          <div className="bg-[#FFF2DF99] border border-accent rounded-2xl p-4 md:p-5 flex items-center gap-4"><i className="fa-solid fa-gift text-primary text-2xl"></i><p className="text-primary font-semibold text-sm md:text-lg">Đặc biệt: Miễn phí vận chuyển (Freeship) cho mọi đơn hàng có tổng giá trị từ 250.000đ trở lên.</p></div>
        </article>
      </section>
    </main>
  );
}