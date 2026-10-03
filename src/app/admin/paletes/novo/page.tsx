"use client";

import AdminGuard from "@/components/AdminGuard";
import PaleteForm from "@/components/PaleteForm";
import { site } from "@/site.config";

export default function Novo() {
  return (
    <AdminGuard>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Novo {site.item.singular}</h1>
        <PaleteForm />
      </main>
    </AdminGuard>
  );
}
