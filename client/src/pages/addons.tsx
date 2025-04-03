import React, { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShoppingCart, Plus, Minus, Trash2, Check, ShoppingBag, LogIn } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { scrollToTop } from "@/lib/scrollHelper";

// Types
interface AddonProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  isActive: boolean;
}

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product?: AddonProduct;
}

interface Order {
  id: number;
  status: string;
  totalAmount: string;
  createdAt: string;
}

interface OrderDetail extends Order {
  items: {
    id: number;
    productName: string;
    price: string;
    quantity: number;
  }[];
  revisions: {
    id: number;
    description: string;
    status: string;
    createdAt: string;
  }[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Auth context
const AuthContext = React.createContext<{
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check", {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    setUser(userData);
    // Store in localStorage
    localStorage.setItem("token", token);
    toast({
      title: "Login Successful",
      description: `Welcome back, ${userData.name}!`,
    });
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("token");
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Auth hook
export const useAuth = () => React.useContext(AuthContext);

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register form schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Checkout form schema
const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
});

// Login Dialog
const LoginDialog: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      password: "",
      confirmPassword: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.user && data.token) {
        login(data.token, data.user);
        setIsOpen(false);
        onLogin();
      }
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      const response = await apiRequest("POST", "/api/auth/register", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.user && data.token) {
        login(data.token, data.user);
        setIsOpen(false);
        onLogin();
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: "This email may already be registered. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    registerMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-black hover:text-white">
          <LogIn className="w-4 h-4" />
          Login / Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isRegistering ? "Create an Account" : "Login to Your Account"}</DialogTitle>
          <DialogDescription>
            {isRegistering
              ? "Register to track your orders and request revisions."
              : "Login to manage your add-on services and orders."}
          </DialogDescription>
        </DialogHeader>

        {isRegistering ? (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your website URL (if any)" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Create a password" type="password" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password" type="password" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsRegistering(false)}
                >
                  Already have an account?
                </Button>
                <Button type="submit" disabled={registerMutation.isPending}>
                  {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} autoComplete="current-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsRegistering(true)}
                >
                  Need an account?
                </Button>
                <Button type="submit" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Cart component
const Cart: React.FC<{
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}> = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const totalAmount = items.reduce((total, item) => {
    return total + (parseFloat(item.product?.price || "0") * item.quantity);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Button variant="outline" disabled>
          Proceed to Checkout
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4">Your Cart</h3>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{item.product?.name}</p>
              <p className="text-gray-600 text-sm">₹{item.product?.price} × {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-500"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-semibold mb-4">
        <span>Total:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <Button className="w-full" onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

// Checkout dialog
const CheckoutDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}> = ({ isOpen, onClose, cartItems }) => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const totalAmount = cartItems.reduce((total, item) => {
    return total + (parseFloat(item.product?.price || "0") * item.quantity);
  }, 0);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (data: z.infer<typeof checkoutSchema>) => {
      const response = await apiRequest("POST", "/api/checkout", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been placed. We'll contact you soon.",
      });
      onClose();
      navigate("/addons?orderSuccess=true");
    },
    onError: (error) => {
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    checkoutMutation.mutate(data);
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Provide your contact details to confirm your order.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="border rounded-lg p-3 mb-4 bg-gray-50">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.product?.name} × {item.quantity}
                </span>
                <span>₹{(parseFloat(item.product?.price || "0") * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} autoComplete="name" />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} autoComplete="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific details about your order..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={checkoutMutation.isPending}>
                {checkoutMutation.isPending ? "Processing..." : "Confirm Order"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// User Orders component
const UserOrders: React.FC = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  
  // Fetch user orders
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["/api/orders"],
    enabled: true,
  });

  // Fetch order details when an order is selected
  const { data: orderDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["/api/orders", selectedOrder?.id],
    enabled: !!selectedOrder,
  });

  useEffect(() => {
    if (orderDetails) {
      setSelectedOrder(orderDetails);
    }
  }, [orderDetails]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading your orders...</div>;
  }

  if (!ordersData || ordersData.orders.length === 0) {
    return <div className="p-4 text-center">You don't have any orders yet.</div>;
  }

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4">Your Orders</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData.orders.map((order: Order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>₹{order.totalAmount}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(order as OrderDetail)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Placed on {formatDate(selectedOrder.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Status:</h3>
                {getStatusBadge(selectedOrder.status)}
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Order Items:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-right font-semibold p-2">
                        Total Amount:
                      </td>
                      <td className="text-right font-semibold p-2">
                        ₹{selectedOrder.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>

              {selectedOrder.status === "completed" && (
                <div>
                  <h3 className="font-semibold mb-2">Revisions:</h3>
                  {selectedOrder.revisions && selectedOrder.revisions.length > 0 ? (
                    <div className="space-y-2">
                      {selectedOrder.revisions.map((revision) => (
                        <div key={revision.id} className="border p-3 rounded">
                          <div className="flex justify-between">
                            <span className="font-medium">Request Date: {formatDate(revision.createdAt)}</span>
                            {getStatusBadge(revision.status)}
                          </div>
                          <p className="mt-2">{revision.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No revision requests yet.</p>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Main page component
const AddonsPage: React.FC = () => {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showUserOrders, setShowUserOrders] = useState(false);
  
  // Get products
  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["/api/addons"],
    enabled: true,
  });

  // Get cart items if authenticated
  const { data: cartData, isLoading: isLoadingCart, refetch: refetchCart } = useQuery({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", "/api/cart", { productId, quantity: 1 });
      return response.json();
    },
    onSuccess: () => {
      refetchCart();
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart.",
      });
      setShowCartSidebar(true);
    },
    onError: (error) => {
      if (!isAuthenticated) {
        toast({
          title: "Login Required",
          description: "Please login or register to add items to your cart.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to Add Item",
          description: "There was an error adding this item to your cart.",
          variant: "destructive",
        });
      }
    },
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const response = await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      refetchCart();
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update cart item quantity.",
        variant: "destructive",
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/cart/${id}`);
      return response.json();
    },
    onSuccess: () => {
      refetchCart();
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Remove Failed",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  // Handle add to cart
  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login or register to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    addToCartMutation.mutate(productId);
  };

  // Handle update quantity
  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateCartItemMutation.mutate({ id, quantity });
  };

  // Handle remove from cart
  const handleRemoveItem = (id: number) => {
    removeFromCartMutation.mutate(id);
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
    setShowCartSidebar(false);
  };

  // Check if cart has items
  const cartItems = cartData?.cart || [];
  const cartItemCount = cartItems.length;

  // Check for order success parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split("?")[1]);
    if (searchParams.get("orderSuccess") === "true") {
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your order! We'll contact you shortly.",
      });
      navigate("/addons", { replace: true });
    }
  }, [location, navigate, toast]);

  // Handle login success
  const handleLoginSuccess = () => {
    refetchCart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-[#0066CC] to-[#004999] text-white py-16 pt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Website Add-on Services</h1>
              <p className="text-xl mb-8">
                Explore our additional services that can be added to your existing website. Choose the service you want, and our team will contact you to complete the task.
              </p>
              <div className="flex justify-center gap-4">
                {isAuthenticated ? (
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => setShowUserOrders(true)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    View Your Orders
                  </Button>
                ) : (
                  <LoginDialog onLogin={handleLoginSuccess} />
                )}
                <Button
                  variant={cartItemCount > 0 ? "default" : "outline"}
                  className="flex items-center gap-2 relative text-black hover:text-white"
                  onClick={() => setShowCartSidebar(true)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Your Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className="py-16 pt-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Available Services</h2>
            
            {isLoadingProducts ? (
              <div className="flex justify-center items-center h-32">
                <p>Loading services...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsData?.products.map((product: AddonProduct) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-[#FF6B00]">
                        ₹{product.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{product.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 text-black hover:text-white"
                              onClick={() => handleAddToCart(product.id)}
                              disabled={addToCartMutation.isPending}
                            >
                              <Plus className="w-4 h-4" />
                              Add to Cart
                            </Button>
                          </TooltipTrigger>
                          {!isAuthenticated && (
                            <TooltipContent>
                              <p>Please login first to add to cart</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 pt-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-[#0066CC] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Choose Services</h3>
                  <p className="text-gray-600">Browse and select the services you want to add to your website.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-[#0066CC] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
                  <p className="text-gray-600">Complete the checkout process with your contact details.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-[#0066CC] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                  <p className="text-gray-600">Monitor the status of your order and request revisions if needed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 pt-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How long does it take to complete a service?</h3>
                <p className="text-gray-600">Most services are completed within 3-5 business days. Complex services may take longer. For urgent requests, you can choose the Fast Delivery option.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Can I request revisions?</h3>
                <p className="text-gray-600">Yes, you can request revisions after the service is marked as completed. Log in to your account to view your orders and request changes.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">What payment methods are accepted?</h3>
                <p className="text-gray-600">We accept various payment methods including credit/debit cards, UPI, and net banking through our secure payment gateway.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">What if I'm not satisfied with the service?</h3>
                <p className="text-gray-600">Customer satisfaction is our priority. If you're not satisfied, you can request revisions or contact our support team for assistance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform z-50 ${
          showCartSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowCartSidebar(false)}
          >
            ×
          </Button>
        </div>
        
        {isLoadingCart ? (
          <div className="p-4 text-center">Loading cart...</div>
        ) : (
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
            onCheckout={handleProceedToCheckout}
          />
        )}
      </div>
      
      {/* Checkout Dialog */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
      />
      
      {/* User Orders Dialog */}
      <Dialog open={showUserOrders} onOpenChange={setShowUserOrders}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Your Orders</DialogTitle>
            <DialogDescription>
              View and manage your orders and request revisions for completed services.
            </DialogDescription>
          </DialogHeader>
          
          <UserOrders />
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUserOrders(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Overlay for cart sidebar */}
      {showCartSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowCartSidebar(false)}
        />
      )}
      
      <Footer />
      <WhatsappButton />
    </div>
  );
};

// Export with AuthProvider
const AddonsPageWithAuth: React.FC = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <AuthProvider>
      <AddonsPage />
    </AuthProvider>
  );
};

export default AddonsPageWithAuth;