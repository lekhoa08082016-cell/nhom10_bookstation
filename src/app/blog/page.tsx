"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ARTICLES_POOL = [
  // ... (giữ nguyên danh sách ARTICLES_POOL của bạn)
  { id: 1, source: "VNEXPRESS", title: "Sức hút của những cuốn sách 'chữa lành' đối với giới trẻ", desc: "Giữa nhịp sống hối hả, sách chữa lành mang đến sự bình yên, giúp người trẻ tìm lại sự cân bằng trong tâm hồn.", url: "https://vnexpress.net/giai-tri/sach", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" },
  { id: 2, source: "TUỔI TRẺ", title: "Nghệ thuật đóng sách thủ công: Khi sách là tác phẩm nghệ thuật độc bản", desc: "Không chỉ để đọc, sách ngày nay còn được thiết kế bìa, đóng gáy thủ công (custom book) để làm quà tặng mang đậm dấu ấn cá nhân.", url: "https://tuoitre.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop" },
  { id: 3, source: "THANH NIÊN", title: "Văn học kinh điển vẫn giữ vị thế độc tôn trên thị trường xuất bản", desc: "Dù có nhiều thể loại mới ra đời, các tác phẩm kinh điển vẫn luôn nằm trong danh sách tái bản và bán chạy hàng năm.", url: "https://thanhnien.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop" },
  { id: 4, source: "ZINGNEWS", title: "Sự trỗi dậy của xu hướng Custom Sách (Cá nhân hóa sách) tại Việt Nam", desc: "Giới trẻ ngày càng ưa chuộng dịch vụ làm mới bìa sách cũ, khắc tên, in lời nhắn để tặng nhau trong các dịp đặc biệt.", url: "https://znews.vn/xuat-ban.html", img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop" },
  { id: 5, source: "DÂN TRÍ", title: "Tác giả trẻ Việt Nam vươn tầm quốc tế với tiểu thuyết giả tưởng", desc: "Nhiều tác phẩm của các cây bút trẻ trong nước đã được mua bản quyền dịch ra nhiều ngôn ngữ trên thế giới.", url: "https://dantri.com.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop" },
  { id: 6, source: "VNEXPRESS", title: "Thị trường sách in phục hồi mạnh mẽ sau kỷ nguyên số", desc: "Báo cáo mới nhất từ Hiệp hội Xuất bản cho thấy doanh số sách in đang tăng trưởng ở mức hai con số.", url: "https://vnexpress.net/giai-tri/sach", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop" },
  { id: 7, source: "TUỔI TRẺ", title: "Hội sách Xuyên Việt thu hút hàng trăm ngàn độc giả", desc: "Sự kiện văn hóa đọc lớn nhất năm đã mang đến hàng triệu đầu sách giảm giá cùng nhiều hoạt động giao lưu tác giả.", url: "https://tuoitre.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop" },
  { id: 8, source: "BÁO TỔ QUỐC", title: "Đọc sách để phát triển tư duy phản biện trong kỷ nguyên AI", desc: "Các chuyên gia giáo dục nhấn mạnh tầm quan trọng của việc đọc sách sâu để rèn luyện trí não, điều mà AI không thể thay thế.", url: "https://toquoc.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop" },
  { id: 9, source: "VTV NEWS", title: "Sách cũ được săn lùng: Thú vui của những người hoài cổ", desc: "Những bản in cũ, sách hiếm đang được định giá rất cao. Nhiều người săn tìm không chỉ để đọc mà còn để sưu tầm.", url: "https://vtv.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1507738978512-35798112892c?q=80&w=600&auto=format&fit=crop" },
  { id: 10, source: "THANH NIÊN", title: "Ra mắt bản dịch mới của các kiệt tác văn học kinh điển", desc: "Nhiều tác phẩm nổi tiếng thế giới vừa được chuyển ngữ lại với phong cách hiện đại, dễ tiếp cận hơn với độc giả Gen Z.", url: "https://thanhnien.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?q=80&w=600&auto=format&fit=crop" },
  { id: 11, source: "VNEXPRESS", title: "Hành trình mang sách đến những trẻ em vùng cao", desc: "Dự án quyên góp sách và xây dựng thư viện cho trẻ em nghèo đang nhận được sự hưởng ứng lớn từ cộng đồng.", url: "https://vnexpress.net/giai-tri/sach", img: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop" },
  { id: 12, source: "TUỔI TRẺ", title: "Xu hướng BookTok làm thay đổi cách chọn sách", desc: "Các nhà sáng tạo nội dung về sách trên nền tảng video ngắn đang có sức ảnh hưởng lớn đến quyết định mua sách của giới trẻ.", url: "https://tuoitre.vn/van-hoa/sach.htm", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop" }
];

export default function BlogPage() {
  const [articles, setArticles] = useState<typeof ARTICLES_POOL>([]);

  useEffect(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const shuffled = [...ARTICLES_POOL].sort((a, b) => {
      const pseudoRandomA = (a.id * seed) % 100;
      const pseudoRandomB = (b.id * seed) % 100;
      return pseudoRandomA - pseudoRandomB;
    });

    setArticles(shuffled.slice(0, 6));
  }, []);

  const getDisplayDate = (index: number) => {
    if (index === 0 || index === 1) return "Hôm nay";
    if (index === 2) return "Hôm qua";
    return `${index + 1} ngày trước`;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header Section: Tối ưu font size và padding cho mobile */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4 px-2">
          Điểm Tin Văn Học
        </h1>
        <p className="text-secondary text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Cập nhật tin tức văn học, xu hướng xuất bản và các sự kiện sách nóng hổi mỗi ngày từ các trang báo điện tử chính thống.
        </p>
      </div>

      {/* Grid Articles: Tự động chuyển đổi cột dựa trên kích thước màn hình */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((a, index) => (
          <article 
            key={a.id}
            className="group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Hình ảnh: Chiều cao nhỏ hơn trên mobile để tiết kiệm diện tích */}
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="block relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <Image
                src={a.img} 
                alt={a.title} 
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span className="bg-black/60 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-lg uppercase tracking-tight">
                  THEO {a.source}
                </span>
              </div>
            </a>

            {/* Nội dung tin tức */}
            <div className="p-5 md:p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3 md:mb-4 text-secondary/60">
                <i className="fa-regular fa-clock text-[10px] md:text-xs" />
                <span className="text-[11px] md:text-[13px] font-medium">Cập nhật: {getDisplayDate(index)}</span>
              </div>
              
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <h2 className="font-heading font-bold text-lg md:text-2xl text-primary mb-3 md:mb-4 leading-tight line-clamp-2 min-h-0 md:min-h-[4rem]">
                  {a.title}
                </h2>
              </a>

              <p className="text-[13px] md:text-[15px] text-secondary/80 leading-relaxed mb-6 md:mb-8 line-clamp-3 flex-grow">
                {a.desc}
              </p>

              <div className="mt-auto">
                <a 
                  href={a.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[13px] md:text-[15px] font-bold text-accent hover:text-primary transition-colors flex items-center gap-2"
                >
                  Xem chi tiết
                  <i className="fa-solid fa-chevron-right text-[9px] md:text-[10px] group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}