import type { Palete, Produto } from "./types";

// Modo demonstração: dados fictícios em memória, sem Firebase.
// Ative com NEXT_PUBLIC_DEMO=1 (veja "npm run build:demo" no README).
export const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function foto(rotulo: string, cor: string, variante: number) {
  const dx = -70 + (variante - 2) * 12; // centraliza a caixa e varia a posição entre as fotos
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='${cor}'/><g transform='translate(${dx} 0)'><polygon points='330,250 470,210 610,250 470,290' fill='#fde68a'/><polygon points='330,250 470,290 470,450 330,410' fill='#fac403'/><polygon points='470,290 610,250 610,410 470,450' fill='#d99f00'/></g><text x='400' y='520' font-family='Arial' font-size='34' font-weight='700' fill='#fff' text-anchor='middle'>${rotulo}</text><text x='400' y='560' font-family='Arial' font-size='20' fill='#ffffffaa' text-anchor='middle'>imagem ilustrativa</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const base = (n: number) => Date.now() - n * 86_400_000;

function p(
  codigo: string,
  categoria: string,
  avaliado: number,
  venda: number,
  qtdProdutos: number,
  cor: string,
  extra: Partial<Palete> = {},
): Palete {
  return {
    id: `palete-${codigo.toLowerCase()}`,
    nome: `Palete ${codigo}`,
    codigo,
    categoria,
    condicao: "Misto",
    valorAvaliado: Math.round(avaliado * 100),
    valorVenda: Math.round(venda * 100),
    qtdProdutos,
    qtdPaletes: 1,
    localizacao: "Sumaré — SP",
    descricao: "Produtos variados mistos",
    status: "disponivel",
    fotos: [1, 2, 3, 4].map((i) => ({ url: foto(`Palete ${codigo}`, cor, i) })),
    criadoEm: base(0),
    ...extra,
  };
}

export const demoPaletes: Palete[] = [
  p("RZ-1438089", "Misto", 17539.23, 7015.69, 36, "#1f2937", { criadoEm: base(1) }),
  p("RZ-1544197", "Misto", 38877.15, 15550.86, 824, "#334155", { criadoEm: base(2) }),
  p("RZ-1442113", "Misto", 8389.16, 3355.66, 11, "#3f3f46", { criadoEm: base(3) }),
  p("RZ-1548011", "Eletrônicos", 21480.0, 8592.0, 58, "#0f172a", { criadoEm: base(4), condicao: "Usado" }),
  p("RZ-1532861", "Higiene e beleza", 12310.5, 4924.2, 143, "#4c1d95", { criadoEm: base(5), condicao: "Novo" }),
  p("RZ-1546221", "Casa e utilidades", 9875.9, 3950.36, 67, "#14532d", { criadoEm: base(6), status: "reservado" }),
  p("RZ-1440041", "Alimentos e bebidas", 6420.0, 2568.0, 212, "#7c2d12", { criadoEm: base(7), condicao: "Novo" }),
  p("RZ-1442067", "Pet", 5310.4, 2124.16, 94, "#155e75", { criadoEm: base(8) }),
];

const nomes = [
  "Fone de ouvido Bluetooth", "Carregador turbo 20W", "Shampoo 400ml", "Panela antiaderente 24cm",
  "Escova de dentes elétrica", "Ração premium 1kg", "Camiseta básica", "Garrafa térmica 500ml",
  "Cabo USB-C 1m", "Creme hidratante 200g", "Luminária de mesa LED", "Kit de talheres 24 peças",
];

export function demoProdutos(id: string): Produto[] {
  const p0 = demoPaletes.find((x) => x.id === id);
  const n = Math.min(p0?.qtdProdutos ?? 0, 24);
  return Array.from({ length: n }, (_, i) => ({
    id: `${id}-${i}`,
    descricao: nomes[i % nomes.length],
    codigo: `78912${String(34000 + i * 7).padStart(8, "0")}`,
    quantidade: (i % 5) + 1,
    valorUnitario: 1990 + ((i * 1370) % 21000),
  }));
}
