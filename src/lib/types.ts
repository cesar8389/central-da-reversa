export type Status = "disponivel" | "reservado" | "vendido";

export interface Foto {
  url: string;
  path?: string; // caminho no Storage, quando enviada pelo painel
}

export interface Palete {
  id: string; // = slug da URL
  nome: string;
  codigo: string;
  categoria: string;
  condicao: string;
  valorAvaliado: number; // centavos
  valorVenda: number; // centavos
  qtdProdutos: number;
  qtdPaletes: number;
  localizacao: string;
  descricao: string;
  status: Status;
  fotos: Foto[];
  criadoEm: number;
}

export interface Produto {
  id: string;
  descricao: string;
  codigo: string; // EAN / SKU
  quantidade: number;
  valorUnitario: number; // centavos
}

export interface Perfil {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  cidade: string;
  papel: "cliente" | "admin";
}

export interface Interesse {
  id: string;
  uid: string;
  nome: string;
  whatsapp: string;
  paleteId: string;
  paleteNome: string;
  criadoEm: number;
}
