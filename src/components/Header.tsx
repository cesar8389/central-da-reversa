"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { site } from "@/site.config";

const links = [
  { href: "/", texto: "Catálogo" },
  { href: "/contato", texto: "Contato" },
  { href: "/local", texto: "Local" },
  { href: "/sobre", texto: "Sobre" },
];

export default function Header() {
  const { user, perfil, sair } = useAuth();
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-brand">
          {site.nome}
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted hover:text-ink">
              {l.texto}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm">
          {user ? (
            <>
              {perfil?.papel === "admin" && (
                <Link href="/admin" className="font-semibold text-brand">
                  Painel
                </Link>
              )}
              <span className="hidden text-muted sm:inline">{perfil?.nome ?? user.email}</span>
              <button onClick={sair} className="text-muted hover:text-ink">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/conta/entrar" className="text-muted hover:text-ink">
                Entrar
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
