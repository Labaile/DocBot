"use client";

import { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Building2, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

interface BillData {
  vendor: string;
  amount: string;
  dueDate: string;
}

interface DataRevealSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data: BillData;
  onConfirm: (finalData: BillData) => void;
}

export function DataRevealSheet({ isOpen, onClose, data, onConfirm }: DataRevealSheetProps) {
  const [formData, setFormData] = useState<BillData>(data);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(data);
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen, data]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div 
        className={`relative w-full max-w-md bg-deep-slate/90 backdrop-blur-2xl border-t border-white/10 rounded-t-[2.5rem] p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out transform ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Handle */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/10" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Extraction Results</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-electric-emerald/10 border border-electric-emerald/30">
                <ShieldCheck size={10} className="text-electric-emerald" />
                <span className="text-[8px] font-bold text-electric-emerald uppercase tracking-widest whitespace-nowrap">Image Purged</span>
              </div>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Verify and sync to calendar</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-white/40" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Vendor Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
              <Building2 size={12} className="text-electric-emerald" />
              Vendor Entity
            </label>
            <div className={`relative ${geistMono.className}`}>
              <input 
                type="text"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/5 focus:border-electric-emerald/50 focus:ring-1 focus:ring-electric-emerald/50 rounded-2xl px-5 py-4 text-white text-sm transition-all outline-none"
              />
            </div>
          </div>

          {/* Amount and Date Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="group">
               <label className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
                 <DollarSign size={12} className="text-electric-emerald" />
                 Total Due
               </label>
               <div className={`relative ${geistMono.className}`}>
                 <input 
                   type="text"
                   value={formData.amount}
                   onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                   className="w-full bg-white/[0.03] border border-white/5 focus:border-electric-emerald/50 focus:ring-1 focus:ring-electric-emerald/50 rounded-2xl px-5 py-4 text-white text-sm transition-all outline-none"
                 />
               </div>
             </div>

             <div className="group">
               <label className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
                 <Calendar size={12} className="text-electric-emerald" />
                 Due Date
               </label>
               <div className={`relative ${geistMono.className}`}>
                 <input 
                   type="text"
                   value={formData.dueDate}
                   onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                   className="w-full bg-white/[0.03] border border-white/5 focus:border-electric-emerald/50 focus:ring-1 focus:ring-electric-emerald/50 rounded-2xl px-5 py-4 text-white text-sm transition-all outline-none"
                 />
               </div>
             </div>
          </div>
        </div>

        <div className="mt-10 pb-4">
          <button 
            onClick={() => onConfirm(formData)}
            className="w-full group relative overflow-hidden h-16 rounded-2xl bg-electric-emerald text-deep-slate font-bold uppercase tracking-[0.2em] text-xs transition-transform active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-2">
              Confirm & Schedule
              <ChevronRight size={16} />
            </span>
          </button>
          
          <p className="text-[10px] text-center text-white/20 uppercase tracking-widest mt-6">
            Privacy: Image will be purged upon confirmation
          </p>
        </div>
      </div>
    </div>
  );
}
