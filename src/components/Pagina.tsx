export default function Pagina({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">{titulo}</h1>
      <div className="space-y-4 leading-relaxed text-gray-700">{children}</div>
    </main>
  );
}
