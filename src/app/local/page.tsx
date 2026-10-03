import Pagina from "@/components/Pagina";
import { site } from "@/site.config";

export const metadata = { title: "Local" };

export default function Local() {
  return (
    <Pagina titulo="Local">
      <p>{site.endereco}</p>
      <p>Atendimento: {site.horario}.</p>
      <p>Visitas e retiradas dependem de agendamento prévio pelo WhatsApp.</p>
      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Abrir no Google Maps
      </a>
    </Pagina>
  );
}
