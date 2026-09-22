import { motion } from "framer-motion";
import { Heart, Plus, RefreshCw } from "lucide-react";
import type { GeneratedName } from "../types";
import { readabilityLabel } from "../generator/readability";
import { MODE_MAP } from "../data/modes";

interface TurboGridProps {
  batch: GeneratedName[];
  savedTexts: Set<string>;
  onToggleSave: (name: GeneratedName) => void;
  onLoadMore: () => void;
  onReroll: () => void;
}

export function TurboGrid({ batch, savedTexts, onToggleSave, onLoadMore, onReroll }: TurboGridProps) {
  return (
    <div className="w-full max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{batch.length} names — click to save</p>
        <button
          type="button"
          onClick={onReroll}
          className="glass-pill flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/15"
        >
          <RefreshCw size={13} /> New batch
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {batch.map((name) => {
          const saved = savedTexts.has(name.text.toLowerCase());
          return (
            <motion.button
              key={name.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => onToggleSave(name)}
              className={`glass group relative flex flex-col items-start gap-1 rounded-2xl p-4 text-left transition hover:-translate-y-0.5 ${
                saved ? "ring-2 ring-pink-400/70" : ""
              }`}
            >
              <Heart
                size={16}
                className={`absolute top-3 right-3 shrink-0 transition ${
                  saved ? "fill-pink-400 text-pink-400" : "text-white/25 group-hover:text-white/60"
                }`}
              />
              <span className="pr-5 text-lg font-bold break-all text-white">{name.text}</span>
              <span className="text-[11px] text-slate-400">
                {MODE_MAP[name.mode].label} · {readabilityLabel(name.readability)}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onLoadMore}
          className="glass-pill flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
        >
          <Plus size={15} /> Load more
        </button>
      </div>
    </div>
  );
}
