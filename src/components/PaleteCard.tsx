import Link from "next/link";
import { formatarCentavos } from "@/lib/format";
import type { Palete } from "@/lib/types";
import { site } from "@/site.config";

export default function PaleteCard({ p }: { p: Palete }) {
  const reservado = p.status === "reservado";
  return (
    <Link
      href={`/palete/${p.id}`}
      className="group overflow-hidden rounded border border-line bg-white transition hover:border-accent"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {p.fotos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.fotos[0].url} alt={p.nome} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">Sem foto</div>
        )}
        {reservado && (
          <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            Reservado
          </span>
        )}
      </div>
      <div className="space-y-1 p-4">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted">LOTE / {p.codigo}</span>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{p.categoria}</p>
        <h3 className="font-semibold group-hover:text-accent">{p.nome}</h3>
        <p className="text-sm text-muted">
          Valor avaliado <span className="line-through">{formatarCentavos(p.valorAvaliado)}</span>
        </p>
        <p className="text-lg font-bold">
          <span className="mr-1 text-sm font-medium text-muted">Valor venda</span>
          {formatarCentavos(p.valorVenda)}
        </p>
        <p className="text-xs text-muted">
          {p.qtdProdutos} produtos ·{" "}
          {p.qtdPaletes} {p.qtdPaletes === 1 ? `${site.item.singular} disponível` : `${site.item.plural} disponíveis`}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold">
          <span>Conhecer o lote</span><span aria-hidden="true">↗</span>
        </div>
      </div>
    </Link>
  );
}
