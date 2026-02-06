import { useState } from "react";
import { Sidebar, MobileHeader } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Desktop Sidebar */}
      <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      
      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        "pt-14 lg:pt-0", // Account for mobile header
        collapsed ? "lg:pl-16" : "lg:pl-64"
      )}>
        <div className="min-h-screen p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
