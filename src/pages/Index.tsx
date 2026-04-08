import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  VideoInfo,
  SimilarClip,
  HistoryItem,
  detectPlatform,
  fetchVideoInfo,
  fetchSimilar,
  getHistory,
  saveToHistory,
} from "@/lib/veloce";
import CustomCursor from "@/components/CustomCursor";
import AmbientGlow from "@/components/AmbientGlow";
import Navbar from "@/components/Navbar";
import PlatformMarquee from "@/components/PlatformMarquee";
import OptionToggles from "@/components/OptionToggles";
import UrlInput from "@/components/UrlInput";
import LoadingDots from "@/components/LoadingDots";
import ResultCard from "@/components/ResultCard";
import SimilarClips from "@/components/SimilarClips";
import HistoryPanel from "@/components/HistoryPanel";
import VeloceFooter from "@/components/VeloceFooter";

const Index = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Retrieving media…");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoInfo | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [similar, setSimilar] = useState<SimilarClip[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(getHistory());
  const [noWatermark, setNoWatermark] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);
  const [status, setStatus] = useState("Ready");

  const toggleWm = () => {
    setNoWatermark((v) => {
      const next = !v;
      if (next) setAudioOnly(false);
      toast(next ? "No-watermark on (TikTok)" : "Normal mode");
      return next;
    });
  };

  const toggleAudio = () => {
    setAudioOnly((v) => {
      const next = !v;
      if (next) setNoWatermark(false);
      toast(next ? "Audio-only on" : "Video mode");
      return next;
    });
  };

  const doFetch = useCallback(async () => {
    const raw = url.trim();
    if (!raw) {
      setError("Please paste a video URL first.");
      return;
    }
    if (!detectPlatform(raw)) {
      setError("Please paste a valid video URL (must start with https://).");
      return;
    }

    setError(null);
    setResult(null);
    setSimilar([]);
    setLoading(true);
    setLoadingText("Retrieving media…");
    setStatus("Working");
    setSourceUrl(raw);

    try {
      const info = await fetchVideoInfo(raw, {
        nowatermark: noWatermark,
        audioOnly,
      });
      setResult(info);
      saveToHistory(info, raw);
      setHistory(getHistory());

      // Fetch similar in background
      fetchSimilar(raw).then((clips) => setSimilar(clips));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      if (msg.includes("fetch") || msg.includes("Failed") || msg.includes("NetworkError")) {
        setError("Cannot reach Veloce server — make sure server.py is running, then try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
      setStatus("Ready");
    }
  }, [url, noWatermark, audioOnly]);

  const handleSimilarSelect = (clipUrl: string) => {
    setUrl(clipUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setUrl(clipUrl);
      doFetch();
    }, 200);
  };

  const handleHistorySelect = (histUrl: string) => {
    setUrl(histUrl);
    setHistoryOpen(false);
    setTimeout(() => doFetch(), 100);
  };

  return (
    <div className="min-h-screen cursor-none md:cursor-none">
      <CustomCursor />
      <AmbientGlow />
      <HistoryPanel
        open={historyOpen}
        items={history}
        onClose={() => setHistoryOpen(false)}
        onSelect={handleHistorySelect}
      />
      <Navbar status={status} onOpenHistory={() => setHistoryOpen(true)} />

      <main>
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 md:px-9 pt-32 pb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.52em] uppercase text-primary mb-7"
          >
            — The Art of Capture —
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display font-light text-[clamp(52px,8vw,112px)] leading-[0.9] text-foreground mb-5"
          >
            Download<br />
            <em className="italic text-primary">Anything.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-11"
          >
            YouTube &nbsp;·&nbsp; TikTok &nbsp;·&nbsp; Kick &nbsp;·&nbsp; X &nbsp;·&nbsp; Instagram &nbsp;·&nbsp; 1000+ sites
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <PlatformMarquee />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <OptionToggles
              noWatermark={noWatermark}
              audioOnly={audioOnly}
              onToggleWm={toggleWm}
              onToggleAudio={toggleAudio}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full flex flex-col items-center"
          >
            <UrlInput
              value={url}
              onChange={setUrl}
              onFetch={doFetch}
              disabled={loading}
            />
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 px-4 py-3 border border-destructive/30 border-l-[3px] border-l-destructive bg-destructive/5 rounded-sm text-xs tracking-wider text-destructive text-left w-full max-w-[740px] leading-relaxed"
            >
              {error}
            </motion.div>
          )}

          {/* Loading */}
          {loading && <LoadingDots text={loadingText} />}

          {/* Result */}
          {result && <ResultCard info={result} sourceUrl={sourceUrl} />}

          {/* Similar */}
          {similar.length > 0 && (
            <SimilarClips
              clips={similar}
              author={result?.author}
              onSelect={handleSimilarSelect}
            />
          )}

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-4 w-full max-w-[740px] my-10"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-surface-4" />
            <div className="w-[5px] h-[5px] bg-gold-dim rotate-45" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-surface-4" />
          </motion.div>
        </section>
      </main>

      <VeloceFooter />
    </div>
  );
};

export default Index;
