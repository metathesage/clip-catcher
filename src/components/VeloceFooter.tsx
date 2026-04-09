const VeloceFooter = () => (
  <footer className="relative z-10 px-5 md:px-12 py-8 border-t border-primary/[0.06] flex justify-between items-center max-sm:flex-col max-sm:gap-2.5">
    <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50 font-medium">
      © 2026 Jaguar Downloads
    </span>
    <div className="flex items-center gap-3">
      <div className="w-1 h-1 bg-gold-dim rotate-45 opacity-40" />
      <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50 font-medium">
        Personal use only
      </span>
      <div className="w-1 h-1 bg-gold-dim rotate-45 opacity-40" />
    </div>
  </footer>
);

export default VeloceFooter;
