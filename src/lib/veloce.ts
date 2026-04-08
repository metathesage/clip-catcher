// Server configuration - change this to your backend URL
export const SERVER_URL = "http://localhost:8899";

export interface QualityOption {
  label: string;
  sub: string;
  url: string;
  hd: boolean;
  nowatermark?: boolean;
  audio?: boolean;
}

export interface VideoInfo {
  title: string;
  author: string;
  thumbnail: string;
  duration: number | null;
  qualities: QualityOption[];
  views: number | null;
  likes: number | null;
  platform: string;
}

export interface SimilarClip {
  title: string;
  thumbnail: string;
  duration: number | null;
  views: number;
  url: string;
}

export interface HistoryItem {
  title: string;
  platform: string;
  url: string;
  thumbnail: string;
  ts: number;
}

export const PLATFORMS = [
  "YouTube", "TikTok", "Kick", "X / Twitter", "Instagram",
  "Pinterest", "Reddit", "Facebook", "Twitch", "Vimeo",
  "SoundCloud", "Dailymotion", "1000+ more"
];

export function detectPlatform(url: string): string | null {
  if (/youtube\.com|youtu\.be/.test(url)) return "YouTube";
  if (/tiktok\.com|vm\.tiktok/.test(url)) return "TikTok";
  if (/kick\.com/.test(url)) return "Kick";
  if (/(?:x|twitter)\.com/.test(url)) return "X / Twitter";
  if (/instagram\.com/.test(url)) return "Instagram";
  if (/pinterest\.com|pin\.it/.test(url)) return "Pinterest";
  if (/reddit\.com|redd\.it/.test(url)) return "Reddit";
  if (/facebook\.com|fb\.watch/.test(url)) return "Facebook";
  if (/twitch\.tv/.test(url)) return "Twitch";
  if (/vimeo\.com/.test(url)) return "Vimeo";
  if (/soundcloud\.com/.test(url)) return "SoundCloud";
  if (/dailymotion\.com/.test(url)) return "Dailymotion";
  if (url.startsWith("http")) return "Video";
  return null;
}

export function formatDuration(s: number): string {
  s = Math.round(Number(s) || 0);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

export function formatNumber(n: number): string {
  n = parseInt(String(n)) || 0;
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

export async function fetchVideoInfo(
  url: string,
  opts: { nowatermark?: boolean; audioOnly?: boolean }
): Promise<VideoInfo> {
  const params = new URLSearchParams({ url });
  if (opts.nowatermark) params.set("nowatermark", "1");
  if (opts.audioOnly) params.set("audioonly", "1");

  const r = await fetch(`${SERVER_URL}/info?${params.toString()}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d;
}

export async function fetchSimilar(url: string): Promise<SimilarClip[]> {
  const r = await fetch(`${SERVER_URL}/similar?url=${encodeURIComponent(url)}`);
  if (!r.ok) return [];
  return await r.json();
}

export function getHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem("vhist") || "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(info: VideoInfo, url: string) {
  const hist = getHistory();
  hist.unshift({
    title: info.title || "Media",
    platform: info.platform || detectPlatform(url) || "video",
    url,
    thumbnail: info.thumbnail || "",
    ts: Date.now(),
  });
  const trimmed = hist.slice(0, 40);
  try {
    localStorage.setItem("vhist", JSON.stringify(trimmed));
  } catch {}
}
