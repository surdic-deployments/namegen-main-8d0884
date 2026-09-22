import type { ReactNode } from "react";
import { X } from "lucide-react";

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Overlay({ open, onClose, title, children, footer }: OverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-slide-in-right relative flex h-full w-full max-w-md flex-col border-l border-white/15 bg-slate-950/75 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass-pill rounded-full p-2 text-slate-400 transition hover:bg-white/15 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="border-t border-white/10 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}
