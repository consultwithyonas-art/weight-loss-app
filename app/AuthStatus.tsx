"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // check current session on load
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
      setLoaded(true);
    });
    // listen for login/logout changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setEmail(null);
  };

  if (!loaded) return null;

  if (email) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs hidden sm:inline" style={{ color: "#9FC4C8" }}>{email}</span>
        <button onClick={logout} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8", background: "rgba(255,255,255,0.08)" }}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8", background: "rgba(255,255,255,0.08)" }}>
      Sign in
    </Link>
  );
}