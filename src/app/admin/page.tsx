"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { formatarCentavos } from "@/lib/format";
import { excluirPalete, listarPaletes } from "@/lib/paletes";
import type { Palete } from "@/lib/types";
import { site } from "@/site.config";

const rotulo = { disponivel: "Disponível", reservado: "Reservado", vendido: "Vendido" };

function Lista() {
  const [lista, setLista] = useState<Palete[] | null>(null);
  const [erro, setErro] = useState("");

  const carregar = () =>
    listarPaletes()
      .then(setLista)
      .catch(() => setErro("Não foi possível carregar."));
  useEffect(() => {
    carregar();
  }, []);

  async function excluir(p: Palete) {
    if (!confirm(`Excluir ${p.nome}? Isso apaga também as fotos e a lista de produtos.`)) return;
    try {
      await excluirPalete(p);
      await carregar();
    } catch {
      setErro("Não foi possível excluir.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Painel · {site.item.titulo}s</h1>
        <div className="flex gap-2">
          <Link href="/admin/interesses" className="btn btn-ghost">
            Interesses
          </Link>
          <Link href="/admin/paletes/novo" className="btn btn-primary">
            Novo {site.item.singular}
          </Link>
        </div>
      </div>
      {erro && <p className="mb-3 text-red-600">{erro}</p>}
      {!lista ? (
        <p className="text-muted">Carregando…</p>
      ) : lista.length === 0 ? (
        <p className="text-muted">Nenhum {site.item.singular} cadastrado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-muted">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Categoria</th>
                <th className="px-4 py-2 text-right">Venda</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {lista.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2 font-medium">
                    <Link href={`/palete/${p.id}`} className="hover:text-accent">
                      {p.nome}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{p.categoria}</td>
                  <td className="px-4 py-2 text-right">{formatarCentavos(p.valorVenda)}</td>
                  <td className="px-4 py-2">{rotulo[p.status]}</td>
                  <td className="space-x-3 px-4 py-2 text-right">
                    <Link href={`/admin/paletes/${p.id}`} className="font-semibold text-accent">
                      Editar
                    </Link>
                    <button onClick={() => excluir(p)} className="font-semibold text-red-600">
                      Excluir
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

export default function Admin() {
  return (
    <AdminGuard>
      <Lista />
    </AdminGuard>
  );
}
