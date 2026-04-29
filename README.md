# Đồ án môn học: Website Thương mại điện tử BookStation

## 1. Thông tin nhóm
**Nhóm 10**

| STT | Họ và tên | MSSV | Vai trò |
|---|---|---|---|
| 1 | Phạm Trần Vân Khánh | 24126100 | Frontend Developer |
| 2 | Lê Thị Châu Khoa | 24126101 | Frontend Developer |
| 3 | Lê Diệu Ngân | 24126143 | Frontend Developer |
| 4 | Phan Thị Kim Ngân | 24126147 | Frontend Developer |

## 2. Mô tả dự án
- **Chủ đề:** Xây dựng website bán sách có tính năng custom sách.
- **Thương hiệu:** BookStation — "Mỗi quyển sách, một trạm dừng"
- **Tính năng nổi bật:**
  - Xem, tìm kiếm sách theo tên và tác giả
  - Trang chi tiết sách + đọc thử trích đoạn
  - Giỏ hàng, đặt hàng, thanh toán (MoMo, chuyển khoản ngân hàng)
  - Đăng nhập / Đăng ký / Quên mật khẩu (Supabase Auth)
  - Theo dõi đơn hàng, quản lý lịch sử mua
  - **Dịch vụ Custom Sách:** cá nhân hóa bìa, đóng gáy thủ công làm quà tặng độc bản
  - Wishlist, Voucher, Điểm tin văn học (Blog)
  - Giao diện Dark Mode, Responsive mobile

## 3. Liên kết dự án
- **Link Figma (View-only):** https://www.figma.com/design/qa5eWzdO2gZLOyVpIMNucZ/BookStation?node-id=1390-16425&t=WlNNlOI96ODJMl5f-1
- **Link GitHub Pages:** https://lekhoa08082016-cell.github.io/nhom10_bookstation/

## 4. Hướng dẫn chạy dự án ở Local

**Yêu cầu:** Node.js phiên bản 18 trở lên

**Bước 1:** Clone dự án về máy:
```bash
git clone https://github.com/lekhoa08082016-cell/nhom10_bookstation.git
cd nhom10_bookstation
```

**Bước 2:** Cài đặt các thư viện:
```bash
npm install
```

**Bước 3:** Tạo file `.env.local` ở thư mục gốc với nội dung:
```
NEXT_PUBLIC_SUPABASE_URL=https://uiivfeeqvoalwzppgjol.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpaXZmZWVxdm9hbHd6cHBnam9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNTMzNzEsImV4cCI6MjA5MjkyOTM3MX0.tEqopjszivzhk0melcTGOrL4CrDxInBTms5sC0H1iqA
```

**Bước 4:** Khởi chạy server:
```bash
npm run dev
```

Mở trình duyệt tại **http://localhost:3000**

## 5. Ảnh chụp màn hình giao diện

**Trang chủ**

![Trang chủ](screenshots/trang-chu.png)

**Trang danh sách sách**

![Danh sách sách](screenshots/cua-hang-sach.png)

**Trang Custom Sách**

![Custom Sách](screenshots/custom-sach.png)
