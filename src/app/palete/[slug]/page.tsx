"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { formatarCentavos } from "@/lib/format";
import { listarProdutos, obterPalete, registrarInteresse } from "@/lib/paletes";
import type { Palete, Produto } from "@/lib/types";
import { linkWhatsapp, mensagemPalete } from "@/lib/whatsapp";
import { site } from "@/site.config";
import { paletesDemo, produtosDemo, ehPaleteDemo } from "@/lib/demo-paletes";

export default function PaletePagina() {
  const { slug } = useParams<{ slug: string }>();
  const { user, perfil } = useAuth();
  const [p, setP] = useState<Palete | null | undefined>(undefined);
  const [foto, setFoto] = useState(0);
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const [verProdutos, setVerProdutos] = useState(false);

  useEffect(() => {
    setFoto(0);
    setProdutos(null);
    setVerProdutos(false);
    const exemplo = paletesDemo.find((item) => item.id === slug);
    if (exemplo) { setP(exemplo); return; }
    obterPalete(slug)
      .then(setP)
      .catch(() => setP(null));
  }, [slug]);

  async function abrirProdutos() {
    setVerProdutos((v) => !v);
    if (!produtos) setProdutos(produtosDemo[slug] ?? await listarProdutos(slug).catch(() => []));
  }

  async function comprar() {
    if (!p || ehPaleteDemo(p.id)) return;
    if (user && perfil) {
      // Com conta, o interesse fica registrado para o atendimento comercial.
      registrarInteresse({
        uid: user.uid,
        nome: perfil.nome,
        whatsapp: perfil.whatsapp,
        paleteId: p.id,
        paleteNome: p.nome,
        criadoEm: Date.now(),
      }).catch(() => undefined);
    }
    window.open(linkWhatsapp(mensagemPalete(p)), "_blank", "noopener");
  }

  if (p === undefined) return <main className="mx-auto max-w-5xl px-4 py-10 text-muted">Carregando…</main>;
  if (p === null)
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="mb-4">{site.item.titulo} não encontrado.</p>
        <Link href="/" className="btn btn-ghost">
          Voltar ao catálogo
        </Link>
      </main>
    );

  const demonstracao = ehPaleteDemo(p.id);
  const indisponivel = p.status === "vendido" || demonstracao;
  const dados: [string, string][] = [
    ["Categoria", p.categoria],
    ["Condição", p.condicao],
    ["Valor avaliado", formatarCentavos(p.valorAvaliado)],
    ["Valor de venda", formatarCentavos(p.valorVenda)],
    ["Produtos", String(p.qtdProdutos)],
    [`${site.item.titulo}s`, String(p.qtdPaletes)],
    ["Localização", p.localizacao],
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/" className="text-sm text-muted hover:text-ink">
        ← Catálogo
      </Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-gray-100">
            {p.fotos[foto] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.fotos[foto].url} alt={p.nome} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-muted">Sem foto</div>
            )}
            {p.fotos.length > 1 && (
              <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                {foto + 1}/{p.fotos.length}
              </span>
            )}
          </div>
          {p.fotos.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {p.fotos.map((f, i) => (
                <button
                  key={f.url}
                  onClick={() => setFoto(i)}
                  className={`h-16 w-20 shrink-0 overflow-hidden rounded border-2 ${i === foto ? "border-brand" : "border-transparent"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{p.nome}</h1>
          {p.status === "reservado" && (
            <span className="mt-2 inline-block rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
              Reservado
            </span>
          )}
          <dl className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
            {dados.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-2 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          {p.descricao && <p className="mt-4 text-gray-700">{p.descricao}</p>}

          <div className="mt-6 space-y-3">
            <button onClick={comprar} disabled={indisponivel} className="btn btn-wpp w-full !py-3 text-base">
              {demonstracao ? "Lote de demonstração — sem venda" : indisponivel ? "Indisponível" : "Comprar pelo WhatsApp"}
            </button>
            {demonstracao ? <p className="text-xs text-muted">Produtos e valores fictícios para visualizar o catálogo. Nenhum interesse é registrado.</p> : user ? (
              <p className="text-xs text-muted">Compra concluída pelo WhatsApp. Seu interesse fica registrado.</p>
            ) : (
              <p className="text-xs text-muted">
                Compra concluída pelo WhatsApp. Com conta, o interesse fica registrado.{" "}
                <Link href="/conta/cadastro" className="font-semibold text-accent">
                  Criar conta
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <button onClick={abrirProdutos} className="btn btn-ghost">
          {p.qtdProdutos} produtos · {verProdutos ? "Ocultar" : "Ver produtos"}
        </button>
        {verProdutos && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white">
            {!produtos ? (
              <p className="p-4 text-muted">Carregando…</p>
            ) : produtos.length === 0 ? (
              <p className="p-4 text-muted">A lista de produtos ainda não foi cadastrada.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-muted">
                  <tr>
                    <th className="px-4 py-2">Produto</th>
                    <th className="px-4 py-2">Código</th>
                    <th className="px-4 py-2 text-right">Qtd</th>
                    <th className="px-4 py-2 text-right">Valor unit.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {produtos.map((x) => (
                    <tr key={x.id}>
                      <td className="px-4 py-2">{x.descricao}</td>
                      <td className="px-4 py-2 text-muted">{x.codigo}</td>
                      <td className="px-4 py-2 text-right">{x.quantidade}</td>
                      <td className="px-4 py-2 text-right">{x.valorUnitario ? formatarCentavos(x.valorUnitario) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
