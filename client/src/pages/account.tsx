import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, Settings, ShoppingBag, User, Package } from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  price: string;
  quantity: number;
  createdAt: string;
}

interface OrderRevision {
  id: number;
  orderId: number;
  userId: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetail {
  order: {
    id: number;
    userId: number;
    status: string;
    totalAmount: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    paymentId: string | null;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
  };
  items: OrderItem[];
  revisions: OrderRevision[];
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  website: string | null;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  authenticated: boolean;
  user?: UserInfo;
}

interface UserResponse {
  user: UserInfo;
}

interface OrdersResponse {
  orders: {
    id: number;
    userId: number;
    status: string;
    totalAmount: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    paymentId: string | null;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface UpdateUserData {
  name?: string;
  phone?: string;
  website?: string;
  password?: string;
  currentPassword?: string;
}

const Account: React.FC = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);
  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  
  // Form states for profile editing
  const [formData, setFormData] = useState<UpdateUserData>({
    name: '',
    phone: '',
    website: '',
  });

  // Form states for password changing
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Check if user is authenticated
  const { data: authData, isLoading: authLoading, error: authError } = useQuery<AuthResponse>({
    queryKey: ['/api/auth/check'],
    retry: false
  });

  // Get user info
  const { data: userData, isLoading: userLoading } = useQuery<UserResponse>({
    queryKey: ['/api/users/me'],
    enabled: !!authData?.authenticated,
    refetchOnWindowFocus: false
  });

  // Fetch user orders
  const { data: ordersData, isLoading: ordersLoading } = useQuery<OrdersResponse>({
    queryKey: ['/api/orders'],
    enabled: !!authData?.authenticated,
    refetchOnWindowFocus: false
  });
  
  // Fetch order details when an order is selected
  const { isLoading: orderDetailsLoading } = useQuery<OrderDetail>({
    queryKey: ['/api/orders', selectedOrderId],
    enabled: !!selectedOrderId,
    refetchOnWindowFocus: false
  });
  
  // Set order details when data changes
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (selectedOrderId) {
        try {
          const data = await queryClient.fetchQuery({
            queryKey: ['/api/orders', selectedOrderId]
          });
          setOrderDetails(data as OrderDetail);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };
    
    fetchOrderDetails();
  }, [selectedOrderId]);

  // Update user profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateUserData) => 
      apiRequest('/api/users/me', 'PATCH', data),
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      });
      setEditProfileMode(false);
      queryClient.invalidateQueries({ queryKey: ['/api/users/me'] });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (data: {currentPassword: string, password: string}) => 
      apiRequest('/api/users/password', 'PATCH', data),
    onSuccess: () => {
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
        variant: "default",
      });
      setChangePasswordMode(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    },
    onError: () => {
      toast({
        title: "Password Change Failed",
        description: "Failed to change your password. Please check your current password and try again.",
        variant: "destructive",
      });
    }
  });

  // Create revision mutation
  const createRevisionMutation = useMutation({
    mutationFn: (data: {orderId: number, description: string}) => 
      apiRequest('/api/orders/revision', 'POST', data),
    onSuccess: () => {
      toast({
        title: "Revision Requested",
        description: "Your revision request has been submitted successfully.",
        variant: "default",
      });
      setIsRevisionDialogOpen(false);
      setRevisionText('');
      
      // Refresh order details
      if (selectedOrderId) {
        queryClient.invalidateQueries({ queryKey: ['/api/orders', selectedOrderId] });
      }
    },
    onError: () => {
      toast({
        title: "Request Failed",
        description: "Failed to submit your revision request. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('/api/auth/logout', 'POST'),
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        variant: "default",
      });
    }
  });
  
  // Handle authentication check
  useEffect(() => {
    if (authError || (authData && !authData.authenticated)) {
      navigate('/addons');
    }
  }, [authData, authError, navigate]);

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (userData?.user) {
      setFormData({
        name: userData.user.name || '',
        phone: userData.user.phone || '',
        website: userData.user.website || '',
      });
    }
  }, [userData]);

  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile update submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  // Handle password change submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    
    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      password: passwordData.newPassword
    });
  };

  // Handle revision request submission
  const handleRevisionSubmit = () => {
    if (!revisionText.trim() || !selectedOrderId) return;
    
    createRevisionMutation.mutate({
      orderId: selectedOrderId,
      description: revisionText
    });
  };

  const handleSelectOrder = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your account...</span>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Profile Information
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => setEditProfileMode(!editProfileMode)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {editProfileMode ? 'Cancel' : 'Edit'}
                  </Button>
                </CardTitle>
                <CardDescription>
                  Your personal information
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {userLoading ? (
                  <div className="flex items-center justify-center h-52">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : userData?.user ? (
                  <>
                    {editProfileMode ? (
                      <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input 
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            placeholder="Your phone number"
                            value={formData.phone || ''}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Website (optional)</Label>
                          <Input 
                            id="website"
                            name="website"
                            placeholder="Your website URL"
                            value={formData.website || ''}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                          <Button 
                            type="submit" 
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-4 bg-primary text-white">
                            <AvatarFallback>{userData.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-lg">{userData.user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              <Badge variant="outline">{userData.user.role}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid gap-1">
                          <div className="text-sm font-medium">Email</div>
                          <div>{userData.user.email}</div>
                        </div>
                        
                        <div className="grid gap-1">
                          <div className="text-sm font-medium">Phone</div>
                          <div>{userData.user.phone || '—'}</div>
                        </div>
                        
                        <div className="grid gap-1">
                          <div className="text-sm font-medium">Website</div>
                          <div>{userData.user.website ? (
                            <a 
                              href={userData.user.website.startsWith('http') 
                                ? userData.user.website 
                                : `http://${userData.user.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {userData.user.website}
                            </a>
                          ) : '—'}</div>
                        </div>
                        
                        <div className="grid gap-1">
                          <div className="text-sm font-medium">Member Since</div>
                          <div>{format(new Date(userData.user.createdAt), 'MMMM dd, yyyy')}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Error loading profile information
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Change Password</h3>
                    {changePasswordMode ? (
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input 
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            placeholder="Your current password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Your new password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                            minLength={6}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            minLength={6}
                          />
                        </div>
                        
                        <div className="pt-4 flex space-x-2 justify-end">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setChangePasswordMode(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={changePasswordMutation.isPending}
                          >
                            {changePasswordMutation.isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Update Password
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <Button 
                        onClick={() => setChangePasswordMode(true)}
                        className="w-full md:w-auto"
                      >
                        Change Password
                      </Button>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Logout</h3>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="w-full md:w-auto"
                      disabled={logoutMutation.isPending}
                    >
                      {logoutMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="mr-2 h-4 w-4" />
                      )}
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View your past orders and their status
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {ordersLoading ? (
                  <div className="flex items-center justify-center h-52">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : ordersData?.orders && ordersData.orders.length > 0 ? (
                  <div className="space-y-4">
                    {ordersData.orders.map((order) => (
                      <Card 
                        key={order.id} 
                        className={`cursor-pointer transition-colors ${
                          selectedOrderId === order.id
                            ? 'border-primary'
                            : 'hover:border-primary-600/20'
                        }`}
                        onClick={() => handleSelectOrder(order.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <div className="font-medium">Order #{order.id}</div>
                            <Badge 
                              variant={
                                order.status === 'completed' ? 'default' : 
                                order.status === 'cancelled' ? 'destructive' : 
                                order.status === 'in_progress' ? 'outline' : 
                                'secondary'
                              }
                            >
                              {order.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <div className="text-muted-foreground">
                              {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                            </div>
                            <div>₹{order.totalAmount}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>You haven't placed any orders yet.</p>
                    <Button 
                      variant="link" 
                      className="mt-2" 
                      onClick={() => navigate('/addons')}
                    >
                      Browse Addons
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>
                  {selectedOrderId ? `Order #${selectedOrderId}` : 'Select an order to view details'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {selectedOrderId ? (
                  orderDetailsLoading ? (
                    <div className="flex items-center justify-center h-52">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : orderDetails ? (
                    <div className="space-y-6">
                      {/* Order Summary */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="text-muted-foreground">Status:</div>
                          <div>
                            <Badge 
                              variant={
                                orderDetails.order.status === 'completed' ? 'default' : 
                                orderDetails.order.status === 'cancelled' ? 'destructive' : 
                                orderDetails.order.status === 'in_progress' ? 'outline' : 
                                'secondary'
                              }
                            >
                              {orderDetails.order.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="text-muted-foreground">Date:</div>
                          <div>{format(new Date(orderDetails.order.createdAt), 'MMMM dd, yyyy')}</div>
                          
                          <div className="text-muted-foreground">Total Amount:</div>
                          <div className="font-medium">₹{orderDetails.order.totalAmount}</div>
                          
                          <div className="text-muted-foreground">Payment Status:</div>
                          <div>
                            <Badge variant={
                              orderDetails.order.paymentStatus === 'completed' ? 'default' : 
                              'secondary'
                            }>
                              {orderDetails.order.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Items</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Qty</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orderDetails.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell className="text-right">₹{item.price}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">₹{parseFloat(item.price) * item.quantity}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={3}>Total</TableCell>
                              <TableCell className="text-right">₹{orderDetails.order.totalAmount}</TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </div>
                      
                      {/* Revisions */}
                      {orderDetails.revisions.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Revision Requests</h3>
                          <div className="space-y-3">
                            {orderDetails.revisions.map((revision) => (
                              <Card key={revision.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between mb-1">
                                    <div className="text-sm text-muted-foreground">
                                      {format(new Date(revision.createdAt), 'MMM dd, yyyy - h:mm a')}
                                    </div>
                                    <Badge variant={
                                      revision.status === 'completed' ? 'default' : 
                                      revision.status === 'rejected' ? 'destructive' : 
                                      'secondary'
                                    }>
                                      {revision.status}
                                    </Badge>
                                  </div>
                                  <div className="text-sm mt-2">{revision.description}</div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Request Revision Button - Show only for completed orders */}
                      {orderDetails.order.status === 'completed' && (
                        <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Request Revision
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Request Revision</DialogTitle>
                              <DialogDescription>
                                Please describe what changes you would like to request.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Label htmlFor="revision-description">Description</Label>
                              <Textarea
                                id="revision-description"
                                placeholder="Describe the changes you need..."
                                value={revisionText}
                                onChange={(e) => setRevisionText(e.target.value)}
                                className="mt-2"
                                rows={5}
                              />
                            </div>
                            <DialogFooter>
                              <Button 
                                variant="outline" 
                                onClick={() => setIsRevisionDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleRevisionSubmit}
                                disabled={!revisionText.trim() || createRevisionMutation.isPending}
                              >
                                {createRevisionMutation.isPending && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Submit Request
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Error loading order details
                    </div>
                  )
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Select an order to view its details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;