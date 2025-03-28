import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Authentication check
  const authQuery = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn<{authenticated: boolean; user: any}>({on401: 'returnNull'}),
  });
  
  // Check auth status and redirect if not authenticated
  useEffect(() => {
    if (authQuery.isSuccess) {
      setIsAuthenticated(!!authQuery.data?.authenticated);
      if (!authQuery.data?.authenticated) {
        setLocation('/admin/login');
      }
    } else if (authQuery.isError) {
      setLocation('/admin/login');
    }
  }, [authQuery.isSuccess, authQuery.isError, authQuery.data, setLocation]);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar - desktop */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      
      {/* Sidebar - mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs">
            <AdminSidebar />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex h-16 items-center border-b bg-white px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center flex-1">
            <img 
              src="https://i.imgur.com/8j3VafC.png" 
              alt="Logo" 
              className="h-8 w-auto mr-2" 
            />
            <div>
              <span className="font-bold text-[#FF6B00]">Synergy</span>
              <span className="font-medium text-gray-700">Brand</span>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}