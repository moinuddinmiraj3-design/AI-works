import { Logo } from "@/components/brand/logo";

/** Centered card layout shared by the smaller auth screens. */
export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col px-6 py-6">
      <Logo />
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-[400px] rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_8px_24px_-12px_rgba(16,24,40,0.12)]">{children}</div>
      </div>
      <p className="text-center text-[11px] text-gray-400">Need help? support@lasso.app</p>
    </div>
  );
}

export const authInput = "mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-white px-3.5 text-[13px] outline-none focus:border-gray-300 focus:ring-4 focus:ring-black/[0.04]";
export const authPrimary = "fx-btn inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-[13px] font-medium text-white hover:bg-ink-800";
