export function HareMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_16px_40px_rgba(16,16,16,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.94),_rgba(255,255,255,0.75)_42%,_transparent_68%)]" />
      <div className="absolute left-[14px] top-[7px] h-5 w-[6px] rotate-[-12deg] rounded-full bg-black" />
      <div className="absolute right-[14px] top-[5px] h-6 w-[6px] rotate-[14deg] rounded-full bg-black" />
      <div className="relative h-6 w-6 rounded-full border-[5px] border-black" />
      <div className="absolute bottom-[11px] h-1.5 w-4 rounded-full bg-black" />
    </div>
  );
}