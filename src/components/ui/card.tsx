export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl border border-surface bg-light">
      {children}
    </div>
  );
}