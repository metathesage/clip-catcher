import { motion, AnimatePresence } from "framer-motion";
import { HistoryItem, timeAgo } from "@/lib/veloce";

interface HistoryPanelProps {
  open: boolean;
  items: HistoryItem[];
  onClose: () => void;
  onSelect: (url: string) => void;
}

const HistoryPanel = ({ open, items, onClose, onSelect }: HistoryPanelProps) => (
  <>
    {/* Overlay */}
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/55 z-[799] backdrop-blur-sm"
        />
      )}
    </AnimatePresence>

    {/* Panel */}
    <div
      className={`fixed top-0 right-0 bottom-0 w-[340px] max-sm:w-full bg-card border-l border-surface-4 z-[800] transition-transform duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-y-auto ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="sticky top-0 bg-card border-b border-surface-4 px-5 py-4 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.4em] uppercase text-primary">— History —</span>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-muted-foreground cursor-pointer text-lg leading-none p-1 transition-colors duration-300 hover:text-foreground"
        >
          ✕
        </button>
      </div>
      <div className="p-3.5">
        {items.length === 0 ? (
          <div className="text-center py-9 text-[11px] tracking-wider text-muted-foreground">
            No downloads yet
          </div>
        ) : (
          items.map((item, i) => (
            <button
              key={i}
              onClick={() => onSelect(item.url)}
              className="flex gap-3 p-3 border border-surface-4 rounded-sm mb-2 cursor-pointer transition-all duration-300 relative overflow-hidden w-full text-left hover:border-gold-dim group"
            >
              <div className="absolute inset-0 bg-gold-glow scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-[76px] h-12 object-cover rounded-[1px] flex-shrink-0 bg-surface-3"
                  onError={(e) => (e.currentTarget.style.background = "hsl(var(--surface-3))")}
                />
              ) : (
                <div className="w-[76px] h-12 flex-shrink-0 bg-surface-3 rounded-[1px]" />
              )}
              <div className="flex-1 min-w-0 relative z-10">
                <div className="text-[11px] text-foreground mb-1 whitespace-nowrap overflow-hidden text-ellipsis leading-snug">
                  {item.title}
                </div>
                <div className="text-[9px] tracking-[0.22em] uppercase text-primary">
                  {item.platform}
                </div>
                <div className="text-[9px] text-muted-foreground mt-0.5">
                  {timeAgo(item.ts)}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  </>
);

export default HistoryPanel;
