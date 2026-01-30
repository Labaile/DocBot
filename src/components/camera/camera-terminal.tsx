"use client";

import { useEffect, useState, useRef } from "react";
import { useCamera } from "@/hooks/use-camera";
import { ViewfinderHUD } from "./viewfinder-hud";
import { Camera, FileUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function CameraTerminal() {
  const { 
    videoRef, 
    canvasRef, 
    isReady, 
    error, 
    startStream, 
    stopStream, 
    captureFrame 
  } = useCamera();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"searching" | "locked" | "capturing" | "processing">("searching");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startStream();
    return () => stopStream();
  }, [startStream, stopStream]);

  const processIngestion = async (blob: Blob) => {
    setIsProcessing(true);
    setStatus("processing");
    
    const formData = new FormData();
    formData.append("image", blob, "capture.jpg");

    try {
      const response = await fetch("/api/extractions", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Analysis Complete", {
          description: `Detected: ${result.data.vendor} - ${result.data.amount}`,
          icon: <CheckCircle2 className="text-electric-emerald" />
        });
        console.log("Extraction Results:", result.data);
      } else {
        throw new Error(result.error?.message || "Extraction failed");
      }
    } catch (err) {
      console.error("Ingestion Error:", err);
      toast.error("Analysis Failed", {
        description: err instanceof Error ? err.message : "An unexpected error occurred."
      });
    } finally {
      setIsProcessing(false);
      setStatus("searching");
    }
  };

  const handleCapture = async () => {
    setStatus("capturing");
    const imageBlob = await captureFrame();
    
    if (imageBlob) {
      processIngestion(imageBlob);
    } else {
      toast.error("Capture Failed", {
        description: "Please ensure camera permissions are granted."
      });
      setStatus("searching");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid File Type", {
          description: "Please select an image file (JPG, PNG)."
        });
        return;
      }
      processIngestion(file as Blob);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-6 p-8 rounded-[2.5rem] bg-white/[0.03] border border-red-500/20 backdrop-blur-md">
        <AlertCircle size={48} className="text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Access Denied</h3>
          <p className="text-sm text-white/40 mt-2">{error}</p>
        </div>
        <button 
          onClick={() => startStream()}
          className="h-12 px-8 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-bold uppercase tracking-widest"
        >
          Retry Permission
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      <div className="relative w-full group">
        <ViewfinderHUD status={status} videoRef={videoRef} />
        <canvas ref={canvasRef} className="hidden" />
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {/* Capture Trigger */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
           <button 
             onClick={handleCapture}
             disabled={!isReady || isProcessing}
             className={`h-24 w-24 rounded-full border-[6px] border-white/5 p-1 bg-black/40 backdrop-blur-md active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${isProcessing ? 'animate-pulse' : ''}`}
           >
             <div className="h-full w-full rounded-full bg-gradient-to-br from-white to-white/80 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center">
               <div className={`w-8 h-8 rounded-full border-2 border-deep-slate/20 transition-all ${isProcessing ? 'scale-150 opacity-0' : ''}`} />
             </div>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-16 pb-12">
        <button 
          onClick={() => setStatus(s => s === "locked" ? "searching" : "locked")}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group backdrop-blur-sm"
        >
          <div className={`p-4 rounded-2xl transition-all ${status === "locked" ? "bg-electric-emerald/20 text-electric-emerald scale-110" : "bg-white/5 text-white/60"}`}>
            <Camera size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{status === "locked" ? "Unlock" : "Lock Lens"}</span>
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group backdrop-blur-sm disabled:opacity-50"
        >
          <div className="p-4 rounded-2xl bg-white/5 text-white/60 group-hover:scale-110 transition-transform">
            <FileUp size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Import Docs</span>
        </button>
      </div>
    </div>
  );
}
