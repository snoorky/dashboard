import Header from "@/components/header";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex-col">
        <Header />

        <div className="xl:ml-44 px-4">
          {children}
        </div>
      </div>
    </>
  );
}