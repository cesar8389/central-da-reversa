"use client";

import { useEffect, useMemo, useState } from "react";
import AvisoFirebase from "@/components/AvisoFirebase";
import PaleteCard from "@/components/PaleteCard";
import { firebaseConfigurado } from "@/lib/firebase";
import { listarPaletes } from "@/lib/paletes";
import type { Palete } from "@/lib/types";
import { site } from "@/site.config";

export default function Catalogo() {
  const [paletes, setPaletes] = useState<Palete[] | null>(null);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (!firebaseConfigurado) return;
    listarPaletes()
      .then((l) => setPaletes(l.filter((p) => p.status !== "vendido")))
      .catch(() => setErro("Não foi possível carregar o catálogo agora."));
  }, []);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return (paletes ?? []).filter(
      (p) =>
        (!categoria || p.categoria === categoria) &&
        (!q || p.nome.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q)),
    );
  }, [paletes, busca, categoria]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <AvisoFirebase />
      <h1 className="text-2xl font-bold">Catálogo</h1>
      <p className="mb-6 text-muted">
        {site.item.titulo}s com produto. Valor avaliado, valor de venda e compra pelo WhatsApp.
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          className="input max-w-xs"
          placeholder={`Buscar ${site.item.singular} pelo nome`}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select className="input max-w-xs" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas as categorias</option>
          {site.categorias.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}
      {firebaseConfigurado && !paletes && !erro && <p className="text-muted">Carregando…</p>}
      {paletes && filtrados.length === 0 && (
        <p className="text-muted">Nenhum {site.item.singular} encontrado.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtrados.map((p) => (
          <PaleteCard key={p.id} p={p} />
        ))}
      </div>
    </main>
  );
}
