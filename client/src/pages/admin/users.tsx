import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryFn, apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import AdminLayout from '@/components/admin/layout';
import { useToast } from '@/hooks/use-toast';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Trash2, 
  X, 
  Filter,
  PencilLine,
  UserCheck,
  UserX,
  Loader2,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define form schema for user creation
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(['admin', 'manager', 'user'], {
    required_error: "Please select a role.",
  }),
});

// Define form schema for user update
const userUpdateSchema = userFormSchema.partial().extend({
  id: z.number(),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;
type UserUpdateValues = z.infer<typeof userUpdateSchema>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export default function UserManagementPage() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if user is authenticated and is admin
  const authQuery = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn<{authenticated: boolean; user: {id: number; email: string; role: string}}>({on401: 'returnNull'}),
  });
  
  // Get all users
  const usersQuery = useQuery({
    queryKey: ['/api/admin/users'],
    queryFn: async () => {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    enabled: isAuthenticated === true && authQuery.data?.user?.role === 'admin',
  });
  
  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: UserFormValues) => {
      return apiRequest('POST', '/api/admin/users', userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setShowAddDialog(false);
      toast({
        title: "User created",
        description: "The user account has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create user. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (userData: UserUpdateValues) => {
      const { id, ...updateData } = userData;
      return apiRequest('PATCH', `/api/admin/users/${id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setShowEditDialog(false);
      toast({
        title: "User updated",
        description: "The user account has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      return apiRequest('DELETE', `/api/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setShowDeleteDialog(false);
      toast({
        title: "User deleted",
        description: "The user account has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Form for creating a new user
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user", // Default role (Sales Executive)
    },
  });
  
  // Form for editing a user
  const editForm = useForm<UserUpdateValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      role: "user",
    },
  });
  
  // Set up edit form when a user is selected for editing
  useEffect(() => {
    if (selectedUser && showEditDialog) {
      editForm.reset({
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role as 'admin' | 'manager' | 'user',
      });
    }
  }, [selectedUser, showEditDialog, editForm]);
  
  // Check auth status and redirect if not authenticated
  useEffect(() => {
    if (authQuery.isSuccess) {
      setIsAuthenticated(!!authQuery.data?.authenticated);
      
      if (!authQuery.data?.authenticated) {
        setLocation('/admin/login');
      } else if (authQuery.data?.user?.role !== 'admin') {
        // Redirect non-admin users
        setLocation('/admin/dashboard');
        toast({
          title: "Access denied",
          description: "You don't have permission to access user management.",
          variant: "destructive",
        });
      }
    } else if (authQuery.isError) {
      setLocation('/admin/login');
    }
  }, [authQuery.isSuccess, authQuery.isError, authQuery.data, setLocation, toast]);
  
  // Handle form submission for creating a user
  function onSubmit(values: UserFormValues) {
    createUserMutation.mutate(values);
  }
  
  // Handle form submission for editing a user
  function onEditSubmit(values: UserUpdateValues) {
    updateUserMutation.mutate(values);
  }
  
  // Filter users based on search query and role filter
  const filteredUsers = usersQuery.data?.users?.filter((user: User) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  }) || [];
  
  // Get role display text
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'manager':
        return 'Manager';
      case 'user':
        return 'Sales Executive';
      default:
        return role;
    }
  };
  
  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'manager':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'user':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  // Reset form when dialog closes
  useEffect(() => {
    if (!showAddDialog) {
      form.reset();
    }
  }, [showAddDialog, form]);
  
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
  
  return (
    <AdminLayout>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Button 
              className="bg-[#FF6B00] text-white hover:bg-[#FF8533]"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>

          {/* Filters bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex-1 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-40">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="All Roles" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">Sales Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {roleFilter !== 'all' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setRoleFilter('all')} 
                  className="h-10"
                >
                  <X className="h-4 w-4 mr-1" /> Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Users table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Manage user accounts and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usersQuery.isLoading ? (
                <div className="py-8 text-center">
                  <p>Loading users...</p>
                </div>
              ) : usersQuery.isError ? (
                <div className="py-8 text-center text-red-500">
                  <p>Error loading users. Please try again.</p>
                </div>
              ) : !filteredUsers.length ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No users found</h3>
                  <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                    {roleFilter !== 'all'
                      ? `There are no users with the "${getRoleDisplayName(roleFilter)}" role.` 
                      : "There are no users matching your search criteria."}
                  </p>
                </div>
              ) : (
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Created On</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: User) => {
                        const isMainAdmin = user.id === 1 && user.role === 'admin';
                        const createdDate = new Date(user.createdAt);
                        const formattedCreatedDate = format(createdDate, 'MMM dd, yyyy');
                        
                        return (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                className={`font-normal border ${getRoleBadgeColor(user.role)}`}
                                variant="outline"
                              >
                                {getRoleDisplayName(user.role)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-500">{formattedCreatedDate}</td>
                            <td className="py-3 px-4 text-right">
                              {isMainAdmin ? (
                                <span className="text-xs text-gray-500">Main Admin (Protected)</span>
                              ) : (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedUser(user);
                                        setShowEditDialog(true);
                                      }}
                                    >
                                      <PencilLine className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedUser(user);
                                        setShowDeleteDialog(true);
                                      }}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add User Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with specific role and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">Sales Executive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-3 border-t">
                <div className="mb-2">
                  <h4 className="text-sm font-medium mb-1">Role Permissions:</h4>
                  <div className="text-sm text-gray-500">
                    {form.watch('role') === 'admin' && (
                      <div className="flex items-center text-blue-600 mb-1">
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        <span>Full access to all features and settings</span>
                      </div>
                    )}
                    {form.watch('role') === 'manager' && (
                      <>
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          <span>Full access to lead management</span>
                        </div>
                        <div className="flex items-center text-red-600 mb-1">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          <span>No access to user management</span>
                        </div>
                      </>
                    )}
                    {form.watch('role') === 'user' && (
                      <>
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          <span>Can view and edit leads</span>
                        </div>
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          <span>Can add notes and update status</span>
                        </div>
                        <div className="flex items-center text-red-600 mb-1">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          <span>Cannot delete leads</span>
                        </div>
                        <div className="flex items-center text-red-600 mb-1">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          <span>No access to user management</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createUserMutation.isPending}
                >
                  {createUserMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create User"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user account details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (Leave empty to keep current)</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter new password or leave blank" 
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">Sales Executive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-3 border-t">
                <div className="mb-2">
                  <h4 className="text-sm font-medium mb-1">Role Permissions:</h4>
                  <div className="text-sm text-gray-500">
                    {editForm.watch('role') === 'admin' && (
                      <div className="flex items-center text-blue-600 mb-1">
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        <span>Full access to all features and settings</span>
                      </div>
                    )}
                    {editForm.watch('role') === 'manager' && (
                      <>
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          <span>Full access to lead management</span>
                        </div>
                        <div className="flex items-center text-red-600 mb-1">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          <span>No access to user management</span>
                        </div>
                      </>
                    )}
                    {editForm.watch('role') === 'user' && (
                      <>
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          <span>Can view and edit leads</span>
                        </div>
                        <div className="flex items-center text-green-600 mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          <span>Can add notes and update status</span>
                        </div>
                        <div className="flex items-center text-red-600 mb-1">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          <span>Cannot delete leads</span>
                        </div>
                        <div className="flex items-center text-red-600 mb-1">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          <span>No access to user management</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update User"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm User Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user?<br />
              <strong>{selectedUser?.name} ({selectedUser?.email})</strong><br /><br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUser) {
                  deleteUserMutation.mutate(selectedUser.id);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}