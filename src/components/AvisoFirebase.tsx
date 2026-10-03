import { firebaseConfigurado } from "@/lib/firebase";

export default function AvisoFirebase() {
  if (firebaseConfigurado) return null;
  return (
    <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      O Firebase ainda não foi configurado. Copie <code>.env.example</code> para{" "}
      <code>.env.local</code>, preencha as chaves e reinicie (veja o README).
    </div>
  );
}
