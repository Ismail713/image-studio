import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}
