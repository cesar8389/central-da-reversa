import Pagina from "@/components/Pagina";
import { linkWhatsapp } from "@/lib/whatsapp";
import { site } from "@/site.config";

export const metadata = { title: "Contato" };

export default function Contato() {
  return (
    <Pagina titulo="Contato">
      <p>Pedidos e confirmação de estoque são feitos pelo WhatsApp.</p>
      <p>
        <strong>{site.whatsappExibicao}</strong>
        <br />
        {site.horario}.
      </p>
      <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="btn btn-wpp">
        Chamar no WhatsApp
      </a>
    </Pagina>
  );
}
