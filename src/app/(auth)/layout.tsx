import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas">
      {children}
      <Toaster />
    </div>
  );
}
