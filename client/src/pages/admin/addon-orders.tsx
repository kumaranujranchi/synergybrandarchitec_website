import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import { AdminNeedsAuth } from "@/components/admin-needs-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  PlayCircle 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Order interface
interface Order {
  id: number;
  userId: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Order item interface
interface OrderItem {
  id: number;
  productName: string;
  price: string;
  quantity: number;
}

// Order revision interface
interface OrderRevision {
  id: number;
  description: string;
  status: string;
  createdAt: string;
}

const AddonOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    items: OrderItem[];
    revisions: OrderRevision[];
  } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch orders with optional status filter
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["/api/admin/orders", statusFilter],
    queryFn: async () => {
      const url = statusFilter 
        ? `/api/admin/orders?status=${statusFilter}`
        : "/api/admin/orders";
      const response = await apiRequest({ url, method: "GET" });
      return response;
    },
  });

  // Fetch order details when order is selected
  const { data: orderDetailData, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["/api/orders", selectedOrder?.id],
    enabled: !!selectedOrder,
    queryFn: async () => {
      const response = await apiRequest({
        url: `/api/orders/${selectedOrder?.id}`,
        method: "GET",
      });
      return response;
    },
    onSuccess: (data) => {
      if (data) {
        setOrderDetails({
          items: data.items || [],
          revisions: data.revisions || [],
        });
      }
    },
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return apiRequest({
        url: `/api/admin/orders/${id}`,
        method: "PATCH",
        data: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders", selectedOrder?.id] });
      toast({
        title: "Status Updated",
        description: "The order status has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status. Please try again.",
      });
    },
  });

  // Handle status change
  const handleStatusChange = (status: string) => {
    if (selectedOrder) {
      updateStatusMutation.mutate({ id: selectedOrder.id, status });
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <PlayCircle className="w-3 h-3" />
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminNeedsAuth>
      <AdminLayout
        title="Add-on Orders"
        description="Manage customer orders from the Addons page"
      >
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add-on Orders</h1>
          <Select
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && <div className="text-center p-6">Loading orders...</div>}

        {ordersData && ordersData.orders && ordersData.orders.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}

        {ordersData && ordersData.orders && ordersData.orders.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
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
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.name}</div>
                          <div className="text-xs text-gray-500">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>₹{order.totalAmount}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Order Detail Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
            </DialogHeader>

            {isLoadingDetails ? (
              <div className="text-center p-6">Loading order details...</div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="font-medium">Name:</dt>
                          <dd>{selectedOrder?.name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">Email:</dt>
                          <dd>{selectedOrder?.email}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">Phone:</dt>
                          <dd>{selectedOrder?.phone}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">Date:</dt>
                          <dd>{selectedOrder && formatDate(selectedOrder.createdAt)}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="mb-2">Current Status:</p>
                        <div>{selectedOrder && getStatusBadge(selectedOrder.status)}</div>
                      </div>
                      <div>
                        <p className="mb-2">Update Status:</p>
                        <Select
                          value={selectedOrder?.status || ""}
                          onValueChange={handleStatusChange}
                          disabled={updateStatusMutation.isPending}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderDetails?.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.productName}</TableCell>
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
                            ₹{selectedOrder?.totalAmount}
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                  </CardContent>
                </Card>

                {selectedOrder?.message && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Customer Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{selectedOrder.message}</p>
                    </CardContent>
                  </Card>
                )}

                {orderDetails?.revisions && orderDetails.revisions.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Revision Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {orderDetails.revisions.map((revision, index) => (
                          <AccordionItem key={revision.id} value={`revision-${revision.id}`}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center justify-between w-full">
                                <span>Revision #{index + 1} - {formatDate(revision.createdAt)}</span>
                                {getStatusBadge(revision.status)}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="whitespace-pre-wrap">{revision.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </AdminNeedsAuth>
  );
};

export default AddonOrdersPage;