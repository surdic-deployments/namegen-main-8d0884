import { Heart, Layers, SlidersHorizontal, Zap } from "lucide-react";
import type { ViewMode } from "../types";

interface HeaderProps {
  savedCount: number;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onOpenSaved: () => void;
  onOpenControls: () => void;
}

export function Header({ savedCount, viewMode, onChangeViewMode, onOpenSaved, onOpenControls }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/[0.03] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="h-8 w-8 rounded-lg" />
          <div className="hidden sm:block">
            <span className="block text-lg font-bold leading-tight tracking-tight text-white">Namegen</span>
            <span className="block text-[11px] leading-tight text-slate-500">swipe your way to a name</span>
          </div>
        </div>

        <div className="glass-pill flex items-center gap-1 rounded-full p-1">
          <button
            type="button"
            onClick={() => onChangeViewMode("swipe")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              viewMode === "swipe" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers size={14} />
            Swipe
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode("turbo")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              viewMode === "turbo" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap size={14} />
            Turbo
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenControls}
            className="glass-pill flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-slate-200 transition hover:bg-white/15 lg:hidden"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Options</span>
          </button>
          <button
            type="button"
            onClick={onOpenSaved}
            className="glass-pill flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/15"
          >
            <Heart size={16} className="text-pink-400" />
            {savedCount}
          </button>
        </div>
      </div>
    </header>
  );
}
