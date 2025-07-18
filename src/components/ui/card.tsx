export default function Card({ style, children }: { style?: string, children: React.ReactNode }) {
  return (
    <div className={`p-3 rounded-xl border ${style ? style : "border-surface bg-light"} `}>
      {children}
    </div>
  );
}