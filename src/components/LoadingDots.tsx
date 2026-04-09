interface LoadingDotsProps {
  text: string;
}

const LoadingDots = ({ text }: LoadingDotsProps) => (
  <div className="flex items-center gap-4 mt-6">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[6px] h-[6px] bg-primary rounded-full animate-dot-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
    <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
      {text}
    </span>
  </div>
);

export default LoadingDots;
