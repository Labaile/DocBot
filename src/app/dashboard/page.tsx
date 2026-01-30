import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ViewfinderHUD } from "@/components/camera/viewfinder-hud";
import { SignOut } from "@/components/auth-components";
import { Camera, FileUp, Settings } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-deep-slate text-white font-sans">
      {/* Dashboard Nav */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-electric-emerald/10 border border-electric-emerald/30 flex items-center justify-center">
            <span className="text-electric-emerald text-xs font-bold">DB</span>
          </div>
          <span className="text-sm font-semibold tracking-tight uppercase">Terminal</span>
        </div>
        <SignOut />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        {/* Core Vision Area */}
        <div className="relative w-full max-w-md">
          <ViewfinderHUD />
          
          {/* Capture Trigger Overlay (Simulated) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
             <button className="h-20 w-20 rounded-full border-4 border-white/10 p-1 bg-black/60 active:scale-90 transition-transform">
               <div className="h-full w-full rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
             </button>
          </div>
        </div>

      {/* Dashboard Actions */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-12 pb-12">
        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
          <div className="p-3 rounded-2xl bg-electric-emerald/10 text-electric-emerald group-hover:scale-110 transition-transform">
            <Camera size={24} />
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-white/60">Capture</span>
        </button>

        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
          <div className="p-3 rounded-2xl bg-white/10 text-white group-hover:scale-110 transition-transform">
            <FileUp size={24} />
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-white/60">Upload</span>
        </button>
      </div>
    </main>
  </div>
);
}
