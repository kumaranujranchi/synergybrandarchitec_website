import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  FileText, 
  LogOut, 
  CreditCard, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileEdit,
  MessageSquare,
  Download
} from "lucide-react";

export default function CustomerDashboard() {
  const { user, isLoading, logoutMutation } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-primary mb-4">Session Expired</h1>
        <p className="text-muted-foreground mb-6">Your session has expired. Please log in again.</p>
        <Button onClick={() => window.location.href = "/auth"}>Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Customer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="mt-4 md:mt-0">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Active Orders</CardTitle>
            <CardDescription>Your current order status</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <Package className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Completed Projects</CardTitle>
            <CardDescription>Projects delivered to you</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </div>
            <CheckCircle className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Payment Status</CardTitle>
            <CardDescription>Your billing information</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold">₹15,000</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <CreditCard className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          <ScrollArea className="h-[500px] rounded-md border p-4">
            <div className="space-y-8">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{order.service}</CardTitle>
                        <CardDescription>Order ID: #{order.id}</CardDescription>
                      </div>
                      <Badge className={getStatusBadgeStyle(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Ordered Date</p>
                        <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivery Date</p>
                        <p className="text-sm text-muted-foreground">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Amount</p>
                        <p className="text-sm text-muted-foreground">₹{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assigned To</p>
                        <p className="text-sm text-muted-foreground">{order.assignedTo}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      <FileEdit className="mr-2 h-4 w-4" />
                      Request Revision
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Messages</h2>
          <ScrollArea className="h-[500px] rounded-md border p-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{message.subject}</CardTitle>
                        <CardDescription>From: {message.from}</CardDescription>
                      </div>
                      <p className="text-xs text-muted-foreground">{message.date}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{message.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="deliverables" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Your Deliverables</h2>
          <ScrollArea className="h-[500px] rounded-md border p-4">
            <div className="space-y-6">
              {deliverables.map((deliverable) => (
                <Card key={deliverable.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{deliverable.title}</CardTitle>
                        <CardDescription>Project: {deliverable.project}</CardDescription>
                      </div>
                      <Badge variant="outline">{deliverable.fileType}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Delivered On</p>
                        <p className="text-sm text-muted-foreground">{deliverable.deliveredDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">File Size</p>
                        <p className="text-sm text-muted-foreground">{deliverable.fileSize}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-4">{deliverable.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getStatusBadgeStyle(status: string): string {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 hover:bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 hover:bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 hover:bg-yellow-100 text-yellow-800";
    case "Delivered":
      return "bg-purple-100 hover:bg-purple-100 text-purple-800";
    default:
      return "";
  }
}

// Sample data (in a real app, this would come from an API)
const orders = [
  {
    id: "ORD001",
    service: "Brand Identity Design",
    status: "In Progress",
    orderDate: "Mar 15, 2025",
    deliveryDate: "Apr 5, 2025",
    amount: "12,000",
    assignedTo: "Priya Sharma",
  },
  {
    id: "ORD002",
    service: "Website Redesign",
    status: "Pending",
    orderDate: "Mar 20, 2025",
    deliveryDate: "Apr 10, 2025",
    amount: "25,000",
    assignedTo: "Arjun Mehta",
  },
  {
    id: "ORD003",
    service: "Social Media Campaign",
    status: "Completed",
    orderDate: "Feb 10, 2025",
    deliveryDate: "Mar 5, 2025",
    amount: "8,000",
    assignedTo: "Rahul Patel",
  },
  {
    id: "ORD004",
    service: "Logo Design",
    status: "Delivered",
    orderDate: "Jan 25, 2025",
    deliveryDate: "Feb 15, 2025",
    amount: "5,000",
    assignedTo: "Neha Singh",
  },
];

const messages = [
  {
    id: 1,
    subject: "Brand Identity Design Update",
    from: "Priya Sharma (Designer)",
    date: "Today, 11:30 AM",
    content: "Hello! I've completed the initial mood board and color palette for your brand identity project. I'll need your feedback before proceeding to the next phase. Please review the attached files and let me know your thoughts at your earliest convenience.",
  },
  {
    id: 2,
    subject: "Website Redesign Project Kickoff",
    from: "Arjun Mehta (Project Manager)",
    date: "Yesterday, 3:45 PM",
    content: "Thank you for choosing our services for your website redesign. I'll be managing your project and would like to schedule a kickoff call to discuss your requirements in detail and set expectations. Are you available for a 30-minute call tomorrow between 2-5 PM?",
  },
  {
    id: 3,
    subject: "Social Media Campaign Report",
    from: "Rahul Patel (Marketing Specialist)",
    date: "Mar 10, 2025",
    content: "I'm pleased to share the final report for your completed social media campaign. We've exceeded the engagement targets by 15% and gained 250+ new followers for your brand. The detailed analytics are attached. Let me know if you'd like to schedule a review call.",
  },
];

const deliverables = [
  {
    id: 1,
    title: "Brand Style Guide",
    project: "Brand Identity Design",
    fileType: "PDF",
    deliveredDate: "Mar 25, 2025",
    fileSize: "12.5 MB",
    description: "Comprehensive brand style guide including logo usage, color palette, typography, and brand applications.",
  },
  {
    id: 2,
    title: "Logo Files Package",
    project: "Logo Design",
    fileType: "ZIP",
    deliveredDate: "Feb 15, 2025",
    fileSize: "45 MB",
    description: "Complete logo package with all file formats (AI, EPS, PNG, JPG, SVG) in various color versions and sizes for all applications.",
  },
  {
    id: 3,
    title: "Social Media Campaign Assets",
    project: "Social Media Campaign",
    fileType: "ZIP",
    deliveredDate: "Mar 5, 2025",
    fileSize: "78 MB",
    description: "Full set of optimized graphics for Facebook, Instagram, Twitter, and LinkedIn including posts, stories, and cover images.",
  },
  {
    id: 4,
    title: "Website Wireframes",
    project: "Website Redesign",
    fileType: "PDF",
    deliveredDate: "Mar 22, 2025",
    fileSize: "8.2 MB",
    description: "Initial wireframes for homepage, about us, services, and contact pages based on the approved sitemap.",
  },
];