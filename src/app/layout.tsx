import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/auth-context";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: { default: site.nome, template: `%s | ${site.nome}` },
  description: site.descricao,
  openGraph: { title: site.nome, description: site.descricao, type: "website" },
  twitter: { card: "summary", title: site.nome, description: site.descricao },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Header />
          <div className="site-content">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
