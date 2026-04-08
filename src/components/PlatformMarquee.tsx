import { PLATFORMS } from "@/lib/veloce";

const PlatformMarquee = () => (
  <div className="marquee-mask w-full max-w-[760px] overflow-hidden mb-9">
    <div className="flex items-center gap-2.5 whitespace-nowrap animate-marquee">
      {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
        <span key={i}>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{p}</span>
          {i < PLATFORMS.length * 2 - 1 && (
            <span className="text-primary/50 text-[8px] ml-2.5">·</span>
          )}
        </span>
      ))}
    </div>
  </div>
);

export default PlatformMarquee;
