interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function MarqueeText({ text, speed = 50, className = '' }: MarqueeTextProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="animate-marquee whitespace-nowrap inline-block">
        {text} • {text} • {text}
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
}