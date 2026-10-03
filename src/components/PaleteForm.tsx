"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { centavosParaReais, reaisParaCentavos, slugify } from "@/lib/format";
import {
  enviarFoto,
  obterPalete,
  parseProdutosCsv,
  removerArquivo,
  salvarPalete,
  substituirProdutos,
} from "@/lib/paletes";
import type { Foto, Palete, Status } from "@/lib/types";
import { site } from "@/site.config";

export default function PaleteForm({ inicial }: { inicial?: Palete }) {
  const router = useRouter();
  const editando = Boolean(inicial);
  const [codigo, setCodigo] = useState(inicial?.codigo ?? "");
  const [nome, setNome] = useState(inicial?.nome ?? "");
  const [categoria, setCategoria] = useState(inicial?.categoria ?? site.categorias[0]);
  const [condicao, setCondicao] = useState(inicial?.condicao ?? "Misto");
  const [avaliado, setAvaliado] = useState(inicial ? centavosParaReais(inicial.valorAvaliado) : "");
  const [venda, setVenda] = useState(inicial ? centavosParaReais(inicial.valorVenda) : "");
  const [qtdPaletes, setQtdPaletes] = useState(inicial?.qtdPaletes ?? 1);
  const [qtdProdutos, setQtdProdutos] = useState(inicial?.qtdProdutos ?? 0);
  const [localizacao, setLocalizacao] = useState(inicial?.localizacao ?? site.cidadeUf);
  const [descricao, setDescricao] = useState(inicial?.descricao ?? "");
  const [status, setStatus] = useState<Status>(inicial?.status ?? "disponivel");
  const [fotos, setFotos] = useState<Foto[]>(inicial?.fotos ?? []);
  const [csv, setCsv] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [msg, setMsg] = useState("");
  const [ocupado, setOcupado] = useState(false);

  const nomeFinal = nome.trim() || (codigo.trim() ? `${site.item.titulo} ${codigo.trim()}` : "");
  const id = inicial?.id ?? slugify(nomeFinal);
  const produtosCsv = csv.trim() ? parseProdutosCsv(csv) : [];

  async function aoEscolherFotos(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!arquivos.length) return;
    if (!id) return setMsg(`Preencha o código do ${site.item.singular} antes de enviar fotos.`);
    setOcupado(true);
    setMsg("Enviando fotos…");
    try {
      const novas: Foto[] = [];
      for (const a of arquivos) novas.push(await enviarFoto(id, a));
      setFotos((f) => [...f, ...novas]);
      setMsg("");
    } catch {
      setMsg("Não foi possível enviar as fotos. Confira se o Storage está ativo no Firebase.");
    } finally {
      setOcupado(false);
    }
  }

  async function aoEscolherCsv(e: React.ChangeEvent<HTMLInputElement>) {
    const a = e.target.files?.[0];
    if (a) setCsv(await a.text());
    e.target.value = "";
  }

  function mover(i: number, d: -1 | 1) {
    setFotos((f) => {
      const j = i + d;
      if (j < 0 || j >= f.length) return f;
      const c = [...f];
      [c[i], c[j]] = [c[j], c[i]];
      return c;
    });
  }

  async function removerFoto(i: number) {
    const f = fotos[i];
    setFotos((l) => l.filter((_, k) => k !== i));
    if (f.path) await removerArquivo(f.path);
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return setMsg("Informe o código ou o nome.");
    setOcupado(true);
    setMsg("Salvando…");
    try {
      if (!editando && (await obterPalete(id))) {
        setMsg(`Já existe um ${site.item.singular} com esse nome. Use outro código.`);
        return;
      }
      const dados: Palete = {
        id,
        nome: nomeFinal,
        codigo: codigo.trim(),
        categoria,
        condicao: condicao.trim(),
        valorAvaliado: reaisParaCentavos(avaliado),
        valorVenda: reaisParaCentavos(venda),
        qtdProdutos: produtosCsv.length || qtdProdutos,
        qtdPaletes,
        localizacao: localizacao.trim(),
        descricao: descricao.trim(),
        status,
        fotos,
        criadoEm: inicial?.criadoEm ?? Date.now(),
      };
      await salvarPalete(dados);
      if (produtosCsv.length) await substituirProdutos(id, produtosCsv);
      router.push("/admin");
    } catch {
      setMsg("Não foi possível salvar. Veja se sua conta é admin e se as regras do Firestore foram publicadas.");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <form onSubmit={salvar} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Código</label>
          <input className="input" required placeholder="RZ-1438089" value={codigo} onChange={(e) => setCodigo(e.target.value)} disabled={editando} />
        </div>
        <div>
          <label className="label">Nome (opcional)</label>
          <input className="input" placeholder={codigo ? `${site.item.titulo} ${codigo}` : ""} value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label className="label">Categoria</label>
          <select className="input" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {site.categorias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Condição</label>
          <input className="input" value={condicao} onChange={(e) => setCondicao(e.target.value)} />
        </div>
        <div>
          <label className="label">Valor avaliado (R$)</label>
          <input className="input" required inputMode="decimal" placeholder="17.539,23" value={avaliado} onChange={(e) => setAvaliado(e.target.value)} />
        </div>
        <div>
          <label className="label">Valor de venda (R$)</label>
          <input className="input" required inputMode="decimal" placeholder="7.015,69" value={venda} onChange={(e) => setVenda(e.target.value)} />
        </div>
        <div>
          <label className="label">Quantidade de {site.item.plural}</label>
          <input className="input" type="number" min={1} value={qtdPaletes} onChange={(e) => setQtdPaletes(Number(e.target.value) || 1)} />
        </div>
        <div>
          <label className="label">Quantidade de produtos</label>
          <input className="input" type="number" min={0} value={produtosCsv.length || qtdProdutos} disabled={produtosCsv.length > 0} onChange={(e) => setQtdProdutos(Number(e.target.value) || 0)} />
        </div>
        <div>
          <label className="label">Localização</label>
          <input className="input" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
        </div>
        <div>
          <label className="label">Status</label>
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado (aparece com selo)</option>
            <option value="vendido">Vendido (some do catálogo)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label">Descrição</label>
        <textarea className="input" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>

      <section>
        <h2 className="mb-2 font-semibold">Fotos</h2>
        <div className="flex flex-wrap gap-3">
          {fotos.map((f, i) => (
            <div key={f.url} className="w-32 space-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt="" className="h-24 w-32 rounded border border-line object-cover" />
              <div className="flex justify-between text-xs">
                <button type="button" onClick={() => mover(i, -1)} className="px-1">←</button>
                <span className="text-muted">{i === 0 ? "capa" : i + 1}</span>
                <button type="button" onClick={() => mover(i, 1)} className="px-1">→</button>
                <button type="button" onClick={() => removerFoto(i)} className="px-1 text-red-600">✕</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input type="file" accept="image/*" multiple onChange={aoEscolherFotos} disabled={ocupado} className="text-sm" />
          <div className="flex gap-2">
            <input className="input !w-56" placeholder="ou cole o link de uma foto" value={urlFoto} onChange={(e) => setUrlFoto(e.target.value)} />
            <button type="button" className="btn btn-ghost" onClick={() => { if (urlFoto.trim()) { setFotos((f) => [...f, { url: urlFoto.trim() }]); setUrlFoto(""); } }}>
              Adicionar
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-1 font-semibold">Produtos do {site.item.singular}</h2>
        <p className="mb-2 text-sm text-muted">
          Importe uma planilha salva como CSV com as colunas: descrição; código (EAN/SKU); quantidade; valor
          unitário (R$). {editando && "Ao importar, a lista atual é substituída."}
        </p>
        <input type="file" accept=".csv,text/csv,text/plain" onChange={aoEscolherCsv} className="text-sm" />
        <textarea className="input mt-2 font-mono text-xs" rows={4} placeholder="Ou cole as linhas aqui" value={csv} onChange={(e) => setCsv(e.target.value)} />
        {produtosCsv.length > 0 && <p className="mt-1 text-sm text-muted">{produtosCsv.length} produtos prontos para importar.</p>}
      </section>

      {msg && <p className="text-sm text-amber-700">{msg}</p>}
      <div className="flex gap-3">
        <button className="btn btn-primary" disabled={ocupado}>
          {ocupado ? "Aguarde…" : editando ? "Salvar alterações" : `Cadastrar ${site.item.singular}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.push("/admin")}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
