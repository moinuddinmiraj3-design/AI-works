import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { GoogleMark } from "@/components/auth/google-mark";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { authInput, authPrimary } from "@/components/auth/auth-card";

export default function SignupPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="flex flex-col px-6 py-6 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-10">
          <h1 className="text-[28px] font-medium leading-tight tracking-[-0.025em]">Start your free trial</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">14 days of the Starter plan. No card needed.</p>
          <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
            {["25 AI searches a month", "Find emails for your shortlist", "Sequences sent from your Gmail"].map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="size-3.5 text-gray-400" strokeWidth={2.5} />{f}</li>
            ))}
          </ul>
          <Link href="/onboarding" className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-black/[0.08] bg-white text-[13px] font-medium shadow-xs hover:bg-gray-25">
            <GoogleMark />Sign up with Google
          </Link>
          <div className="my-5 flex items-center gap-3 text-[11px] text-gray-400"><span className="h-px flex-1 bg-black/[0.08]" />or<span className="h-px flex-1 bg-black/[0.08]" /></div>
          <div className="space-y-3">
            <label className="block"><span className="text-xs text-gray-600">Full name</span><input id="su-name" placeholder="Alex Morgan" className={authInput} /></label>
            <label className="block"><span className="text-xs text-gray-600">Work email</span><input id="su-email" type="email" placeholder="you@company.com" className={authInput} /></label>
            <label className="block"><span className="text-xs text-gray-600">Password</span><input id="su-pass" type="password" placeholder="At least 8 characters" className={authInput} /></label>
            <Link href="/check-email" className={authPrimary}>Create account<ArrowRight className="size-4" /></Link>
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">Already have an account? <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Sign in</Link></p>
        </div>
        <p className="text-[11px] text-gray-400">By continuing you agree to the Terms and Privacy Policy.</p>
      </div>
      <AuthShowcase />
    </div>
  );
}
