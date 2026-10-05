import Link from "next/link";
import InstitutionalHero from "@/components/InstitutionalHero";
import { linkWhatsapp } from "@/lib/whatsapp";
import { site } from "@/site.config";
export const metadata = { title: "Sobre" };
export default function Sobre() {
  return <main>
    <InstitutionalHero label="Sobre" title={<>Um novo ciclo.<br /><em>Um novo valor.</em></>} description="Conectamos paletes de logística reversa a lojistas e revendedores que enxergam novas possibilidades em cada lote.">
      <div className="institutional-highlight about-highlight"><span className="reversa-kicker">PRODUTOS EM MOVIMENTO</span><span className="institutional-symbol" aria-hidden="true">↻</span><h2>De volta ao mercado.<br />Em direção ao seu negócio.</h2><p>Logística reversa. Negociação direta. Novas possibilidades.</p></div>
    </InstitutionalHero>
    <section className="institutional-container institutional-section about-story" aria-labelledby="sobre-titulo"><div><span className="reversa-kicker">QUEM SOMOS</span><h2 id="sobre-titulo">Oportunidade é<br />enxergar o próximo giro.</h2></div><div>{site.sobre.map(text => <p className="institutional-body" key={text}>{text}</p>)}<p className="institutional-body">No catálogo, você consulta os lotes, conhece os produtos e compara o valor avaliado com o valor de venda. O atendimento comercial acontece pelo WhatsApp, com os detalhes da compra combinados diretamente com a equipe.</p><Link href="/#catalogo" className="reversa-text-link">Conheça os paletes disponíveis ↗</Link></div></section>
    <section className="about-process" aria-labelledby="processo-titulo"><div className="institutional-container"><div className="institutional-section-heading"><span className="reversa-kicker">DO PRIMEIRO CLIQUE AO PRÓXIMO GIRO</span><h2 id="processo-titulo">Como funciona.</h2></div><ol className="about-steps">{site.passos.map((text,i) => <li key={text}><span>0{i+1} <span aria-hidden="true">↗</span></span><p>{text}</p></li>)}</ol></div></section>
    <section className="reversa-contact"><div><span className="reversa-kicker">VAMOS MOVIMENTAR NOVAS POSSIBILIDADES</span><h2>O próximo giro<br />pode ser o seu.</h2></div><div><a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="reversa-cta">Conversar com a equipe ↗</a><p>{site.whatsappExibicao}<br />{site.horario}</p></div></section>
  </main>;
}
