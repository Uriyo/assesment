import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

function SidebarContent({ collapsed, showLabels = true }: { collapsed: boolean; showLabels?: boolean }) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center gap-3 border-b border-sidebar-border",
        collapsed ? "justify-center px-2" : "px-6"
      )}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shrink-0">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        {showLabels && !collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-semibold text-sidebar-foreground truncate">HRMS Lite</h1>
            <p className="text-xs text-sidebar-foreground/60 truncate">Employee Management</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-1 py-4", collapsed ? "px-2" : "px-3")}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                collapsed ? "justify-center px-2" : "px-3",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {showLabels && !collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn("border-t border-sidebar-border p-4", collapsed && "px-2")}>
        <div className={cn(
          "flex items-center gap-3 rounded-lg py-2 text-sm text-sidebar-foreground/60",
          collapsed ? "justify-center px-2" : "px-3"
        )}>
          <Settings className="h-4 w-4 shrink-0" />
          {showLabels && !collapsed && <span>v1.0.0</span>}
        </div>
      </div>
    </div>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground">
          <SidebarContent collapsed={false} showLabels={true} />
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground">HRMS Lite</span>
      </div>
    </header>
  );
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 hidden lg:block",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarContent collapsed={collapsed} />
      
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onCollapsedChange(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  );
}
