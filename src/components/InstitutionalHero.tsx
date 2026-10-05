import Link from "next/link";
import type { ReactNode } from "react";
export default function InstitutionalHero({ label, title, description, children }: { label: string; title: ReactNode; description: string; children: ReactNode }) {
  return <section className="institutional-hero"><div className="institutional-container"><div className="institutional-breadcrumb"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>{label}</span></div><div className="institutional-hero-grid"><div><span className="reversa-kicker">CENTRAL DA REVERSA / {label.toUpperCase()}</span><h1>{title}</h1><p className="institutional-lead">{description}</p></div>{children}</div></div></section>;
}
