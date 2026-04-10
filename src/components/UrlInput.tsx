import { detectPlatform } from "@/lib/veloce";

interface UrlInputProps {
  value: string;
  onChange: (val: string) => void;
  onFetch: () => void;
  disabled: boolean;
}

const UrlInput = ({ value, onChange, onFetch, disabled }: UrlInputProps) => {
  const platform = detectPlatform(value);
  const hint = platform
    ? `Detected: ${platform} — press Fetch`
    : "Paste any video link to begin";

  const doPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text.trim());
    } catch {
      // clipboard denied
    }
  };

  return (
    <div className="w-full max-w-[740px]">
      <div className="flex items-center bg-surface-1 border border-surface-4 rounded-sm overflow-hidden transition-all duration-300 focus-within:border-gold-dim focus-within:shadow-[0_0_0_1px_hsl(var(--gold-dim)),0_10px_50px_rgba(0,0,0,0.6)]">
        <span className="px-4 text-muted-foreground flex items-center flex-shrink-0">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        </span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onFetch()}
          placeholder="Paste your video link here…"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none text-foreground font-body text-[15px] font-light tracking-wide py-5 caret-primary placeholder:text-muted-foreground/40 placeholder:italic placeholder:font-display placeholder:text-base"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="flex-shrink-0 px-3 text-muted-foreground/50 hover:text-foreground transition-colors duration-200 text-lg"
            title="Clear"
          >
            ×
          </button>
        )}
        <button
          onClick={doPaste}
          className="flex-shrink-0 px-4 h-[62px] bg-transparent border-none border-l border-surface-4 text-muted-foreground font-body text-[10px] font-medium tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 hover:text-primary hover:bg-gold-glow whitespace-nowrap"
          style={{ borderLeft: "1px solid hsl(var(--surface-4))" }}
        >
          Paste
        </button>
        <button
          onClick={onFetch}
          disabled={disabled}
          className="flex-shrink-0 px-8 h-[62px] bg-primary border-none text-primary-foreground font-body text-[11px] font-semibold tracking-[0.3em] uppercase cursor-pointer transition-all duration-200 relative overflow-hidden disabled:bg-surface-4 disabled:text-muted-foreground disabled:cursor-not-allowed hover:brightness-110"
        >
          Fetch
        </button>
      </div>
      <p className="mt-2.5 text-xs tracking-wider text-muted-foreground/50 text-left font-medium">
        {hint}
      </p>
    </div>
  );
};

export default UrlInput;