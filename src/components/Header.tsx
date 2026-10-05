"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { site } from "@/site.config";

const links = [
  { href: "/#catalogo", texto: "Catálogo" },
  { href: "/contato", texto: "Contato" },
  { href: "/local", texto: "Local" },
  { href: "/sobre", texto: "Sobre" },
];

export default function Header() {
  const { user, perfil, sair } = useAuth();
  return (
    <header className="site-header bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt={site.nome} width={104} height={104} priority className="h-20 w-20 object-contain" />
        </Link>
        <nav aria-label="Navegação principal" className="flex flex-wrap gap-5 text-sm sm:ml-auto">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white">
              {l.texto}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              {perfil?.papel === "admin" && (
                <Link href="/admin" className="font-semibold text-brand">
                  Painel
                </Link>
              )}
              <span className="hidden text-gray-400 sm:inline">{perfil?.nome ?? user.email}</span>
              <button onClick={sair} className="text-gray-300 hover:text-white">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/conta/entrar" className="text-gray-300 hover:text-white">
                Área restrita ↗
              </Link>
              <Link href="/conta/cadastro" className="btn btn-primary !py-1.5">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
