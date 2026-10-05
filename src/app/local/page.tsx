import InstitutionalHero from "@/components/InstitutionalHero";
import { linkWhatsapp } from "@/lib/whatsapp";
import { site } from "@/site.config";
export const metadata = { title: "Local" };
export default function Local() {
  return <main>
    <InstitutionalHero label="Local" title={<>O próximo destino<br /><em>do seu lote.</em></>} description="Estamos em Sumaré, no interior de São Paulo. Combine sua visita com a equipe e venha conhecer novas possibilidades para o seu negócio.">
      <div className="institutional-highlight"><span className="reversa-kicker">PONTO DE ENCONTRO / SP</span><span className="institutional-symbol" aria-hidden="true">◎</span><h2>{site.cidadeUf}</h2><address>{site.endereco}</address><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="reversa-cta">Traçar minha rota ↗</a><small>Visitas e retiradas mediante agendamento.</small></div>
    </InstitutionalHero>
    <section className="institutional-container institutional-section location-details" aria-labelledby="visita-titulo"><div><span className="reversa-kicker">ANTES DE SAIR, COMBINE COM A GENTE</span><h2 id="visita-titulo">Sua visita começa<br />com uma conversa.</h2><p className="institutional-body">Confirme a disponibilidade do lote e agende o atendimento antes de se deslocar. Assim, você combina os detalhes da compra e da retirada diretamente com nossa equipe.</p><a href={linkWhatsapp("Olá! Quero agendar uma visita à Central da Reversa.")} target="_blank" rel="noopener noreferrer" className="reversa-cta">Agendar pelo WhatsApp ↗</a></div><div className="location-info"><div><span>01 / ENDEREÇO</span><p>{site.endereco}</p></div><div><span>02 / ATENDIMENTO</span><p>{site.horario}</p></div><div><span>03 / RETIRADA E ENTREGA</span><p>As condições são combinadas no fechamento da compra. Fale com a equipe para alinhar o próximo passo.</p></div></div></section>
  </main>;
}
