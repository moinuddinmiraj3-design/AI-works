"use client";

import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { toast } from "@/components/ui/toaster";

export default function CheckEmailPage() {
  return (
    <AuthCard>
      <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600"><MailCheck className="size-5" /></span>
      <h1 className="mt-4 text-[24px] font-medium leading-tight tracking-[-0.02em]">Check your inbox</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">We sent a link to <span className="font-medium text-foreground">alex@northwind.com</span>. It expires in 30 minutes.</p>
      <div className="mt-6 rounded-xl bg-gray-25 p-3 text-xs text-gray-600 ring-1 ring-inset ring-black/[0.05]">Can&apos;t find it? Check spam, or make sure the address above is the one you use at work.</div>
      <div className="mt-5 flex flex-col gap-2">
        <Link href="/onboarding" className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ink-900 text-[13px] font-medium text-white hover:bg-ink-800">I&apos;ve verified my email</Link>
        <button type="button" data-toast="New link sent" onClick={() => toast("New link sent")} className="inline-flex h-11 w-full items-center justify-center rounded-full border border-black/[0.08] bg-white text-[13px] font-medium hover:bg-gray-25">Resend link</button>
      </div>
      <Link href="/login" className="mt-5 inline-flex w-full items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-foreground"><ArrowLeft className="size-3.5" />Back to sign in</Link>
    </AuthCard>
  );
}
