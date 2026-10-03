import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { DEMO, demoPaletes, demoProdutos } from "./demo";
import type { Interesse, Palete, Produto } from "./types";

// Armazenamento em memória usado só no modo demonstração (some ao recarregar).
const mem = {
  paletes: DEMO ? [...demoPaletes] : ([] as Palete[]),
  produtos: new Map<string, Produto[]>(),
  interesses: [] as Interesse[],
};

const col = () => collection(db(), "paletes");

export async function listarPaletes(): Promise<Palete[]> {
  if (DEMO) return [...mem.paletes].sort((a, b) => b.criadoEm - a.criadoEm);
  const snap = await getDocs(query(col(), orderBy("criadoEm", "desc")));
  return snap.docs.map((d) => ({ ...(d.data() as Omit<Palete, "id">), id: d.id }));
}

export async function obterPalete(id: string): Promise<Palete | null> {
  if (DEMO) return mem.paletes.find((x) => x.id === id) ?? null;
  const snap = await getDoc(doc(col(), id));
  return snap.exists() ? { ...(snap.data() as Omit<Palete, "id">), id: snap.id } : null;
}

export async function salvarPalete(p: Palete) {
  if (DEMO) {
    mem.paletes = [...mem.paletes.filter((x) => x.id !== p.id), p];
    return;
  }
  const { id, ...dados } = p;
  await setDoc(doc(col(), id), dados);
}

export async function listarProdutos(id: string): Promise<Produto[]> {
  if (DEMO) return mem.produtos.get(id) ?? demoProdutos(id);
  const snap = await getDocs(collection(db(), "paletes", id, "produtos"));
  return snap.docs.map((d) => ({ ...(d.data() as Omit<Produto, "id">), id: d.id }));
}

async function apagarProdutos(id: string) {
  const snap = await getDocs(collection(db(), "paletes", id, "produtos"));
  for (let i = 0; i < snap.docs.length; i += 400) {
    const batch = writeBatch(db());
    snap.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}

/** Substitui toda a lista de produtos do palete. */
export async function substituirProdutos(id: string, produtos: Omit<Produto, "id">[]) {
  if (DEMO) {
    mem.produtos.set(id, produtos.map((x, i) => ({ ...x, id: `${id}-${i}` })));
    return;
  }
  await apagarProdutos(id);
  const base = collection(db(), "paletes", id, "produtos");
  for (let i = 0; i < produtos.length; i += 400) {
    const batch = writeBatch(db());
    produtos.slice(i, i + 400).forEach((p) => batch.set(doc(base), p));
    await batch.commit();
  }
}

export async function excluirPalete(p: Palete) {
  if (DEMO) {
    mem.paletes = mem.paletes.filter((x) => x.id !== p.id);
    return;
  }
  await apagarProdutos(p.id);
  await Promise.all(
    p.fotos
      .filter((f) => f.path)
      .map((f) => deleteObject(ref(storage(), f.path!)).catch(() => undefined)),
  );
  await deleteDoc(doc(col(), p.id));
}

export async function enviarFoto(paleteId: string, arquivo: File) {
  if (DEMO) {
    const url = await new Promise<string>((ok) => {
      const r = new FileReader();
      r.onload = () => ok(String(r.result));
      r.readAsDataURL(arquivo);
    });
    return { url, path: undefined };
  }
  const nomeSeguro = arquivo.name.replace(/[^\w.-]+/g, "_");
  const path = `paletes/${paleteId}/${Date.now()}-${nomeSeguro}`;
  const r = ref(storage(), path);
  await uploadBytes(r, arquivo);
  return { url: await getDownloadURL(r), path };
}

export async function removerArquivo(path: string) {
  if (DEMO) return;
  await deleteObject(ref(storage(), path)).catch(() => undefined);
}

export async function registrarInteresse(i: Omit<Interesse, "id">) {
  if (DEMO) {
    mem.interesses = [{ ...i, id: String(mem.interesses.length + 1) }, ...mem.interesses];
    return;
  }
  await addDoc(collection(db(), "interesses"), i);
}

export async function listarInteresses(): Promise<Interesse[]> {
  if (DEMO) return mem.interesses;
  const snap = await getDocs(query(collection(db(), "interesses"), orderBy("criadoEm", "desc")));
  return snap.docs.map((d) => ({ ...(d.data() as Omit<Interesse, "id">), id: d.id }));
}

export async function apagarInteresse(id: string) {
  if (DEMO) {
    mem.interesses = mem.interesses.filter((x) => x.id !== id);
    return;
  }
  await deleteDoc(doc(db(), "interesses", id));
}

/** Lê CSV simples (separador ; ou ,): descricao;codigo;quantidade;valor */
export function parseProdutosCsv(texto: string): Omit<Produto, "id">[] {
  const linhas = texto.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!linhas.length) return [];
  const sep = linhas[0].includes(";") ? ";" : ",";
  const num = (s: string) => {
    const n = Number((s ?? "").replace(/\./g, "").replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };
  const cabecalho = /descri|produto|nome/i.test(linhas[0]) && !/\d{6,}/.test(linhas[0]);
  return linhas.slice(cabecalho ? 1 : 0).map((l) => {
    const c = l.split(sep).map((x) => x.trim().replace(/^"|"$/g, ""));
    return {
      descricao: c[0] ?? "",
      codigo: c[1] ?? "",
      quantidade: Math.max(1, Math.round(num(c[2] ?? "1")) || 1),
      valorUnitario: Math.round(num(c[3] ?? "0") * 100),
    };
  });
}
