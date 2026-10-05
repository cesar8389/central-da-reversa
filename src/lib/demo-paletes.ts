import type { Palete, Produto } from "./types";
import { site } from "@/site.config";

const exemplos = [
  { categoria: "Eletrônicos", nome: "Tecnologia & acessórios", cor: "#fac403", itens: ["Fone Bluetooth", "Carregador USB", "Caixa de som portátil"], quantidades: [20, 30, 10], valores: [8990, 3990, 14990], venda: 249000 },
  { categoria: "Casa e utilidades", nome: "Um novo giro para a casa", cor: "#b8c9b0", itens: ["Jogo de potes", "Organizador multiuso", "Garrafa térmica"], quantidades: [24, 18, 12], valores: [5990, 3490, 7990], venda: 149000 },
  { categoria: "Higiene e beleza", nome: "Beleza & cuidados", cor: "#dfc5bd", itens: ["Kit de cuidados capilares", "Necessaire", "Escova de cabelo"], quantidades: [30, 20, 25], valores: [6990, 2990, 1990], venda: 129000 },
  { categoria: "Misto", nome: "Mix de oportunidades", cor: "#c5c3db", itens: ["Acessório para celular", "Utilidade doméstica", "Item de papelaria"], quantidades: [25, 30, 40], valores: [3990, 4990, 1490], venda: 159000 },
];

export const produtosDemo: Record<string, Produto[]> = {};
export const paletesDemo: Palete[] = exemplos.map((exemplo, i) => {
  const id = `demo-lote-${i + 1}`;
  const produtos = exemplo.itens.map((descricao, j) => ({ id: `${id}-produto-${j}`, descricao, codigo: `DEMO-${i+1}-${j+1}`, quantidade: exemplo.quantidades[j], valorUnitario: exemplo.valores[j] }));
  produtosDemo[id] = produtos;
  return { id, codigo: `DEMO-00${i+1}`, nome: exemplo.nome, categoria: exemplo.categoria, condicao: "Misto (exemplo)", valorAvaliado: produtos.reduce((total, produto) => total + produto.quantidade * produto.valorUnitario, 0), valorVenda: exemplo.venda, qtdProdutos: produtos.reduce((total, produto) => total + produto.quantidade, 0), qtdPaletes: 1, localizacao: site.cidadeUf, descricao: "Lote fictício para demonstração do catálogo. Produtos, condições e valores são ilustrativos e não representam estoque disponível.", status: i === 2 ? "reservado" : "disponivel", fotos: [{ url: `/demo/lote-${i+1}.svg` }], criadoEm: 1791072000000 - i };
});
export const ehPaleteDemo = (id: string) => paletesDemo.some((p) => p.id === id);