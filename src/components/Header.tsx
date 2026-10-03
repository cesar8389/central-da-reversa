"use client";

import Image from "next/image";
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
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt={site.nome} width={56} height={56} priority className="h-14 w-14" />
          <span className="hidden text-lg font-bold text-brand sm:inline">{site.nome}</span>
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white">
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
              <span className="hidden text-gray-400 sm:inline">{perfil?.nome ?? user.email}</span>
              <button onClick={sair} className="text-gray-300 hover:text-white">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/conta/entrar" className="text-gray-300 hover:text-white">
                Entrar
              </Link>
              <Link href="/conta/cadastro" className="btn btn-primary !py-1.5">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="h-1 bg-brand" />
    </header>
  );
}
