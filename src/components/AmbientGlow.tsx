const AmbientGlow = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse,hsl(var(--gold)/0.05)_0%,transparent_68%)] animate-breathe" />
  </div>
);

export default AmbientGlow;
