interface NavbarProps {
  status: string;
  onOpenHistory: () => void;
}

const Navbar = ({ status, onOpenHistory }: NavbarProps) => (
  <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 md:px-12 py-5 bg-background/80 border-b border-primary/[0.07] backdrop-blur-xl">
    <a href="#" className="font-display font-light text-xl tracking-[0.38em] uppercase text-foreground no-underline">
      Velo<span className="text-primary font-light">ce</span>
    </a>
    <div className="flex items-center gap-3">
      <button
        onClick={onOpenHistory}
        className="bg-transparent border border-surface-4 rounded-sm text-muted-foreground font-body text-[9px] tracking-[0.3em] uppercase px-3.5 py-1.5 cursor-pointer transition-all duration-300 hover:border-gold-dim hover:text-primary"
      >
        History
      </button>
      <div className="w-[5px] h-[5px] bg-primary rounded-full animate-pulse" />
      <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
        {status}
      </span>
    </div>
  </nav>
);

export default Navbar;
