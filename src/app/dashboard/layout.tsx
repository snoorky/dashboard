import Header from "@/components/header";
import { NavBar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-svh xl:h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden h-svh">
          <SideBar />
          <main className="flex-1 overflow-auto px-4 bg-surface/25">{children}</main>
        </div>
      </div>
    </>
  );
}