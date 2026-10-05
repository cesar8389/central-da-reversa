"use client";

import { useEffect, useMemo, useState } from "react";
import AvisoFirebase from "@/components/AvisoFirebase";
import PaleteCard from "@/components/PaleteCard";
import { firebaseConfigurado } from "@/lib/firebase";
import { listarPaletes } from "@/lib/paletes";
import type { Palete } from "@/lib/types";
import { site } from "@/site.config";
import { linkWhatsapp } from "@/lib/whatsapp";
import { paletesDemo, ehPaleteDemo } from "@/lib/demo-paletes";

export default function Catalogo() {
  const [paletes, setPaletes] = useState<Palete[] | null>(firebaseConfigurado ? null : paletesDemo);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (!firebaseConfigurado) return;
    listarPaletes()
      .then((l) => setPaletes(l.length ? l.filter((p) => p.status !== "vendido") : paletesDemo))
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
    <main>
      <section className="reversa-hero">
        <div className="reversa-hero-top"><span>LOGÍSTICA REVERSA. NOVAS POSSIBILIDADES.</span><span>{site.cidadeUf} ↗</span></div>
        <div className="reversa-hero-grid">
          <div className="reversa-intro">
            <span className="reversa-kicker"><span aria-hidden="true">●</span> PARA QUEM ENXERGA OPORTUNIDADE</span>
            <h1>O próximo<br />giro do seu<br /><em>negócio.</em></h1>
            <p>Produtos que voltam ao mercado.<br />Oportunidades que chegam até você.</p>
            <div className="reversa-actions"><a href="#catalogo" className="reversa-cta">Encontrar meu lote <span aria-hidden="true">↗</span></a><a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="reversa-text-link">Falar com a equipe →</a></div>
          </div>
          <div className="reversa-art" role="img" aria-label="Ilustração de caixas sobre um palete, representando um novo ciclo para os produtos">
            <div className="art-grid" />
            <span className="art-caption">CENTRAL DA REVERSA / NOVO CICLO</span>
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="shipping-stamp">PRONTO PARA<br /><strong>UM NOVO GIRO</strong><span>↗</span></div>
            <div className="crate crate-back"><span>↑ ↑</span></div>
            <div className="crate crate-left"><span>REVERSA<br /><b>01</b></span></div>
            <div className="crate crate-right"><span>↻</span><small>NOVAS POSSIBILIDADES</small></div>
            <div className="pallet-base"><i /><i /><i /></div>
            <div className="art-label"><span>DE VOLTA AO MERCADO</span><strong>Mais valor.<br />Mais movimento.</strong><span className="barcode" aria-hidden="true" /></div>
            <span className="art-bottom">ILUSTRAÇÃO CONCEITUAL · LOTES NO CATÁLOGO ↓</span>
          </div>
        </div>
        <div className="reversa-hero-bottom"><span>Paletes com produto. Negociação direta.</span><a href="#como-funciona">Entenda como funciona ↓</a></div>
      </section>
      <div className="category-ribbon" aria-label="Categorias de produtos"><span>UM NOVO DESTINO PARA</span>{site.categorias.slice(0, 6).map((c) => <a key={c} href="#catalogo" onClick={() => setCategoria(c)}>{c} <span aria-hidden="true">↗</span></a>)}</div>
      <section id="catalogo" className="reversa-catalogue mx-auto max-w-7xl scroll-mt-6 px-6 py-20" aria-labelledby="catalogo-titulo">
      <AvisoFirebase />
      {paletes?.some((p) => ehPaleteDemo(p.id)) && <p className="mb-6 rounded border border-line bg-brand-soft p-4 text-sm">Catálogo de demonstração · Lotes, ilustrações e valores fictícios, sem disponibilidade para compra. Os exemplos aparecem enquanto não há paletes cadastrados.</p>}
      <span className="catalogue-eyebrow">ENCONTRE SUA PRÓXIMA OPORTUNIDADE</span>
      <h2 id="catalogo-titulo" className="mt-3 text-3xl font-bold sm:text-4xl">Catálogo de {site.item.plural}</h2>
      <p className="mb-6 text-muted">
        {site.item.titulo}s com produto. Valor avaliado, valor de venda e compra pelo WhatsApp.
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          className="input max-w-xs"
          aria-label="Buscar paletes por nome ou código" placeholder="Qual oportunidade você procura?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select aria-label="Filtrar por categoria" className="input max-w-xs" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
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
      </section>
      <section id="como-funciona" className="reversa-process">
        <div className="process-heading"><span className="reversa-kicker">DO CATÁLOGO AO SEU NEGÓCIO</span><h2>Oportunidade boa<br />é a que <em>circula.</em></h2><p>Escolha com informação. Negocie com quem entende do lote.</p></div>
        <div className="process-steps"><article><span>01 / EXPLORE</span><h3>Encontre o seu palete.</h3><p>Busque por categoria e confira fotos, condição, produtos e valores de cada lote.</p></article><article><span>02 / CONVERSE</span><h3>Vamos aos detalhes.</h3><p>Envie o palete pelo WhatsApp e confirme a disponibilidade com nossa equipe.</p></article><article><span>03 / MOVIMENTE</span><h3>Combine o próximo passo.</h3><p>A compra, a retirada ou a entrega são combinadas diretamente no atendimento.</p></article></div>
      </section>
      <section className="reversa-contact"><div><span className="reversa-kicker">SUA PRÓXIMA OPORTUNIDADE COMEÇA AQUI</span><h2>Vamos dar um<br />novo giro?</h2></div><div><a href={linkWhatsapp("Olá! Quero saber mais sobre os paletes disponíveis.")} target="_blank" rel="noopener noreferrer" className="reversa-cta">Chamar no WhatsApp ↗</a><p>{site.whatsappExibicao}<br />{site.horario}</p></div></section>
    </main>
  );
}
