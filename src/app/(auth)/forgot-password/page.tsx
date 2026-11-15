import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { AuthCard, authInput, authPrimary } from "@/components/auth/auth-card";

export default function ForgotPasswordPage() {
  return (
    <AuthCard>
      <span className="grid size-11 place-items-center rounded-2xl bg-gray-50 text-gray-600"><KeyRound className="size-5" /></span>
      <h1 className="mt-4 text-[24px] font-medium leading-tight tracking-[-0.02em]">Reset your password</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">Enter the email you sign in with and we&apos;ll send you a reset link.</p>
      <label className="mt-6 block"><span className="text-xs text-gray-600">Work email</span><input id="fp-email" type="email" defaultValue="alex@northwind.com" className={authInput} /></label>
      <Link href="/check-email" className={`${authPrimary} mt-4`}>Send reset link</Link>
      <Link href="/login" className="mt-5 inline-flex w-full items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-foreground"><ArrowLeft className="size-3.5" />Back to sign in</Link>
    </AuthCard>
  );
}
