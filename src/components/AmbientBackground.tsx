export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-blob animate-float-a absolute -top-32 -left-32 h-[520px] w-[520px] bg-violet-600" />
      <div className="ambient-blob animate-float-b absolute top-1/4 -right-40 h-[480px] w-[480px] bg-pink-600" />
      <div className="ambient-blob animate-float-c absolute -bottom-40 left-1/4 h-[460px] w-[460px] bg-emerald-500" />
    </div>
  );
}
