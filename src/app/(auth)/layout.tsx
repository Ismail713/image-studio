import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-soft px-4">
      <Link href="/" className="font-bold text-xl mb-10 tracking-tight text-ink">
        image<span className="text-primary">studio</span>
      </Link>
      {children}
    </div>
  );
}
