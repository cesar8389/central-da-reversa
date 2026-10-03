"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEMO } from "./demo";
import { auth, db, firebaseConfigurado } from "./firebase";
import type { Perfil } from "./types";

interface Ctx {
  user: User | null;
  perfil: Perfil | null;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (d: Omit<Perfil, "papel"> & { senha: string }) => Promise<void>;
  sair: () => Promise<void>;
}

const AuthCtx = createContext<Ctx | null>(null);

// Na demonstração, a pessoa já entra como administradora (nada é salvo de verdade).
const demoUser = { uid: "demo", email: "demo@exemplo.com" } as User;
const demoPerfil: Perfil = {
  nome: "Administrador (demo)",
  email: "demo@exemplo.com",
  whatsapp: "(15) 99999-9999",
  empresa: "",
  cidade: "Sumaré",
  papel: "admin",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO ? demoUser : null);
  const [perfil, setPerfil] = useState<Perfil | null>(DEMO ? demoPerfil : null);
  const [carregando, setCarregando] = useState(firebaseConfigurado && !DEMO);

  useEffect(() => {
    if (!firebaseConfigurado || DEMO) return;
    return onAuthStateChanged(auth(), async (u) => {
      setUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(db(), "perfis", u.uid));
          setPerfil(snap.exists() ? (snap.data() as Perfil) : null);
        } catch {
          setPerfil(null);
        }
      } else {
        setPerfil(null);
      }
      setCarregando(false);
    });
  }, []);

  const entrar = useCallback(async (email: string, senha: string) => {
    if (DEMO) {
      setUser(demoUser);
      setPerfil(demoPerfil);
      return;
    }
    await signInWithEmailAndPassword(auth(), email, senha);
  }, []);

  const cadastrar = useCallback<Ctx["cadastrar"]>(async ({ senha, ...dados }) => {
    if (DEMO) {
      setUser({ uid: "demo-cliente", email: dados.email } as User);
      setPerfil({ ...dados, papel: "cliente" });
      return;
    }
    const cred = await createUserWithEmailAndPassword(auth(), dados.email, senha);
    const novo: Perfil = { ...dados, papel: "cliente" };
    await setDoc(doc(db(), "perfis", cred.user.uid), novo);
    setPerfil(novo);
  }, []);

  const sair = useCallback(async () => {
    if (DEMO) {
      setUser(null);
      setPerfil(null);
      return;
    }
    await signOut(auth());
  }, []);

  return (
    <AuthCtx.Provider value={{ user, perfil, carregando, entrar, cadastrar, sair }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth fora do AuthProvider");
  return c;
}

export function mensagemErroAuth(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  if (code.includes("email-already-in-use")) return "Este e-mail já tem cadastro. Use Entrar.";
  if (code.includes("weak-password")) return "A senha precisa ter pelo menos 6 caracteres.";
  if (code.includes("invalid-email")) return "E-mail inválido.";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "E-mail ou senha incorretos.";
  if (code.includes("too-many-requests")) return "Muitas tentativas. Aguarde um pouco e tente de novo.";
  return "Não foi possível concluir. Tente novamente.";
}
