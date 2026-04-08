interface LoadingDotsProps {
  text: string;
}

const LoadingDots = ({ text }: LoadingDotsProps) => (
  <div className="flex items-center gap-3.5 mt-6">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] bg-primary rounded-full animate-dot-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
    <span className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
      {text}
    </span>
  </div>
);

export default LoadingDots;
