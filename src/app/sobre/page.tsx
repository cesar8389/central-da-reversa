import Pagina from "@/components/Pagina";
import { site } from "@/site.config";

export const metadata = { title: "Sobre" };

export default function Sobre() {
  return (
    <Pagina titulo="Sobre">
      {site.sobre.map((t) => (
        <p key={t}>{t}</p>
      ))}
      <h2 className="pt-2 text-lg font-semibold text-ink">Como funciona</h2>
      <ol className="list-decimal space-y-1 pl-5">
        {site.passos.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
    </Pagina>
  );
}
