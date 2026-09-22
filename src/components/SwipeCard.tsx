import { forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
import type { GeneratedName } from "../types";
import { readabilityLabel } from "../generator/readability";
import { PHONETIC_STYLES } from "../data/phoneticStyles";
import { MODE_MAP } from "../data/modes";

const SWIPE_THRESHOLD = 120;
const VELOCITY_THRESHOLD = 500;

export interface SwipeCardHandle {
  swipeOut: (direction: "left" | "right") => void;
}

interface SwipeCardProps {
  name: GeneratedName;
  isTop: boolean;
  stackIndex: number;
  onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>(function SwipeCard(
  { name, isTop, stackIndex, onSwipe },
  ref,
) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  function commitSwipe(direction: "left" | "right") {
    const target = direction === "right" ? 600 : -600;
    // Fire the fly-out animation and advance the queue in the same tick —
    // the next card should be interactive immediately, not after this
    // card's exit spring finishes settling (which can take a while).
    void animate(x, target, {
      type: "spring",
      stiffness: 300,
      damping: 26,
      velocity: direction === "right" ? 500 : -500,
    });
    onSwipe(direction);
  }

  useImperativeHandle(ref, () => ({ swipeOut: commitSwipe }));

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD) {
      commitSwipe("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD) {
      commitSwipe("left");
    }
  }

  const style = PHONETIC_STYLES[name.style];
  const scale = 1 - stackIndex * 0.04;
  const translateY = stackIndex * 14;

  return (
    <motion.div
      className="absolute inset-0 touch-none select-none"
      style={isTop ? { x, rotate } : undefined}
      initial={false}
      animate={isTop ? { scale: 1, y: 0 } : { scale, y: translateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={isTop ? handleDragEnd : undefined}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="glass relative flex h-full w-full flex-col items-center justify-center rounded-[2.5rem] p-8">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="glass-pill absolute left-6 top-6 -rotate-12 rounded-xl border-2 !border-emerald-400/70 px-3 py-1 text-2xl font-black uppercase tracking-wider text-emerald-300"
            >
              Save
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="glass-pill absolute right-6 top-6 rotate-12 rounded-xl border-2 !border-rose-400/70 px-3 py-1 text-2xl font-black uppercase tracking-wider text-rose-300"
            >
              Skip
            </motion.div>
          </>
        )}

        {isTop && (
          <>
            <span className="break-all text-center text-5xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-6xl">
              {name.text}
            </span>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="glass-pill rounded-full px-3 py-1 font-medium text-white/80">{MODE_MAP[name.mode].label}</span>
              {name.mode === "phonetic" && (
                <span className="glass-pill rounded-full px-3 py-1 font-medium text-white/80">{style.label}</span>
              )}
              <span className="glass-pill rounded-full px-3 py-1 font-medium text-white/80">
                {readabilityLabel(name.readability)}
              </span>
            </div>

            {name.sources && name.sources.length > 0 && (
              <p className="mt-3 text-center text-xs text-white/40">from {name.sources.join(" + ")}</p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
});
