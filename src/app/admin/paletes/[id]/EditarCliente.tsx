"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import PaleteForm from "@/components/PaleteForm";
import { obterPalete } from "@/lib/paletes";
import type { Palete } from "@/lib/types";
import { site } from "@/site.config";

function Editar() {
  const { id } = useParams<{ id: string }>();
  const [p, setP] = useState<Palete | null | undefined>(undefined);
  useEffect(() => {
    obterPalete(id)
      .then(setP)
      .catch(() => setP(null));
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Editar {site.item.singular}</h1>
      {p === undefined ? <p className="text-muted">Carregando…</p> : p === null ? <p>Não encontrado.</p> : <PaleteForm inicial={p} />}
    </main>
  );
}

export default function EditarCliente() {
  return (
    <AdminGuard>
      <Editar />
    </AdminGuard>
  );
}
