import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";

const memoryImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546238232-20216dec9f72?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
];

export default function DemoPage() {
  return (
    <div className="w-full">
      <ArcGalleryHero images={memoryImages}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
          Rediscover Your Memories with AI
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Our intelligent platform finds, organizes, and brings your most
          cherished moments back to life.
        </p>
      </ArcGalleryHero>
    </div>
  );
}
