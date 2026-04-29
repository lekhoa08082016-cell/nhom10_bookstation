import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageWrapper from "@/components/layout/PageWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "BookStation",
    template: "%s | BookStation",
  },
  description: "Hệ thống bán sách trực tuyến kết hợp dịch vụ custom bìa độc đáo.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        {/* Inline script: áp dụng dark class trước khi render để tránh flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('bs-theme');
              if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){
                document.documentElement.classList.add('dark');
              }
            } catch(e){}
          })();
        `}} />
      </head>
      <body className="font-body bg-gray-100 overflow-x-hidden">
        <ThemeProvider>
          <Header />
          <PageWrapper>
            <main>{children}</main>
          </PageWrapper>
          <Footer />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
