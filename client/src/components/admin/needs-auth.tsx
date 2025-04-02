import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

interface AdminNeedsAuthProps {
  children: ReactNode;
}

export default function AdminNeedsAuth({ children }: AdminNeedsAuthProps) {
  const [, setLocation] = useLocation();
  
  // Authentication check
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn<{authenticated: boolean; user: any}>({on401: 'returnNull'}),
  });
  
  // Check auth status and redirect if not authenticated
  useEffect(() => {
    if (!isLoading) {
      if (isError || !data?.authenticated) {
        setLocation('/admin/login');
      }
    }
  }, [isLoading, isError, data, setLocation]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (isError || !data?.authenticated) {
    return null;  // Return null as we're redirecting in the useEffect
  }

  // Authenticated, render children
  return <>{children}</>;
}