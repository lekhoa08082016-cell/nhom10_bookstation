export interface Book {
  slug: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  publisher: string;
  provider: string;
  coverType: string;
  rating: number;
  reviews: number;
  sold: number;
  hot: boolean;
  description: string;
  googleBookId?: string;
  category?: string;
  language?: string;
  previewText?: string;
}

export const BOOKS_DATA: Book[] = [
  {
    slug: "ong-gia-va-bien-ca", title: "Ông Già và Biển Cả", author: "Ernest Hemingway", price: 76000, originalPrice: 102000, discount: 25,
    image: "/images/sachOnggiavabienca.png", publisher: "NXB Văn Học", provider: "AZ Việt Nam",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Ông già và Biển cả là một kiệt tác bất hủ về ý chí quật cường của con người. Santiago là một ông lão đánh cá, tính đến nay ông đã tám mươi tư ngày liên tiếp trở về tay không dù ngày nào ông cũng dong thuyền ra khơi. Tác phẩm đoạt giải Nobel Văn học 1954.",
    googleBookId: "y10pEAAAQBAJ",
  },
  {
    slug: "dac-nhan-tam", title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: 85000, originalPrice: 100000, discount: 15,
    image: "/images/sachDacNhanTam.png", publisher: "NXB Tổng Hợp", provider: "BookStation",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Đắc Nhân Tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã giúp hàng triệu người trên thế giới thay đổi cuộc đời và xây dựng những mối quan hệ tốt đẹp hơn.",
  },
  {
    slug: "co-hoc-luong-tu", title: "Cơ Học Lượng Tử & Thuyết Tương Đối", author: "Phạm Xuân Yến", price: 129000,
    image: "/images/sachCohocluongtuvaThuyettuongdoi.png", publisher: "NXB Khoa học Kỹ thuật", provider: "AZ Việt Nam",
    coverType: "Bìa cứng", rating: 5, reviews: 0, sold: 0, hot: false,
    description: "Khám phá vũ trụ từ những hạt nhỏ nhất đến những thiên hà xa nhất. Cuốn sách phổ biến khoa học dành cho mọi độc giả.",
  },
  {
    slug: "cac-trieu-dai-viet-nam", title: "Các Triều Đại Việt Nam", author: "Quỳnh Cư, Đỗ Đức Hùng", price: 117000,
    image: "/images/sachCactrieudaiVietNam.png", publisher: "NXB Thanh Niên", provider: "BookStation",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Tổng hợp đầy đủ và súc tích về các triều đại Việt Nam từ thời Hùng Vương đến Triều Nguyễn. Giúp người đọc dễ dàng nắm bắt dòng chảy lịch sử dân tộc.",
  },
  {
    slug: "mua-do", title: "Mưa Đỏ", author: "Chu Lai", price: 185000, originalPrice: 220000, discount: 16,
    image: "/images/sachMuaDo.png", publisher: "NXB Công an Nhân dân", provider: "AZ Việt Nam",
    coverType: "Bìa cứng", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Tiểu thuyết chiến tranh xuất sắc của nhà văn Chu Lai. Qua lăng kính người lính, cuốn sách khắc họa chân thực và xúc động về cuộc chiến bảo vệ tổ quốc.",
  },
  {
    slug: "canh-dong-bat-tan", title: "Cánh Đồng Bất Tận", author: "Nguyễn Ngọc Tư", price: 85000,
    image: "/images/sachCanhdongbattan.png", publisher: "NXB Trẻ", provider: "BookStation",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Tập truyện ngắn đặc sắc của nhà văn Nguyễn Ngọc Tư — giọng văn mộc mạc mà ẩn chứa sức nặng về thân phận con người đồng bằng sông Cửu Long.",
  },
  {
    slug: "tet-o-lang-dia-nguc", title: "Tết Ở Làng Địa Ngục", author: "Thảo Trang", price: 155000,
    image: "/images/sachTetolangdianguc.png", publisher: "NXB Dân Trí", provider: "AZ Việt Nam",
    coverType: "Bìa mềm", rating: 4.5, reviews: 0, sold: 0, hot: false,
    description: "Tiểu thuyết trinh thám kinh dị lấy bối cảnh vùng nông thôn Việt Nam ngày Tết. Phóng viên Nghĩa về một ngôi làng bí ẩn để điều tra vụ mất tích hàng loạt.",
  },
  {
    slug: "to-thich-cau", title: "Tớ Thích Cậu Hơn Cả Harvard", author: "Lan Rùa", price: 118000,
    image: "/images/sachTothichcauhoncaHarvard.png", publisher: "NXB Thế Giới", provider: "BookStation",
    coverType: "Bìa mềm", rating: 4.8, reviews: 0, sold: 0, hot: false,
    description: "Cuốn sách về tình bạn và những lựa chọn trong cuộc đời. Đôi khi, người quan trọng nhất với ta là người hiểu ta nhất, yêu thương ta vô điều kiện nhất.",
  },
  {
    slug: "toi-la-beto", title: "Tôi Là BêTô", author: "Nguyễn Nhật Ánh", price: 85000,
    image: "/images/sachToilaBeTo.png", publisher: "NXB Trẻ", provider: "BookStation",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Truyện dài của nhà văn Nguyễn Nhật Ánh kể về Bê Tô — chú chó con đáng yêu được kể chuyện qua góc nhìn của chính nó.",
  },
  {
    slug: "sapiens", title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", price: 250000, originalPrice: 310000, discount: 19,
    image: "/images/sachSapiens.png", publisher: "NXB Tri Thức", provider: "AZ Việt Nam",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Cuốn sách bán chạy toàn cầu của Yuval Noah Harari. Từ thời kỳ đồ đá đến thời đại AI — hành trình loài người được kể lại một cách hấp dẫn và sâu sắc.",
    googleBookId: "15lEDwAAQBAJ",
  },
  {
    slug: "atomic-habits", title: "Atomic Habits", author: "James Clear", price: 130000, originalPrice: 150000, discount: 13,
    image: "/images/sachAtomicHabits.png", publisher: "NXB Lao Động", provider: "BookStation",
    coverType: "Bìa mềm", rating: 5, reviews: 0, sold: 0, hot: true,
    description: "Cuốn sách hướng dẫn xây dựng thói quen tốt và loại bỏ thói quen xấu thông qua những thay đổi nhỏ nhưng có sức mạnh lớn.",
  },
  {
    slug: "mien-hanh-phuc", title: "Miền Hạnh Phúc", author: "Nguyễn Nhật Ánh", price: 95000,
    image: "/images/sachMienHanhPhuc.png", publisher: "NXB Trẻ", provider: "BookStation",
    coverType: "Bìa mềm", rating: 4.9, reviews: 0, sold: 0, hot: false,
    description: "Tác phẩm mới nhất của Nguyễn Nhật Ánh, một chuyến phiêu lưu kỳ diệu về tuổi thơ và những giấc mơ ngọt ngào.",
  },
];
