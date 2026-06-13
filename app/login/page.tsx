"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const sendLink = async () => {
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Sign in</div>
            </div>
          </Link>
        </div>
      </header>

      <section className="max-w-md mx-auto px-5 py-12 sm:py-20 rise">
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)" }}>
          Save your progress.
        </h1>
        <p className="mb-8" style={{ color: "var(--muted)" }}>
          Enter your email and we&apos;ll send you a magic link — no password needed. Click it, and you&apos;re in. Your favourites and meal plans will follow you across devices.
        </p>

        {status === "sent" ? (
          <div className="rounded-2xl p-6 text-center" style={{ background: "#E8F3EC" }}>
            <div className="text-4xl mb-3">📬</div>
            <div className="font-bold mb-1" style={{ color: "#2f6b46" }}>Check your email</div>
            <p className="text-sm" style={{ color: "#2f6b46" }}>
              We sent a magic link to <b>{email}</b>. Click it to sign in. (It may take a minute, and check your spam folder just in case.)
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "var(--hair)" }}>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendLink()}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border bg-white mb-4"
              style={{ borderColor: "var(--hair)" }}
            />
            {status === "error" && (
              <p className="text-sm mb-3" style={{ color: "var(--coral)" }}>{errorMsg}</p>
            )}
            <button
              onClick={sendLink}
              disabled={status === "sending"}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: status === "sending" ? "#AFC9CD" : "var(--teal)" }}
            >
              {status === "sending" ? "Sending…" : "Send me a magic link →"}
            </button>
          </div>
        )}

        <p className="text-xs mt-6" style={{ color: "var(--muted)" }}>
          We only use your email to sign you in. No spam, and we don&apos;t sell your data.
        </p>

        <div className="mt-8">
          <Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link>
        </div>
      </section>
    </main>
  );
}