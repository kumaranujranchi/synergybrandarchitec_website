import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { 
  ArrowUpDown, 
  Calendar, 
  Download, 
  Filter, 
  Plus, 
  Search, 
  Tag, 
  Trash2, 
  X,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/layout";

export default function SubmissionsPage() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [newNote, setNewNote] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Authentication check
  const authQuery = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn<{authenticated: boolean; user: any}>({on401: 'returnNull'}),
  });

  // Get submissions with optional filtering
  const submissionsQuery = useQuery({
    queryKey: ['/api/admin/submissions', statusFilter],
    queryFn: async () => {
      let url = '/api/admin/submissions';
      if (statusFilter) {
        url += `?status=${statusFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch submissions');
      return response.json();
    },
    enabled: isAuthenticated === true,
  });

  // Get notes for a specific submission
  const notesQuery = useQuery({
    queryKey: ['/api/admin/submissions', selectedSubmission?.id, 'notes'],
    queryFn: async () => {
      const response = await fetch(`/api/admin/submissions/${selectedSubmission?.id}`);
      if (!response.ok) throw new Error('Failed to fetch submission details');
      return response.json();
    },
    enabled: isAuthenticated === true && !!selectedSubmission?.id,
  });

  // Update submission status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest(
        'PATCH',
        `/api/admin/submissions/${id}`, 
        { status }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard'] });
      toast({
        title: "Status updated",
        description: "The lead status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add note mutation
  const addNoteMutation = useMutation({
    mutationFn: async ({ submissionId, content }: { submissionId: number; content: string }) => {
      return apiRequest(
        'POST',
        `/api/admin/submissions/${submissionId}/notes`, 
        { content }
      );
    },
    onSuccess: () => {
      setNewNote("");
      queryClient.invalidateQueries({ queryKey: ['/api/admin/submissions', selectedSubmission?.id, 'notes'] });
      toast({
        title: "Note added",
        description: "Your note has been added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete submission mutation (for demo - actual implementation would depend on your backend)
  const deleteSubmissionMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(
        'DELETE', 
        `/api/admin/submissions/${id}`
      );
    },
    onSuccess: () => {
      setShowDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: ['/api/admin/submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard'] });
      toast({
        title: "Submission deleted",
        description: "The lead has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete submission. Please try again.",
        variant: "destructive",
      });
    },
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

  // Function to export submissions to CSV
  const exportToCSV = () => {
    if (!submissionsQuery.data?.submissions?.length) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export.",
        variant: "destructive",
      });
      return;
    }

    // Create CSV content
    const headers = [
      "ID", 
      "Name", 
      "Email", 
      "Phone", 
      "Service", 
      "Message", 
      "Status", 
      "Submitted At", 
      "Updated At"
    ];
    
    const csvRows = [
      headers.join(','), // Header row
      ...submissionsQuery.data.submissions.map((sub: any) => {
        // Format dates for CSV
        const submittedAt = sub.submittedAt ? new Date(sub.submittedAt).toISOString() : '';
        const updatedAt = sub.updatedAt ? new Date(sub.updatedAt).toISOString() : '';
        
        // Escape fields that might contain commas
        const escapeCsvField = (field: string) => {
          if (!field) return '';
          // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
          if (field.includes(',') || field.includes('"') || field.includes('\n')) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        };
        
        return [
          sub.id,
          escapeCsvField(sub.name),
          escapeCsvField(sub.email),
          escapeCsvField(sub.phone),
          escapeCsvField(sub.service),
          escapeCsvField(sub.message),
          sub.status,
          submittedAt,
          updatedAt
        ].join(',');
      })
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `submissions-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Your data has been exported to CSV file.",
    });
  };

  // Filter submissions based on search query
  const filteredSubmissions = submissionsQuery.data?.submissions?.filter((submission: any) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      submission.name?.toLowerCase().includes(searchLower) ||
      submission.email?.toLowerCase().includes(searchLower) ||
      submission.phone?.toLowerCase().includes(searchLower) ||
      submission.service?.toLowerCase().includes(searchLower) ||
      submission.message?.toLowerCase().includes(searchLower);
    
    return matchesSearch;
  }) || [];

  // Loading state
  if (isAuthenticated === null) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we verify your credentials</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Define status tags and colors
  type StatusConfigType = Record<string, {
    color: string;
    icon: React.ReactNode;
    label: string;
  }>;
  
  const statusConfig: StatusConfigType = {
    new: { 
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <AlertCircle className="h-4 w-4 mr-1" />,
      label: 'New'
    },
    in_progress: { 
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <Clock className="h-4 w-4 mr-1" />,
      label: 'In Progress'
    },
    pending: { 
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <Clock className="h-4 w-4 mr-1" />,
      label: 'Pending'
    },
    delivered: { 
      color: 'bg-green-50 text-green-700 border-green-200',
      icon: <CheckCircle className="h-4 w-4 mr-1" />,
      label: 'Closed'
    },
    lost: { 
      color: 'bg-red-50 text-red-700 border-red-200',
      icon: <XCircle className="h-4 w-4 mr-1" />,
      label: 'Not Interested'
    }
  };

  return (
    <AdminLayout>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <Button
              className="bg-[#FF6B00] text-white hover:bg-[#FF8533]"
              onClick={exportToCSV}
            >
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </div>

          {/* Filters bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex-1 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="All Statuses" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="delivered">Closed</SelectItem>
                      <SelectItem value="lost">Not Interested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {statusFilter && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setStatusFilter('')} 
                  className="h-10"
                >
                  <X className="h-4 w-4 mr-1" /> Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Submissions table/cards */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Leads ({filteredSubmissions.length})</CardTitle>
              <CardDescription>
                View and manage all leads captured from contact forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissionsQuery.isLoading ? (
                <div className="py-8 text-center">
                  <p>Loading submissions...</p>
                </div>
              ) : submissionsQuery.isError ? (
                <div className="py-8 text-center text-red-500">
                  <p>Error loading submissions. Please try again.</p>
                </div>
              ) : !filteredSubmissions.length ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No leads found</h3>
                  <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                    {statusFilter 
                      ? `There are no leads with the "${statusFilter}" status.` 
                      : "There are no leads matching your search criteria."}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredSubmissions.map((submission: any) => {
                    // Get the status and ensure it's a string
                    const status = typeof submission.status === 'string' ? submission.status : 'new';
                    
                    // Get the status config or use default
                    const statusDisplayConfig = statusConfig[status] || {
                      color: 'bg-gray-50 text-gray-700 border-gray-200',
                      icon: null,
                      label: status.replace('_', ' ')
                    };
                    
                    // Format dates
                    const formattedSubmittedDate = submission.submittedAt 
                      ? format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')
                      : 'Unknown date';
                    
                    return (
                      <div 
                        key={submission.id} 
                        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{submission.name}</h3>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {formattedSubmittedDate}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge 
                                className={`flex items-center px-2.5 py-1 ${statusDisplayConfig.color} border`}
                                variant="outline"
                              >
                                {statusDisplayConfig.icon}
                                {statusDisplayConfig.label}
                              </Badge>
                              <Select 
                                value={submission.status} 
                                onValueChange={(value) => updateStatusMutation.mutate({ 
                                  id: submission.id, 
                                  status: value 
                                })}
                              >
                                <SelectTrigger className="h-8 w-32">
                                  <SelectValue placeholder="Change status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="delivered">Closed</SelectItem>
                                  <SelectItem value="lost">Not Interested</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-700">{submission.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className="text-gray-700">{submission.phone}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-700">{submission.service}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 text-sm text-gray-600 border-t border-gray-100 pt-3">
                            {submission.message?.substring(0, 150)}
                            {submission.message?.length > 150 ? "..." : ""}
                          </div>
                          
                          <div className="mt-4 flex flex-wrap justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowNotesDialog(true);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Note
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Lead Notes</DialogTitle>
            <DialogDescription>
              Add and view notes for this lead
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto space-y-4 my-4">
            {notesQuery.isLoading ? (
              <p className="text-center py-4">Loading notes...</p>
            ) : notesQuery.isError ? (
              <p className="text-center py-4 text-red-500">Error loading notes</p>
            ) : !notesQuery.data?.notes?.length ? (
              <p className="text-center py-4 text-gray-500">No notes yet. Add the first note below.</p>
            ) : (
              notesQuery.data.notes.map((note: any) => (
                <div key={note.id} className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm mb-1">{note.content}</p>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>by Admin</span>
                    <span>{format(new Date(note.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Add a note</Label>
            <Textarea 
              id="note" 
              placeholder="Enter your note here..." 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNotesDialog(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={!newNote.trim() || addNoteMutation.isPending}
              onClick={() => addNoteMutation.mutate({ 
                submissionId: selectedSubmission.id, 
                content: newNote 
              })}
            >
              {addNoteMutation.isPending ? "Saving..." : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteSubmissionMutation.isPending}
              onClick={() => deleteSubmissionMutation.mutate(selectedSubmission.id)}
            >
              {deleteSubmissionMutation.isPending ? "Deleting..." : "Delete Lead"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}