export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`wrap ${className}`}>{children}</div>;
}
