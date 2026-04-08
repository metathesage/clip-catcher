const VeloceFooter = () => (
  <footer className="relative z-10 px-5 md:px-12 py-8 border-t border-primary/[0.06] flex justify-between items-center max-sm:flex-col max-sm:gap-2.5">
    <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/35">
      © 2026 Veloce
    </span>
    <div className="flex items-center gap-3">
      <div className="w-1 h-1 bg-gold-dim rotate-45 opacity-40" />
      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/35">
        Personal use only
      </span>
      <div className="w-1 h-1 bg-gold-dim rotate-45 opacity-40" />
    </div>
  </footer>
);

export default VeloceFooter;
