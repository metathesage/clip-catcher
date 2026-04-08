interface OptionTogglesProps {
  noWatermark: boolean;
  audioOnly: boolean;
  onToggleWm: () => void;
  onToggleAudio: () => void;
}

const OptionToggles = ({ noWatermark, audioOnly, onToggleWm, onToggleAudio }: OptionTogglesProps) => (
  <div className="flex gap-2.5 mb-7 flex-wrap justify-center">
    <button
      onClick={onToggleWm}
      className={`flex items-center gap-2 px-4 py-2 border rounded-sm font-body text-[9px] tracking-[0.28em] uppercase cursor-pointer transition-all duration-300
        ${noWatermark
          ? "border-primary text-primary bg-gold-glow"
          : "border-surface-4 text-muted-foreground bg-transparent hover:border-gold-dim hover:text-primary"
        }`}
      title="TikTok: download without watermark"
    >
      <span className="text-xs">✦</span> No Watermark
    </button>
    <button
      onClick={onToggleAudio}
      className={`flex items-center gap-2 px-4 py-2 border rounded-sm font-body text-[9px] tracking-[0.28em] uppercase cursor-pointer transition-all duration-300
        ${audioOnly
          ? "border-primary text-primary bg-gold-glow"
          : "border-surface-4 text-muted-foreground bg-transparent hover:border-gold-dim hover:text-primary"
        }`}
      title="Extract audio only (MP3/M4A)"
    >
      <span className="text-xs">♪</span> Audio Only
    </button>
  </div>
);

export default OptionToggles;
