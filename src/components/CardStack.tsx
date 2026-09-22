import { useCallback, useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart, Undo2, X } from "lucide-react";
import { SwipeCard, type SwipeCardHandle } from "./SwipeCard";
import type { GeneratedName } from "../types";

interface CardStackProps {
  queue: GeneratedName[];
  onDecision: (name: GeneratedName, direction: "left" | "right") => void;
  onUndo: () => void;
  canUndo: boolean;
}

export function CardStack({ queue, onDecision, onUndo, canUndo }: CardStackProps) {
  // Keyed by card id rather than a single shared ref: while a swiped-away
  // card is still finishing its exit animation under AnimatePresence, it
  // and the newly-promoted top card would otherwise both touch the same
  // ref during the same commit, and whichever detaches last wins — which
  // could silently null out the ref to the card the user can actually see.
  const cardRefs = useRef(new Map<string, SwipeCardHandle>());

  const visible = useMemo(() => queue.slice(0, 3), [queue]);

  const trigger = useCallback(
    (direction: "left" | "right") => {
      const topId = visible[0]?.id;
      if (!topId) return;
      cardRefs.current.get(topId)?.swipeOut(direction);
    },
    [visible],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight") trigger("right");
      else if (e.key === "ArrowLeft") trigger("left");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="relative h-[420px] w-full sm:h-[460px]">
        {visible.length === 0 && (
          <div className="flex h-full w-full items-center justify-center rounded-[2.5rem] border border-dashed border-white/15 text-sm text-slate-500">
            Warming up the algorithm…
          </div>
        )}
        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map((name, revIdx) => {
              const stackIndex = visible.length - 1 - revIdx;
              const isTop = stackIndex === 0;
              return (
                <SwipeCard
                  key={name.id}
                  ref={(handle) => {
                    if (handle) cardRefs.current.set(name.id, handle);
                    else cardRefs.current.delete(name.id);
                  }}
                  name={name}
                  isTop={isTop}
                  stackIndex={stackIndex}
                  onSwipe={(direction) => onDecision(name, direction)}
                />
              );
            })}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo"
          className="glass-pill flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => trigger("left")}
          aria-label="Skip"
          className="glass-pill flex h-16 w-16 items-center justify-center rounded-full !border-rose-400/40 text-rose-400 transition hover:bg-rose-400/15 active:scale-95"
        >
          <X size={26} />
        </button>
        <button
          type="button"
          onClick={() => trigger("right")}
          aria-label="Save"
          className="glass-pill flex h-16 w-16 items-center justify-center rounded-full !border-emerald-400/40 text-emerald-400 transition hover:bg-emerald-400/15 active:scale-95"
        >
          <Heart size={26} />
        </button>
        <div className="w-11" />
      </div>

      <p className="text-center text-xs text-slate-500">
        Swipe, click, or use <kbd className="glass-pill rounded px-1.5 py-0.5">←</kbd>{" "}
        <kbd className="glass-pill rounded px-1.5 py-0.5">→</kbd>
      </p>
    </div>
  );
}
