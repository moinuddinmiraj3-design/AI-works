import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { GoogleMark } from "@/components/auth/google-mark";
import { AuthShowcase } from "@/components/auth/auth-showcase";

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Form */}
      <div className="flex flex-col px-6 py-6 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-10">
          <h1 className="text-[28px] font-medium leading-tight tracking-[-0.025em]">Sign in to Lasso</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Find, score and reach the right candidates in minutes.</p>

          <Link href="/onboarding" className="mt-7 inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-black/[0.08] bg-white text-[13px] font-medium shadow-xs transition-colors hover:bg-gray-25">
            <GoogleMark />Continue with Google
          </Link>
          <p className="mt-2 text-center text-[11px] text-gray-400">Also connects Gmail so outreach is sent from your own inbox.</p>

          <div className="my-6 flex items-center gap-3 text-[11px] text-gray-400">
            <span className="h-px flex-1 bg-black/[0.08]" />or sign in with email<span className="h-px flex-1 bg-black/[0.08]" />
          </div>

          <form className="space-y-3" action="/">
            <label className="block">
              <span className="text-xs text-gray-600">Work email</span>
              <input id="login-email" type="email" defaultValue="alex@northwind.com" className="mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-white px-3.5 text-[13px] outline-none focus:border-gray-300 focus:ring-4 focus:ring-black/[0.04]" />
            </label>
            <label className="block">
              <span className="flex items-baseline justify-between text-xs text-gray-600">Password<Link href="/forgot-password" className="text-[11px] text-gray-500 hover:text-foreground hover:underline">Forgot password?</Link></span>
              <input id="login-pass" type="password" defaultValue="lassodemo" className="mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-white px-3.5 text-[13px] outline-none focus:border-gray-300 focus:ring-4 focus:ring-black/[0.04]" />
            </label>
            <Link href="/" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-[13px] font-medium text-white hover:bg-ink-800">
              Sign in<ArrowRight className="size-4" />
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to Lasso? <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">Start a free 14-day trial</Link>
          </p>
        </div>
        <p className="text-[11px] text-gray-400">By continuing you agree to the Terms and Privacy Policy.</p>
      </div>

      <AuthShowcase />
    </div>
  );
}
