# Central da Reversa (template de catálogo de paletes)

Catálogo de paletes com compra pelo WhatsApp. Next.js 16 + Firebase (Firestore, Authentication, Storage) + Vercel.
Feito como **template**: para um cliente novo, copie o projeto e troque só `src/site.config.ts`, as cores em
`src/app/globals.css`, o logo (`public/logo.png` e `src/app/icon.png`) e o `.env.local`.

## O que tem

- Catálogo com busca por nome e filtro por categoria; página do palete com galeria, dados e lista de produtos.
- Botão **Comprar** abre o WhatsApp com mensagem pronta; com conta logada, o interesse fica registrado.
- Cadastro e login (e-mail e senha).
- Painel `/admin` para o cliente **cadastrar, editar e excluir** paletes, enviar fotos, importar produtos por CSV,
  marcar status (disponível, reservado, vendido) e ver os interesses.
- Páginas Sobre, Local, Contato, Privacidade, Termos e Cookies (os textos legais são modelos: peça revisão).

## Como rodar

1. Crie um projeto no [Firebase](https://console.firebase.google.com) e ative:
   **Authentication** (método E-mail/senha), **Firestore Database** e **Storage**.
   (O Storage pode exigir o plano Blaze, que mantém uma cota gratuita; confira ao ativar.)
2. Em *Configurações do projeto > Seus aplicativos*, crie um app **Web** e copie as chaves.
3. `cp .env.example .env.local` e preencha.
4. Publique as regras de segurança (`firestore.rules` e `storage.rules`):
   ```bash
   npm i -g firebase-tools && firebase login
   firebase use --add            # escolha o projeto
   firebase deploy --only firestore:rules,storage
   ```
5. `npm install && npm run dev` e abra http://localhost:3000.

## Demonstração (sem Firebase)

`npm run build:demo` gera o site estático em `out/` com dados fictícios e já entra como administrador
(nada é salvo de verdade, tudo some ao recarregar). Ele é publicado na branch `gh-pages` para o GitHub Pages
(`/central-da-reversa/`). Para outro nome de repositório, ajuste `NEXT_PUBLIC_BASE_PATH` em `package.json`.

## Primeiro administrador

Ninguém vira admin pelo site (as regras impedem). Faça assim:

1. Crie uma conta normal em `/conta/cadastro`.
2. No Console do Firebase, abra **Firestore > perfis > (documento do seu usuário)** e mude o campo `papel`
   de `cliente` para `admin`.
3. Recarregue o site: aparece o link **Painel** no topo.

## Importar produtos de um palete

No formulário do palete, envie um CSV (separador `;` ou `,`) com as colunas
`descricao;codigo;quantidade;valor`, por exemplo:

```
descricao;codigo;quantidade;valor
Fone Bluetooth;7891234567890;2;89,90
```

A importação substitui a lista atual e atualiza a quantidade de produtos.

## Publicar na Vercel

1. Suba o código no GitHub e importe o repositório na Vercel.
2. Cadastre as mesmas variáveis `NEXT_PUBLIC_FIREBASE_*` em *Settings > Environment Variables*.
3. No Firebase, em *Authentication > Configurações > Domínios autorizados*, adicione o domínio da Vercel.

## Novo cliente a partir deste template

1. Copie o repositório e crie um projeto Firebase e um projeto Vercel para o cliente.
2. Edite `src/site.config.ts` (nome, WhatsApp, endereço, categorias, textos), as cores em `globals.css` e troque `public/logo.png` e `src/app/icon.png`.
3. Siga "Como rodar" e "Primeiro administrador".

## Estrutura do banco (Firestore)

| Coleção | Conteúdo |
| --- | --- |
| `paletes/{slug}` | nome, codigo, categoria, condicao, valorAvaliado e valorVenda (centavos), qtdProdutos, qtdPaletes, localizacao, descricao, status, fotos, criadoEm |
| `paletes/{slug}/produtos` | descricao, codigo, quantidade, valorUnitario (centavos) |
| `perfis/{uid}` | nome, email, whatsapp, empresa, cidade, papel (`cliente` ou `admin`) |
| `interesses/{id}` | uid, nome, whatsapp, paleteId, paleteNome, criadoEm |

As categorias ficam em `site.config.ts` (não em coleção) para simplificar a troca por cliente.
