export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-700 rounded-lg ${className}`} />;
}