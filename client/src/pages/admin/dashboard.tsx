import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQueryFn } from "@/lib/queryClient";
import AdminLayout from "@/components/admin/layout";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  // Dashboard stats
  const statsQuery = useQuery({
    queryKey: ['/api/admin/dashboard'],
    queryFn: getQueryFn<{stats: any}>({on401: 'returnNull'}),
  });

  // Submissions (leads)
  const submissionsQuery = useQuery({
    queryKey: ['/api/admin/submissions'],
    queryFn: getQueryFn<{submissions: any[]}>({on401: 'returnNull'}),
  });

  // Loading state
  if (statsQuery.isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Loading...</h2>
              <p className="text-muted-foreground">Please wait while we load your dashboard</p>
            </div>
          </div>
        </div>
      </AdminLayout>
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
    <AdminLayout>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-md">
              <div className="bg-[#FF6B00] h-1"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All-time form submissions</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="bg-[#0066CC] h-1"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.new}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="bg-[#00CC66] h-1"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground">Currently being processed</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="bg-[#9933CC] h-1"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.delivered}</div>
                <p className="text-xs text-muted-foreground">Completed projects</p>
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
                    <div className="text-center py-8">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-1">No submissions yet</h3>
                      <p className="text-sm text-gray-500 mb-4">Submissions from the contact form will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {submissionsQuery.data.submissions.slice(0, 5).map((submission) => {
                        const statusColors: Record<string, { bg: string; text: string; border: string }> = {
                          new: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
                          in_progress: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
                          pending: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
                          delivered: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
                          lost: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
                        };
                        
                        // Get the status and provide a fallback
                        const status = typeof submission.status === 'string' ? submission.status : 'new';
                        
                        // Get the style for this status or use default
                        const statusStyle = statusColors[status] !== undefined 
                          ? statusColors[status] 
                          : { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
                          
                        return (
                          <div key={submission.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-lg">{submission.name}</h3>
                                <div className={`rounded px-2 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                                  {submission.status?.replace('_', ' ')}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  {submission.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {submission.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  {submission.service}
                                </div>
                              </div>
                              <div className="mt-3 text-sm text-gray-600 border-t border-gray-100 pt-3">
                                {submission.message?.substring(0, 100)}
                                {submission.message?.length > 100 ? "..." : ""}
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button 
                                  size="sm" 
                                  className="bg-[#0066CC] hover:bg-[#0055AA] text-white"
                                  onClick={() => setLocation(`/admin/submissions/${submission.id}`)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="text-center pt-4">
                        <Button 
                          className="bg-[#FF6B00] hover:bg-[#FF8533] text-white"
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
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage admin users and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-1">User Management Coming Soon</h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md">
                      This section will allow you to manage admin users, roles, and permissions for your website.
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        className="bg-[#0066CC] hover:bg-[#0055AA] text-white"
                        onClick={() => setLocation('/admin/users')}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New User
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#0066CC] text-[#0066CC]"
                        onClick={() => setLocation('/admin/users')}
                      >
                        Manage Users
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AdminLayout>
  );
}