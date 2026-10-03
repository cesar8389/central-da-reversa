"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mensagemErroAuth, useAuth } from "@/lib/auth-context";

export default function Entrar() {
  const { entrar } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await entrar(email, senha);
      router.push("/");
    } catch (err) {
      setErro(mensagemErroAuth(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-12">
      <h1 className="mb-1 text-2xl font-bold">Entrar</h1>
      <p className="mb-6 text-sm text-muted">Acompanhe os interesses registrados e agilize o atendimento.</p>
      <form onSubmit={enviar} className="space-y-4">
        <div>
          <label className="label">E-mail</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Senha</label>
          <input className="input" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        <button className="btn btn-primary w-full" disabled={enviando}>
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Ainda não tem conta?{" "}
        <Link href="/conta/cadastro" className="font-semibold text-accent">
          Cadastre-se
        </Link>
      </p>
    </main>
  );
}
