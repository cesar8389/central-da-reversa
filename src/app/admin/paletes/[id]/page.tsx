import { demoPaletes, DEMO } from "@/lib/demo";
import EditarCliente from "./EditarCliente";

export function generateStaticParams() {
  return DEMO ? demoPaletes.map((p) => ({ id: p.id })) : [];
}

export default function Page() {
  return <EditarCliente />;
}
