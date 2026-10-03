import Pagina from "@/components/Pagina";
import { site } from "@/site.config";

export const metadata = { title: "Termos de uso" };

export default function Termos() {
  return (
    <Pagina titulo="Termos de uso">
      <p>
        Este texto é um modelo inicial e deve ser revisado por um profissional antes da publicação.
      </p>
      <p>
        O catálogo da {site.nome} é informativo. Valores e disponibilidade podem mudar sem aviso e a compra só se
        confirma na negociação pelo WhatsApp. Os {site.item.plural} são vendidos no estado em que se encontram,
        conforme o valor avaliado e a condição informados em cada anúncio.
      </p>
    </Pagina>
  );
}
