import { useState } from "react";
import { motion } from "framer-motion";
import { VideoInfo, QualityOption, formatDuration, formatNumber, detectPlatform } from "@/lib/veloce";
import { toast } from "sonner";

interface ResultCardProps {
  info: VideoInfo;
  sourceUrl: string;
}

const ResultCard = ({ info, sourceUrl }: ResultCardProps) => {
  const [selectedQuality, setSelectedQuality] = useState<QualityOption | null>(
    info.qualities?.[0] || null
  );
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const platform =
    info.platform
      ? info.platform.charAt(0).toUpperCase() + info.platform.slice(1)
      : detectPlatform(sourceUrl) || "Video";

  const startDownload = async () => {
    if (!selectedQuality?.url) {
      toast.error("No quality selected");
      return;
    }
    const dlUrl = selectedQuality.url;
    if (dlUrl.includes(".m3u8")) {
      window.open(dlUrl, "_blank", "noopener");
      toast.success("HLS stream opened — use VLC or mpv to download");
      return;
    }
    toast("Preparing download…");
    try {
      const r = await fetch(dlUrl, { mode: "cors" });
      if (!r.ok) throw new Error("fetch failed");
      const blob = await r.blob();
      const ext = dlUrl.match(/\.([a-z0-9]{2,4})(\?|$)/i);
      const fname =
        (info.title || "video").slice(0, 60).replace(/[^a-z0-9]+/gi, "-") +
        "." +
        (ext ? ext[1] : "mp4");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1000);
      toast.success("Download started ↓");
    } catch {
      window.open(dlUrl, "_blank", "noopener");
      toast.success("Opened in new tab — right-click → Save As");
    }
  };

  const copyDlUrl = () => {
    if (!selectedQuality?.url) return;
    navigator.clipboard.writeText(selectedQuality.url).then(() => toast.success("URL copied"));
  };

  const copySource = () => {
    navigator.clipboard.writeText(sourceUrl).then(() => toast.success("Link copied"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[740px] bg-surface-1 border border-surface-4 rounded-sm overflow-hidden mt-6"
    >
      {/* Thumbnail */}
      <div className="relative w-full bg-card overflow-hidden group">
        {!thumbError && info.thumbnail ? (
          <>
            {!thumbLoaded && <div className="w-full aspect-video animate-skeleton" />}
            <img
              src={info.thumbnail}
              alt=""
              className="w-full block max-h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              onLoad={() => setThumbLoaded(true)}
              onError={() => setThumbError(true)}
              style={{ display: thumbLoaded ? "block" : "none" }}
            />
            {thumbLoaded && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/55 to-transparent pointer-events-none" />
              </>
            )}
          </>
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-card to-surface-3 flex items-center justify-center">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="opacity-15">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M10 8l6 4-6 4V8z" />
            </svg>
          </div>
        )}
        <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 bg-background/90 border border-gold-dim rounded-[1px] text-[9px] tracking-[0.35em] uppercase text-primary">
          {platform}
        </span>
        {info.duration && (
          <span className="absolute bottom-3.5 right-3.5 px-2 py-0.5 bg-background/90 border border-surface-4 rounded-[1px] text-[10px] tracking-wider text-foreground">
            {formatDuration(info.duration)}
          </span>
        )}
      </div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-surface-4 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.42em] uppercase text-primary flex items-center gap-2">
          <span className="w-4 h-px bg-primary block" />
          {platform}
        </span>
        <div className="flex gap-2">
          <button onClick={copySource} className="bg-transparent border border-surface-4 rounded-sm text-muted-foreground font-body text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 cursor-pointer transition-all duration-300 hover:border-gold-dim hover:text-primary">
            Copy Link
          </button>
          <button onClick={() => window.open(sourceUrl, "_blank", "noopener")} className="bg-transparent border border-surface-4 rounded-sm text-muted-foreground font-body text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 cursor-pointer transition-all duration-300 hover:border-gold-dim hover:text-primary">
            Open ↗
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="font-display text-xl leading-snug text-foreground mb-2.5">
          {info.title || "Media found"}
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {info.author && <Pill label="Creator" value={info.author} />}
          {info.views && <Pill label="Views" value={formatNumber(info.views)} />}
          {info.likes && <Pill label="Likes" value={formatNumber(info.likes)} />}
        </div>

        {/* Quality grid */}
        <p className="text-[9px] tracking-[0.38em] uppercase text-muted-foreground mb-2">
          Select Quality
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2 mb-4">
          {info.qualities.map((q, i) => (
            <button
              key={i}
              onClick={() => setSelectedQuality(q)}
              className={`relative p-3 border rounded-sm cursor-pointer transition-all duration-200 overflow-hidden text-left
                ${selectedQuality === q
                  ? "border-primary"
                  : "border-surface-4 hover:border-gold-dim"
                }`}
            >
              <div
                className={`absolute inset-0 bg-gold-glow transition-opacity duration-200 ${
                  selectedQuality === q ? "opacity-100" : "opacity-0"
                }`}
              />
              {q.hd && !q.audio && !q.nowatermark && (
                <span className="absolute top-1.5 right-1.5 text-[8px] tracking-wider text-primary bg-primary/10 border border-gold-dim px-1 rounded-[1px] z-10">
                  HD
                </span>
              )}
              {q.nowatermark && (
                <span className="absolute top-1.5 right-1.5 text-[8px] tracking-wider text-success bg-success/10 border border-success/50 px-1 rounded-[1px] z-10">
                  NO WM
                </span>
              )}
              {q.audio && (
                <span className="absolute top-1.5 right-1.5 text-[8px] tracking-wider text-primary bg-primary/10 border border-gold-dim px-1 rounded-[1px] z-10">
                  ♪
                </span>
              )}
              <div className="text-xs font-medium text-foreground tracking-wide relative z-10">
                {q.label}
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5 relative z-10 tracking-wider">
                {q.sub}
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 max-sm:grid-cols-1">
          <button
            onClick={startDownload}
            className="px-3.5 py-3.5 bg-transparent border border-primary text-primary font-body text-[10px] font-medium tracking-[0.38em] uppercase cursor-pointer transition-all duration-300 rounded-sm relative overflow-hidden group/dl hover:bg-primary hover:text-primary-foreground"
          >
            <span className="relative z-10">↓ Download</span>
          </button>
          <button onClick={copyDlUrl} className="px-4 py-3.5 bg-transparent border border-surface-4 text-muted-foreground font-body text-[9px] tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 rounded-sm hover:border-gold-dim hover:text-primary whitespace-nowrap">
            Copy URL
          </button>
          <button
            onClick={() => window.open(sourceUrl, "_blank", "noopener")}
            className="px-4 py-3.5 bg-transparent border border-surface-4 text-muted-foreground font-body text-[9px] tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 rounded-sm hover:border-gold-dim hover:text-primary whitespace-nowrap"
          >
            Source ↗
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Pill = ({ label, value }: { label: string; value: string }) => (
  <div className="px-2.5 py-1 bg-foreground/[0.025] border border-surface-4 rounded-sm text-[9px] tracking-wider uppercase text-muted-foreground">
    {label} <span className="text-muted-foreground/70 ml-1 font-normal">{value}</span>
  </div>
);

export default ResultCard;
