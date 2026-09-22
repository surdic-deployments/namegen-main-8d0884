import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { CardStack } from "./components/CardStack";
import { TurboGrid } from "./components/TurboGrid";
import { ControlsPanel } from "./components/ControlsPanel";
import { SavedDrawer } from "./components/SavedDrawer";
import { Overlay } from "./components/Overlay";
import { AmbientBackground } from "./components/AmbientBackground";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNameGenerator } from "./hooks/useNameGenerator";
import type { GeneratedName, SavedName, ViewMode } from "./types";

const TURBO_BATCH_SIZE = 24;

export default function App() {
  const [savedNames, setSavedNames] = useLocalStorage<SavedName[]>("namegen:saved", []);
  const savedTextSet = useMemo(() => new Set(savedNames.map((n) => n.text.toLowerCase())), [savedNames]);

  const { settings, updateSettings, queue, advance, restoreToFront, generateBatch, themeStatus, themeWordCount } =
    useNameGenerator(savedTextSet);

  const [viewMode, setViewMode] = useLocalStorage<ViewMode>("namegen:viewMode", "swipe");
  const [turboBatch, setTurboBatch] = useState<GeneratedName[]>([]);
  const [isControlsOpen, setControlsOpen] = useState(false);
  const [isSavedOpen, setSavedOpen] = useState(false);
  const [lastAction, setLastAction] = useState<{ card: GeneratedName; wasSaved: boolean } | null>(null);

  useEffect(() => {
    if (viewMode === "turbo") {
      setTurboBatch(generateBatch(TURBO_BATCH_SIZE));
    }
  }, [viewMode, generateBatch]);

  const handleDecision = useCallback(
    (card: GeneratedName, direction: "left" | "right") => {
      if (direction === "right") {
        setSavedNames((prev) => [{ ...card, savedAt: Date.now() }, ...prev]);
      }
      setLastAction({ card, wasSaved: direction === "right" });
      advance();
    },
    [advance, setSavedNames],
  );

  const handleUndo = useCallback(() => {
    if (!lastAction) return;
    if (lastAction.wasSaved) {
      setSavedNames((prev) => prev.filter((n) => n.id !== lastAction.card.id));
    }
    restoreToFront(lastAction.card);
    setLastAction(null);
  }, [lastAction, restoreToFront, setSavedNames]);

  const handleToggleSaveTurbo = useCallback(
    (card: GeneratedName) => {
      const key = card.text.toLowerCase();
      setSavedNames((prev) =>
        prev.some((n) => n.text.toLowerCase() === key)
          ? prev.filter((n) => n.text.toLowerCase() !== key)
          : [{ ...card, savedAt: Date.now() }, ...prev],
      );
    },
    [setSavedNames],
  );

  const handleTurboLoadMore = useCallback(() => {
    setTurboBatch((prev) => [...prev, ...generateBatch(TURBO_BATCH_SIZE)]);
  }, [generateBatch]);

  const handleTurboReroll = useCallback(() => {
    setTurboBatch(generateBatch(TURBO_BATCH_SIZE));
  }, [generateBatch]);

  const handleRemoveSaved = useCallback((id: string) => setSavedNames((prev) => prev.filter((n) => n.id !== id)), [setSavedNames]);
  const handleClearSaved = useCallback(() => setSavedNames([]), [setSavedNames]);

  return (
    <div className="min-h-screen text-slate-100">
      <AmbientBackground />

      <Header
        savedCount={savedNames.length}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onOpenSaved={() => {
          setSavedOpen(true);
          setControlsOpen(false);
        }}
        onOpenControls={() => {
          setControlsOpen(true);
          setSavedOpen(false);
        }}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start lg:justify-center">
        <aside className="hidden lg:block lg:w-80 lg:shrink-0">
          <ControlsPanel settings={settings} onChange={updateSettings} themeStatus={themeStatus} themeWordCount={themeWordCount} />
        </aside>

        <section className="flex flex-1 flex-col items-center">
          {viewMode === "swipe" ? (
            <CardStack queue={queue} onDecision={handleDecision} onUndo={handleUndo} canUndo={lastAction !== null} />
          ) : (
            <TurboGrid
              batch={turboBatch}
              savedTexts={savedTextSet}
              onToggleSave={handleToggleSaveTurbo}
              onLoadMore={handleTurboLoadMore}
              onReroll={handleTurboReroll}
            />
          )}
        </section>
      </main>

      <Overlay open={isControlsOpen} onClose={() => setControlsOpen(false)} title="Generator options">
        <ControlsPanel settings={settings} onChange={updateSettings} themeStatus={themeStatus} themeWordCount={themeWordCount} />
      </Overlay>

      <SavedDrawer open={isSavedOpen} names={savedNames} onClose={() => setSavedOpen(false)} onRemove={handleRemoveSaved} onClear={handleClearSaved} />
    </div>
  );
}
