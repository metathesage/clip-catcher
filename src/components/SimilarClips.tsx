import { motion } from "framer-motion";
import { SimilarClip, formatDuration, formatNumber } from "@/lib/veloce";

interface SimilarClipsProps {
  clips: SimilarClip[];
  author?: string;
  onSelect: (url: string) => void;
}

const SimilarClips = ({ clips, author, onSelect }: SimilarClipsProps) => {
  if (!clips.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[740px] mt-6"
    >
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className="flex-1 h-px bg-surface-4" />
        <span className="text-[9px] tracking-[0.42em] uppercase text-muted-foreground whitespace-nowrap">
          {author ? `More from ${author}` : "Related"}
        </span>
        <div className="flex-1 h-px bg-surface-4" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2">
        {clips.map((clip, i) => (
          <button
            key={i}
            onClick={() => onSelect(clip.url)}
            className="bg-surface-1 border border-surface-4 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold-dim hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-left"
          >
            <div className="relative aspect-video overflow-hidden bg-card">
              {clip.thumbnail && (
                <img
                  src={clip.thumbnail}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              {clip.duration && (
                <span className="absolute bottom-1.5 right-1.5 bg-background/90 px-1.5 py-0.5 text-[9px] text-foreground rounded-[1px]">
                  {formatDuration(clip.duration)}
                </span>
              )}
            </div>
            <div className="p-2.5">
              <div className="text-[11px] text-foreground leading-snug mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {clip.title}
              </div>
              <div className="text-[9px] text-muted-foreground tracking-wider">
                {clip.views ? formatNumber(clip.views) + " views" : ""}
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarClips;
