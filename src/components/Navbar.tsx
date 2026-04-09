import jaguarLogo from "@/assets/jaguar-logo.png";

interface NavbarProps {
  status: string;
  onOpenHistory: () => void;
}

const Navbar = ({ status, onOpenHistory }: NavbarProps) => (
  <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 md:px-12 py-4 bg-background/80 border-b border-primary/[0.07] backdrop-blur-xl">
    <a href="#" className="flex items-center gap-3 no-underline">
      <img src={jaguarLogo} alt="Jaguar" width={36} height={36} className="object-contain" />
      <span className="font-display font-normal text-xl tracking-[0.22em] uppercase text-foreground">
        Jaguar<span className="text-primary font-light ml-1">Downloads</span>
      </span>
    </a>
    <div className="flex items-center gap-3">
      <button
        onClick={onOpenHistory}
        className="bg-transparent border border-surface-4 rounded-sm text-muted-foreground font-body text-[10px] font-medium tracking-[0.25em] uppercase px-4 py-2 cursor-pointer transition-all duration-300 hover:border-gold-dim hover:text-primary"
      >
        History
      </button>
      <div className="w-[6px] h-[6px] bg-primary rounded-full animate-pulse" />
      <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground font-medium">
        {status}
      </span>
    </div>
  </nav>
);

export default Navbar;
