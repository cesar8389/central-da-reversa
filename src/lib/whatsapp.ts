import { site } from "@/site.config";
import type { Palete } from "./types";
import { formatarCentavos } from "./format";

export function linkWhatsapp(texto?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

export function mensagemPalete(p: Palete) {
  return [
    `Olá! Tenho interesse neste ${site.item.singular} com produto:`,
    "",
    `*Nome:* ${p.nome}`,
    `*Categoria:* ${p.categoria}`,
    `*Condição:* ${p.condicao}`,
    `*Valor avaliado:* ${formatarCentavos(p.valorAvaliado)}`,
    `*Valor venda:* ${formatarCentavos(p.valorVenda)}`,
    "",
    `Vi no site ${site.nome}.`,
  ].join("\n");
}
