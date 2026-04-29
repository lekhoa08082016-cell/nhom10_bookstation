import { assetPath } from "@/lib/assetPath";

const TEAM = [
  {
    name: "Phạm Trần Vân Khánh", 
    mssv: "24126100",
    role: "Frontend Developer",
    github: "https://github.com/vkhanhie",
    githubLabel: "https://github.com/vkhanhie",
    img: assetPath("/images/anhtv1.jpg"),
  },
  {
    name: "Lê Thị Châu Khoa", 
    mssv: "24126101",
    role: "Frontend Developer",
    github: "https://github.com/lekhoa08082016-cell",
    githubLabel: "https://github.com/lekhoa08082016-cell",
    img: assetPath("/images/anhtv2.jpg"),
  },
  {
    name: "Lê Diệu Ngân", 
    mssv: "24126143",
    role: "Frontend Developer",
    github: "https://github.com/dngan36",
    githubLabel: "https://github.com/dngan36",
    img: assetPath("/images/anhtv3.jpg"),
  },
  {
    name: "Phan Thị Kim Ngân", 
    mssv: "24126147",
    role: "Frontend Developer",
    github: "https://github.com/kimngan1008",
    githubLabel: "https://github.com/kimngan1008",
    img: assetPath("/images/anhtv4.jpg"),
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">Về BookStation</h1>
        <p className="text-xl md:text-2xl text-secondary font-medium uppercase tracking-wide">Gồm các thành viên:</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {TEAM.map((m) => (
          <div key={m.mssv}
            className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-50 transition-transform hover:scale-105">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-[#FFF0B2] mb-6 border-2 border-accent/10">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-primary text-xl mb-3">{m.name}</h3>
            <p className="text-secondary text-sm mb-1 font-medium">MSSV: {m.mssv}</p>
            
            {/* THÊM DÒNG VAI TRÒ TẠI ĐÂY */}
            <p className="text-secondary text-sm mb-3 font-medium">
              Vai trò: <span className="text-accent">{m.role}</span>
            </p>

            <p className="text-secondary text-sm font-medium">
              Link Github cá nhân:{" "}
              <a href={m.github} className="text-accent hover:underline" target="_blank" rel="noreferrer">
                {m.githubLabel}
              </a>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-lightBg rounded-3xl p-10 text-center">
        <h2 className="font-heading text-3xl font-bold text-primary mb-4">BookStation</h2>
        <p className="font-heading italic text-xl text-accent mb-4">"Mỗi quyển sách, một trạm dừng"</p>
        <p className="text-secondary leading-relaxed max-w-2xl mx-auto">
          Dự án môn học Thiết Kế Web — Nhóm 10 (HK2 2025-2026). Hệ thống bán sách trực tuyến kết hợp dịch vụ custom bìa độc đáo.
        </p>
      </div>
    </main>
  );
}
