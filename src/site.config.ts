// Tudo que muda de um cliente para outro fica aqui (e nas variáveis .env).
// Para um cliente novo: copie o projeto e edite só este arquivo + .env.local.
export const site = {
  nome: "Central da Reversa",
  descricao:
    "Catálogo da Central da Reversa — paletes com produto. Valor avaliado, valor de venda e compra pelo WhatsApp.",
  // Rótulo do item vendido (para servir a outros nichos)
  item: { singular: "palete", plural: "paletes", titulo: "Palete" },
  whatsapp: "5515991731941", // só dígitos, com DDI
  whatsappExibicao: "(15) 99173-1941",
  endereco: "Rua Alberto Bosco, 472, Jardim São Judas Tadeu (Nova Veneza), Sumaré, SP, 13180-550",
  cidadeUf: "Sumaré — SP",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Alberto+Bosco+472+Sumar%C3%A9+SP",
  horario: "Segunda a sexta, das 8h às 18h",
  categorias: [
    "Alimentos e bebidas",
    "Higiene e beleza",
    "Casa e utilidades",
    "Eletrônicos",
    "Vestuário",
    "Pet",
    "Infantil",
    "Misto",
    "Outros",
  ],
  sobre: [
    "A Central da Reversa comercializa paletes com produto: lotes de logística reversa com mercadoria verificada e fotografias autênticas.",
  ],
  passos: [
    "Veja os paletes disponíveis no catálogo.",
    "Cada palete mostra o valor avaliado da carga e o valor de venda.",
    "Negocie pelo WhatsApp comercial.",
    "Combine retirada ou entrega no fechamento.",
  ],
};
