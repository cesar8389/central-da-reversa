import { demoPaletes, DEMO } from "@/lib/demo";
import PaleteCliente from "./PaleteCliente";

// Na demonstração estática, as páginas são geradas a partir dos dados fictícios.
export function generateStaticParams() {
  return DEMO ? demoPaletes.map((p) => ({ slug: p.id })) : [];
}

export default function Page() {
  return <PaleteCliente />;
}
