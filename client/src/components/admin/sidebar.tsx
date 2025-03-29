import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { 
  FileText, 
  Users, 
  LogOut, 
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminSidebar() {
  const [location, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Get user details
  const userQuery = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn<{authenticated: boolean; user: User}>({on401: 'returnNull'}),
  });
  
  const user = userQuery.data?.user;
  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Set initial collapsed state based on viewport
  useEffect(() => {
    setIsCollapsed(isMobileView);
  }, [isMobileView]);
  
  // Check if current path matches the link
  const isActivePath = (path: string) => {
    return location.startsWith(path);
  };
  
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setLocation('/admin/login');
  };

  // Common styles for menu items
  const menuItemClass = (path: string) => cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-800 transition-all hover:bg-gray-100",
    isActivePath(path) ? "bg-orange-50 text-orange-600 font-medium" : "",
    isCollapsed ? "justify-center" : ""
  );

  // Check if user has permission
  const hasPermission = (role: string) => {
    return user?.role === 'admin' || user?.role === role;
  };
  
  return (
    <div 
      className={cn(
        "flex h-screen flex-col border-r bg-white transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2 w-full">
          <img 
            src="//i.imgur.com/8j3VafC.png" 
            alt="Logo" 
            className="h-8 w-auto"
          />
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <span className="font-bold text-[#FF6B00]">Synergy</span>
              <span className="font-medium text-gray-700">Brand</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto h-8 w-8 p-0"
          >
            <ChevronRight 
              className={cn(
                "h-4 w-4 transition-transform", 
                isCollapsed ? "" : "rotate-180"
              )} 
            />
          </Button>
        </div>
      </div>
      
      {/* User details */}
      <div className={cn(
        "border-b py-4 px-4",
        isCollapsed ? "py-2" : "py-4"
      )}>
        {!isCollapsed ? (
          <div>
            <p className="text-sm font-medium">{user?.name || 'Loading...'}</p>
            <p className="text-xs text-gray-500">{user?.email || ''}</p>
            <div className="mt-1">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium">
                {user?.role === 'admin' ? 'Administrator' : user?.role === 'manager' ? 'Manager' : 'Sales Executive'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className={menuItemClass('/admin/dashboard')}
            onClick={() => setLocation('/admin/dashboard')}
          >
            <LayoutDashboard className="h-5 w-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={menuItemClass('/admin/submissions')}
            onClick={() => setLocation('/admin/submissions')}
          >
            <FileText className="h-5 w-5" />
            {!isCollapsed && <span>Leads</span>}
          </Button>
          
          {hasPermission('admin') && (
            <Button
              variant="ghost"
              className={menuItemClass('/admin/users')}
              onClick={() => setLocation('/admin/users')}
            >
              <Users className="h-5 w-5" />
              {!isCollapsed && <span>User Management</span>}
            </Button>
          )}
        </nav>
      </div>
      
      {/* Logout button */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 transition-all hover:bg-red-50",
            isCollapsed ? "justify-center" : ""
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}