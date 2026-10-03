"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { firebaseConfigurado } from "@/lib/firebase";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, perfil, carregando } = useAuth();
  if (!firebaseConfigurado)
    return <main className="mx-auto max-w-3xl px-4 py-10">Configure o Firebase para usar o painel.</main>;
  if (carregando) return <main className="mx-auto max-w-3xl px-4 py-10 text-muted">Carregando…</main>;
  if (!user)
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="mb-4">Entre com a conta de administrador para acessar o painel.</p>
        <Link href="/conta/entrar" className="btn btn-primary">
          Entrar
        </Link>
      </main>
    );
  if (perfil?.papel !== "admin")
    return <main className="mx-auto max-w-3xl px-4 py-10">Esta conta não tem acesso ao painel.</main>;
  return <>{children}</>;
}
