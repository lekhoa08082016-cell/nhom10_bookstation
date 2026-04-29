export default function TaiLieuKyThuatPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
      {/* TOC Sidebar */}
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Mục lục</p>
          <nav className="space-y-1 text-sm">
            <a href="#overview" className="block py-1 text-gray-600 hover:text-accent transition-colors font-medium">Tổng quan</a>
            <p className="text-xs font-semibold text-secondary mt-3 mb-1 uppercase tracking-wide">Phần I: Xác thực</p>
            <a href="#client-validation" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">1.1 Kiểm tra client</a>
            <a href="#server-validation" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">1.2 Kiểm tra server</a>
            <a href="#password-hashing" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">1.3 Mã hóa mật khẩu</a>
            <a href="#jwt" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">1.4 JWT Token</a>
            <a href="#auth-errors" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">1.5 Xử lý lỗi</a>
            <p className="text-xs font-semibold text-secondary mt-3 mb-1 uppercase tracking-wide">Phần II: Hồ sơ</p>
            <a href="#profile-fetch" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">2.1 Lấy thông tin</a>
            <a href="#profile-update" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">2.2 Cập nhật</a>
            <a href="#avatar-upload" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">2.3 Upload ảnh</a>
            <a href="#authorization" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">2.4 Phân quyền</a>
            <p className="text-xs font-semibold text-secondary mt-3 mb-1 uppercase tracking-wide">Phần III: Frontend</p>
            <a href="#frontend-storage" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">3.1 LocalStorage</a>
            <a href="#frontend-flow" className="block py-1 pl-3 text-gray-500 hover:text-accent transition-colors">3.2 Luồng trang</a>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 space-y-8 pb-16">
        {/* Page title */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <i className="fa-solid fa-file-code text-white text-xl" />
            </div>
            <div>
              <h1 className="font-heading text-3xl text-primary font-bold mb-1">Đặc tả kỹ thuật</h1>
              <p className="text-secondary">Hệ thống Đăng nhập / Đăng ký &amp; Quản lý Hồ sơ — BookStation</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">REST API</span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">JWT Auth</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">bcrypt</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Multipart Upload</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Phiên bản 1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section id="overview" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h2 className="font-heading text-2xl text-primary font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-accent text-lg" /> Tổng quan
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">Tài liệu này mô tả đặc tả kỹ thuật cho hai module chính của hệ thống BookStation:</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="font-semibold text-blue-800 mb-2"><i className="fa-solid fa-key mr-1.5" /> Module I: Xác thực (Auth)</p>
              <ul className="text-blue-700 space-y-1 text-xs">
                <li>• Kiểm tra dữ liệu đầu vào phía client và server</li>
                <li>• Mã hóa mật khẩu bằng bcrypt (salt rounds = 12)</li>
                <li>• Cấp phát và xác minh JWT Access Token + Refresh Token</li>
                <li>• Xử lý tất cả trường hợp lỗi có thể xảy ra</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="font-semibold text-green-800 mb-2"><i className="fa-solid fa-user-circle mr-1.5" /> Module II: Hồ sơ (Profile)</p>
              <ul className="text-green-700 space-y-1 text-xs">
                <li>• Lấy thông tin người dùng (GET /api/users/:id)</li>
                <li>• Cập nhật thông tin (PUT/PATCH /api/users/:id)</li>
                <li>• Upload ảnh đại diện (multipart/form-data)</li>
                <li>• Kiểm soát quyền truy cập theo JWT subject</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Part I Header */}
        <div className="bg-primary text-white rounded-2xl px-7 py-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">I</span>
          <h2 className="font-heading text-xl font-bold">Xác thực người dùng (Authentication)</h2>
        </div>

        {/* 1.1 Client Validation */}
        <section id="client-validation" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-1">1.1 Kiểm tra đầu vào phía Client</h3>
          <p className="text-xs text-secondary mb-5">Frontend Validation — thực thi trước khi gửi request</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Trường</th>
                  <th className="px-4 py-3 text-left">Bắt buộc</th>
                  <th className="px-4 py-3 text-left">Quy tắc</th>
                  <th className="px-4 py-3 text-left">Thông báo lỗi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">name</td><td className="px-4 py-3 text-green-600">✓</td><td className="px-4 py-3">2–60 ký tự, không chứa số hay ký tự đặc biệt</td><td className="px-4 py-3 text-red-500">Họ tên không hợp lệ</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">email</td><td className="px-4 py-3 text-green-600">✓</td><td className="px-4 py-3">Regex RFC 5322 cơ bản</td><td className="px-4 py-3 text-red-500">Email không đúng định dạng</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">phone</td><td className="px-4 py-3 text-yellow-600">—</td><td className="px-4 py-3">10 chữ số, bắt đầu bằng 0</td><td className="px-4 py-3 text-red-500">SĐT phải gồm 10 chữ số</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">password</td><td className="px-4 py-3 text-green-600">✓</td><td className="px-4 py-3">≥ 8 ký tự, có chữ hoa, chữ thường, chữ số</td><td className="px-4 py-3 text-red-500">Mật khẩu chưa đủ mạnh</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">confirmPassword</td><td className="px-4 py-3 text-green-600">✓</td><td className="px-4 py-3">Phải trùng với password</td><td className="px-4 py-3 text-red-500">Mật khẩu không khớp</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 1.2 Server Validation */}
        <section id="server-validation" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-1">1.2 Kiểm tra đầu vào phía Server</h3>
          <p className="text-xs text-secondary mb-5">Backend Validation — thực thi sau khi nhận request từ client</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">POST /api/auth/register</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Kiểm tra email đã tồn tại trong database</li>
                <li>• Validate schema với Joi / class-validator</li>
                <li>• Sanitize input để chống XSS</li>
                <li>• Rate limit: 5 request/phút/IP</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">POST /api/auth/login</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Tìm user theo email trong database</li>
                <li>• So sánh password với bcrypt.compare()</li>
                <li>• Trả về 401 nếu thông tin không đúng</li>
                <li>• Rate limit: 10 request/phút/IP</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1.3 Password Hashing */}
        <section id="password-hashing" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">1.3 Mã hóa mật khẩu (bcrypt)</h3>
          <div className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl p-5 text-xs leading-relaxed font-mono overflow-x-auto">
            <span className="text-[#6c7086] italic">{`// Đăng ký: hash mật khẩu trước khi lưu`}</span>{"\n"}
            <span className="text-[#cba6f7]">const</span> saltRounds = <span className="text-[#fab387]">12</span>;{"\n"}
            <span className="text-[#cba6f7]">const</span> hashedPassword = <span className="text-[#cba6f7]">await</span> bcrypt.<span className="text-[#89b4fa]">hash</span>(plainPassword, saltRounds);{"\n\n"}
            <span className="text-[#6c7086] italic">{`// Đăng nhập: so sánh mật khẩu nhập với hash`}</span>{"\n"}
            <span className="text-[#cba6f7]">const</span> isMatch = <span className="text-[#cba6f7]">await</span> bcrypt.<span className="text-[#89b4fa]">compare</span>(plainPassword, hashedPassword);
          </div>
        </section>

        {/* 1.4 JWT */}
        <section id="jwt" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">1.4 JWT Token</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">Access Token</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li><span className="font-mono text-gray-500">exp:</span> 15 phút</li>
                <li><span className="font-mono text-gray-500">payload:</span> userId, email, role</li>
                <li><span className="font-mono text-gray-500">algorithm:</span> HS256</li>
              </ul>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">Refresh Token</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li><span className="font-mono text-gray-500">exp:</span> 7 ngày</li>
                <li><span className="font-mono text-gray-500">lưu trữ:</span> HttpOnly Cookie</li>
                <li><span className="font-mono text-gray-500">endpoint:</span> POST /api/auth/refresh</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1.5 Auth Errors */}
        <section id="auth-errors" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">1.5 Xử lý lỗi xác thực</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">HTTP Status</th>
                  <th className="px-4 py-3 text-left">Error Code</th>
                  <th className="px-4 py-3 text-left">Mô tả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono text-orange-500">400</td><td className="px-4 py-3 font-mono">VALIDATION_ERROR</td><td className="px-4 py-3">Dữ liệu đầu vào không hợp lệ</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono text-red-500">401</td><td className="px-4 py-3 font-mono">INVALID_CREDENTIALS</td><td className="px-4 py-3">Email hoặc mật khẩu không đúng</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono text-red-500">401</td><td className="px-4 py-3 font-mono">TOKEN_EXPIRED</td><td className="px-4 py-3">Access Token đã hết hạn</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono text-orange-500">409</td><td className="px-4 py-3 font-mono">EMAIL_EXISTS</td><td className="px-4 py-3">Email đã được đăng ký</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono text-red-600">429</td><td className="px-4 py-3 font-mono">TOO_MANY_REQUESTS</td><td className="px-4 py-3">Quá nhiều request trong thời gian ngắn</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Part II Header */}
        <div className="bg-primary text-white rounded-2xl px-7 py-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">II</span>
          <h2 className="font-heading text-xl font-bold">Quản lý Hồ sơ người dùng (Profile)</h2>
        </div>

        {/* 2.1 Profile Fetch */}
        <section id="profile-fetch" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">2.1 Lấy thông tin người dùng</h3>
          <div className="bg-gray-50 rounded-xl p-4 text-xs font-mono mb-4">
            <span className="text-blue-600">GET</span> /api/users/<span className="text-orange-500">{":id"}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-primary text-xs uppercase mb-2">Request Headers</p>
              <div className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl p-4 text-xs font-mono">
                Authorization: Bearer <span className="text-[#a6e3a1]">{`<access_token>`}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-primary text-xs uppercase mb-2">Response 200</p>
              <div className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl p-4 text-xs font-mono">
                {`{ "id": "...", "name": "...",`}<br />
                {`  "email": "...", "phone": "...",`}<br />
                {`  "avatar": "url", "role": "user" }`}
              </div>
            </div>
          </div>
        </section>

        {/* 2.2 Profile Update */}
        <section id="profile-update" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">2.2 Cập nhật thông tin</h3>
          <div className="bg-gray-50 rounded-xl p-4 text-xs font-mono mb-4">
            <span className="text-yellow-600">PATCH</span> /api/users/<span className="text-orange-500">{":id"}</span>
          </div>
          <p className="text-sm text-gray-600">Cho phép cập nhật một phần: <code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">phone</code>, <code className="bg-gray-100 px-1 rounded">gender</code>. Email không được thay đổi. Yêu cầu JWT hợp lệ và userId phải khớp với subject trong token.</p>
        </section>

        {/* 2.3 Avatar Upload */}
        <section id="avatar-upload" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">2.3 Upload ảnh đại diện</h3>
          <div className="bg-gray-50 rounded-xl p-4 text-xs font-mono mb-4">
            <span className="text-green-600">POST</span> /api/users/<span className="text-orange-500">{":id"}</span>/avatar
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Content-Type: <code className="bg-gray-100 px-1 rounded">multipart/form-data</code></li>
            <li>• Field name: <code className="bg-gray-100 px-1 rounded">avatar</code></li>
            <li>• Định dạng cho phép: JPG, PNG, WebP</li>
            <li>• Kích thước tối đa: 5MB</li>
            <li>• Ảnh được lưu trên CDN, trả về URL mới</li>
          </ul>
        </section>

        {/* 2.4 Authorization */}
        <section id="authorization" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">2.4 Kiểm soát phân quyền</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Endpoint</th>
                  <th className="px-4 py-3 text-left">Quyền yêu cầu</th>
                  <th className="px-4 py-3 text-left">Điều kiện</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">GET /api/users/:id</td><td className="px-4 py-3">user, admin</td><td className="px-4 py-3">JWT hợp lệ</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">PATCH /api/users/:id</td><td className="px-4 py-3">owner, admin</td><td className="px-4 py-3">sub trong JWT phải bằng :id</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">POST /api/users/:id/avatar</td><td className="px-4 py-3">owner, admin</td><td className="px-4 py-3">sub trong JWT phải bằng :id</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">DELETE /api/users/:id</td><td className="px-4 py-3">admin only</td><td className="px-4 py-3">role === &quot;admin&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Part III Header */}
        <div className="bg-primary text-white rounded-2xl px-7 py-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">III</span>
          <h2 className="font-heading text-xl font-bold">Cài đặt phía Frontend</h2>
        </div>

        {/* 3.1 LocalStorage */}
        <section id="frontend-storage" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">3.1 Lưu trữ dữ liệu (localStorage)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Key</th>
                  <th className="px-4 py-3 text-left">Nội dung</th>
                  <th className="px-4 py-3 text-left">Dùng bởi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">bsUser</td><td className="px-4 py-3">Thông tin người dùng đăng nhập (JSON)</td><td className="px-4 py-3">Header, Profile, Orders</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">bsCart</td><td className="px-4 py-3">Giỏ hàng (mảng sản phẩm)</td><td className="px-4 py-3">Cart, Checkout, Header</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">bsOrders</td><td className="px-4 py-3">Lịch sử đơn hàng</td><td className="px-4 py-3">Orders, Tracking</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">bsWishlist</td><td className="px-4 py-3">Danh sách sách yêu thích</td><td className="px-4 py-3">Wishlist, Product Detail</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-mono">bsReviews</td><td className="px-4 py-3">Đánh giá của người dùng</td><td className="px-4 py-3">Reviews, Product Detail</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3.2 Frontend Flow */}
        <section id="frontend-flow" className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h3 className="font-heading text-xl text-primary font-bold mb-4">3.2 Luồng trang (Page Flow)</h3>
          <div className="space-y-4 text-sm">
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">Luồng mua sách thường</p>
              <p className="text-xs text-gray-600 font-mono">/products → /products/[slug] → /cart → /checkout/voucher → /checkout → /checkout/momo hoặc /checkout/bank-transfer → /orders/success</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">Luồng custom sách (Mua từ BookStation)</p>
              <p className="text-xs text-gray-600 font-mono">/custom-book → /custom-book/payment → /custom-book/success</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">Luồng custom sách (Gửi sách cá nhân)</p>
              <p className="text-xs text-gray-600 font-mono">/custom-book → /custom-book/send-book → /custom-book/success-used</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-primary mb-2">Luồng xác thực</p>
              <p className="text-xs text-gray-600 font-mono">/auth/login ↔ /auth/register → /auth/forgot-password → /auth/reset-password → /auth/reset-success</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
