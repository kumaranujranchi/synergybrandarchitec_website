import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQueryFn } from "@/lib/queryClient";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication
  const authQuery = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn<{authenticated: boolean; user: any}>({on401: 'returnNull'}),
  });

  // Dashboard stats
  const statsQuery = useQuery({
    queryKey: ['/api/admin/dashboard'],
    queryFn: getQueryFn<{stats: any}>({on401: 'returnNull'}),
    enabled: isAuthenticated === true,
  });

  // Submissions (leads)
  const submissionsQuery = useQuery({
    queryKey: ['/api/admin/submissions'],
    queryFn: getQueryFn<{submissions: any[]}>({on401: 'returnNull'}),
    enabled: isAuthenticated === true,
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
  if (isAuthenticated === null || statsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your dashboard</p>
        </div>
      </div>
    );
  }

  const stats = statsQuery.data?.stats || { 
    total: 0, 
    new: 0, 
    inProgress: 0, 
    pending: 0, 
    delivered: 0, 
    lost: 0 
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center justify-between">
          <div className="font-semibold">Synergy Brand Architect Admin</div>
          <nav className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetch('/api/auth/logout', { method: 'POST' })
                  .then(() => setLocation('/admin/login'));
              }}
            >
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All-time form submissions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.new}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground">Currently being processed</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="submissions" className="mt-6">
            <TabsList>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="submissions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>
                    View and manage client submissions and inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submissionsQuery.isLoading ? (
                    <p>Loading submissions...</p>
                  ) : submissionsQuery.isError ? (
                    <p className="text-red-500">Error loading submissions</p>
                  ) : !submissionsQuery.data?.submissions?.length ? (
                    <p>No submissions found.</p>
                  ) : (
                    <div className="space-y-8">
                      {submissionsQuery.data.submissions.slice(0, 5).map((submission) => (
                        <div key={submission.id} className="border-b pb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{submission.name}</h3>
                            <div className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                              {submission.status}
                            </div>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-x-6 text-sm text-muted-foreground">
                            <div>Email: {submission.email}</div>
                            <div>Phone: {submission.phone}</div>
                            <div>Service: {submission.service}</div>
                          </div>
                          <div className="mt-2 text-sm">
                            {submission.message.substring(0, 100)}
                            {submission.message.length > 100 ? "..." : ""}
                          </div>
                          <div className="mt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setLocation(`/admin/submissions/${submission.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="text-center">
                        <Button 
                          variant="outline"
                          onClick={() => setLocation('/admin/submissions')}
                        >
                          View All Submissions
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage admin users and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Users will be shown here (coming soon)</p>
                  <div className="mt-4">
                    <Button 
                      onClick={() => setLocation('/admin/users')}
                      variant="outline"
                    >
                      Manage Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}