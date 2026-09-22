import { useState } from "react";
import { Check, Copy, Download, Trash2 } from "lucide-react";
import { Overlay } from "./Overlay";
import type { SavedName } from "../types";
import { readabilityLabel } from "../generator/readability";
import { PHONETIC_STYLES } from "../data/phoneticStyles";
import { MODE_MAP } from "../data/modes";

interface SavedDrawerProps {
  open: boolean;
  names: SavedName[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function SavedDrawer({ open, names, onClose, onRemove, onClear }: SavedDrawerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  function copyText(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
    });
  }

  function copyAll() {
    copyText("__all__", names.map((n) => n.text).join("\n"));
  }

  function exportFile() {
    const lines = names.map((n) => `${n.text}\t${n.mode}${n.mode === "phonetic" ? `/${n.style}` : ""}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "namegen-saved.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    if (confirmClear) {
      onClear();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }

  return (
    <Overlay
      open={open}
      onClose={onClose}
      title={`Saved names (${names.length})`}
      footer={
        names.length > 0 ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyAll}
              className="glass-pill flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-slate-300 transition hover:bg-white/15"
            >
              {copiedId === "__all__" ? <Check size={14} /> : <Copy size={14} />}
              Copy all
            </button>
            <button
              type="button"
              onClick={exportFile}
              className="glass-pill flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-slate-300 transition hover:bg-white/15"
            >
              <Download size={14} />
              Export .txt
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`glass-pill flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition ${
                confirmClear ? "!border-rose-400/60 !bg-rose-500/15 text-rose-300" : "text-slate-300 hover:bg-white/15"
              }`}
            >
              <Trash2 size={14} />
              {confirmClear ? "Confirm?" : "Clear all"}
            </button>
          </div>
        ) : undefined
      }
    >
      {names.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center text-sm text-slate-500">
          <p>No saved names yet.</p>
          <p>Swipe right (or hit ♥) on the ones you like.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {names.map((n) => (
            <li key={n.id} className="glass-pill flex items-center justify-between gap-3 rounded-xl px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">{n.text}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {n.mode === "phonetic" ? PHONETIC_STYLES[n.style].label : MODE_MAP[n.mode].label} ·{" "}
                  {readabilityLabel(n.readability)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => copyText(n.id, n.text)}
                  aria-label="Copy"
                  className="rounded-full p-2 text-slate-400 transition hover:bg-white/15 hover:text-white"
                >
                  {copiedId === n.id ? <Check size={15} /> : <Copy size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(n.id)}
                  aria-label="Remove"
                  className="rounded-full p-2 text-slate-400 transition hover:bg-rose-500/20 hover:text-rose-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Overlay>
  );
}
