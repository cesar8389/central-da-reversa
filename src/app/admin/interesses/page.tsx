"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { apagarInteresse, listarInteresses } from "@/lib/paletes";
import type { Interesse } from "@/lib/types";

const numeroWpp = (t: string) => {
  const d = t.replace(/\D/g, "");
  return d.startsWith("55") ? d : `55${d}`;
};

function Lista() {
  const [lista, setLista] = useState<Interesse[] | null>(null);
  const carregar = () => listarInteresses().then(setLista).catch(() => setLista([]));
  useEffect(() => {
    carregar();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/admin" className="text-sm text-muted hover:text-ink">
        ← Painel
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-bold">Interesses registrados</h1>
      {!lista ? (
        <p className="text-muted">Carregando…</p>
      ) : lista.length === 0 ? (
        <p className="text-muted">Nenhum interesse registrado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-muted">
              <tr>
                <th className="px-4 py-2">Quando</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">WhatsApp</th>
                <th className="px-4 py-2">Palete</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {lista.map((i) => (
                <tr key={i.id}>
                  <td className="px-4 py-2">{new Date(i.criadoEm).toLocaleString("pt-BR")}</td>
                  <td className="px-4 py-2">{i.nome}</td>
                  <td className="px-4 py-2">
                    <a
                      className="text-wpp-dark underline"
                      href={`https://wa.me/${numeroWpp(i.whatsapp)}?text=${encodeURIComponent(`Olá ${i.nome}, vi seu interesse no ${i.paleteNome}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {i.whatsapp}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/palete/${i.paleteId}`} className="hover:text-brand">
                      {i.paleteNome}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="text-red-600"
                      onClick={() => apagarInteresse(i.id).then(carregar)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function Interesses() {
  return (
    <AdminGuard>
      <Lista />
    </AdminGuard>
  );
}
