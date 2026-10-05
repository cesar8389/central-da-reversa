import Link from "next/link";
import InstitutionalHero from "@/components/InstitutionalHero";
import { linkWhatsapp } from "@/lib/whatsapp";
import { site } from "@/site.config";
export const metadata = { title: "Contato" };
export default function Contato() {
  const assuntos = [
    { title: "Encontrei meu lote", text: "Envie o nome ou o código do palete para consultar disponibilidade e conversar sobre a compra.", message: "Olá! Tenho interesse em um palete do catálogo. Posso enviar o código?" },
    { title: "Quero entender os produtos", text: "Tire dúvidas sobre a condição, a lista de produtos e os valores apresentados no catálogo.", message: "Olá! Gostaria de tirar dúvidas sobre os produtos de um palete." },
    { title: "Preciso combinar a retirada", text: "Converse com a equipe para agendar sua visita ou combinar a retirada ou entrega do lote.", message: "Olá! Quero combinar uma visita, retirada ou entrega de um lote." },
  ];
  return <main>
    <InstitutionalHero label="Contato" title={<>Uma conversa.<br /><em>Novas oportunidades.</em></>} description="Encontrou um lote interessante? Quer entender melhor os produtos? Nossa equipe ajuda você a dar o próximo passo.">
      <div className="institutional-highlight"><span className="reversa-kicker">ATENDIMENTO DIRETO</span><span className="institutional-symbol" aria-hidden="true">↗</span><h2>Vamos conversar?</h2><p>Pedidos e confirmação de estoque pelo WhatsApp.</p><a className="contact-number" href={linkWhatsapp()} target="_blank" rel="noopener noreferrer">{site.whatsappExibicao}</a><a className="reversa-cta" href={linkWhatsapp("Olá! Quero saber mais sobre os paletes da Central da Reversa.")} target="_blank" rel="noopener noreferrer">Iniciar conversa ↗</a><small>{site.horario}</small></div>
    </InstitutionalHero>
    <section className="institutional-container institutional-section" aria-labelledby="atendimento-titulo"><div className="institutional-section-heading"><span className="reversa-kicker">CADA CONVERSA, UM PRÓXIMO PASSO</span><h2 id="atendimento-titulo">Como podemos ajudar?</h2></div><div className="institutional-cards">{assuntos.map((item,i) => <article key={item.title}><span className="institutional-index">0{i+1} / ATENDIMENTO</span><h3>{item.title}</h3><p>{item.text}</p><a href={linkWhatsapp(item.message)} target="_blank" rel="noopener noreferrer">Falar sobre isso ↗</a></article>)}</div><div className="institutional-note"><p>Ainda escolhendo? Veja fotos, produtos e valores dos lotes disponíveis.</p><Link href="/#catalogo">Explorar o catálogo →</Link></div></section>
  </main>;
}
