import Pagina from "@/components/Pagina";
import { site } from "@/site.config";

export const metadata = { title: "Política de privacidade" };

export default function Privacidade() {
  return (
    <Pagina titulo="Política de privacidade">
      <p>
        Este texto é um modelo inicial e deve ser revisado por um profissional antes da publicação.
      </p>
      <p>
        A {site.nome} coleta, ao criar uma conta, nome, e-mail, WhatsApp e, opcionalmente, empresa e cidade.
        Também registramos os {site.item.plural} em que você demonstra interesse. Usamos esses dados apenas para
        o atendimento comercial, conforme a LGPD (Lei 13.709/2018).
      </p>
      <p>
        Você pode pedir acesso, correção ou exclusão dos seus dados pelo WhatsApp {site.whatsappExibicao}.
      </p>
    </Pagina>
  );
}
