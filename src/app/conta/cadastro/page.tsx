"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mensagemErroAuth, useAuth } from "@/lib/auth-context";

export default function Cadastro() {
  const { cadastrar } = useAuth();
  const router = useRouter();
  const [f, setF] = useState({ nome: "", email: "", whatsapp: "", empresa: "", cidade: "", senha: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await cadastrar(f);
      router.push("/");
    } catch (err) {
      setErro(mensagemErroAuth(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-12">
      <h1 className="mb-1 text-2xl font-bold">Criar conta</h1>
      <p className="mb-6 text-sm text-muted">Cadastre-se para registrar interesses e facilitar o atendimento comercial.</p>
      <form onSubmit={enviar} className="space-y-4">
        <div>
          <label className="label">Nome completo</label>
          <input className="input" required value={f.nome} onChange={set("nome")} />
        </div>
        <div>
          <label className="label">E-mail</label>
          <input className="input" type="email" required value={f.email} onChange={set("email")} />
        </div>
        <div>
          <label className="label">WhatsApp</label>
          <input className="input" type="tel" required placeholder="(15) 99999-9999" value={f.whatsapp} onChange={set("whatsapp")} />
        </div>
        <div>
          <label className="label">Empresa (opcional)</label>
          <input className="input" value={f.empresa} onChange={set("empresa")} />
        </div>
        <div>
          <label className="label">Cidade (opcional)</label>
          <input className="input" value={f.cidade} onChange={set("cidade")} />
        </div>
        <div>
          <label className="label">Senha</label>
          <input className="input" type="password" minLength={6} required value={f.senha} onChange={set("senha")} />
        </div>
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        <button className="btn btn-primary w-full" disabled={enviando}>
          {enviando ? "Criando…" : "Criar conta"}
        </button>
        <p className="text-xs text-muted">
          Ao criar a conta você concorda com os <Link href="/termos" className="underline">Termos de uso</Link> e a{" "}
          <Link href="/privacidade" className="underline">Política de privacidade</Link>.
        </p>
      </form>
      <p className="mt-4 text-sm text-muted">
        Já tem conta?{" "}
        <Link href="/conta/entrar" className="font-semibold text-accent">
          Entrar
        </Link>
      </p>
    </main>
  );
}
