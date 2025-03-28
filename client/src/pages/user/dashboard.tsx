import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Users, Settings, LogOut, MessageSquare } from "lucide-react";

export default function UserDashboard() {
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
          <h1 className="text-3xl font-bold text-primary">User Dashboard</h1>
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
            <CardTitle className="text-lg font-medium">Projects</CardTitle>
            <CardDescription>Track your ongoing projects</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </div>
            <FileText className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Clients</CardTitle>
            <CardDescription>Manage your client relationships</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
            <Users className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Settings className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Your latest client communications</CardDescription>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <ul className="space-y-4">
                {recentMessages.map((message, index) => (
                  <li key={index} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{message.from}</p>
                        <p className="text-sm text-muted-foreground">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-6">No recent messages</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Updates</CardTitle>
            <CardDescription>Latest changes to your projects</CardDescription>
          </CardHeader>
          <CardContent>
            {projectUpdates.length > 0 ? (
              <ul className="space-y-4">
                {projectUpdates.map((update, index) => (
                  <li key={index} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{update.project}</p>
                        <p className="text-sm text-muted-foreground">{update.status}</p>
                        <p className="text-xs text-muted-foreground mt-1">{update.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-6">No recent updates</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Sample data (in a real app, this would come from an API)
const recentMessages = [
  {
    from: "Rahul Sharma",
    subject: "Logo design feedback",
    time: "Today, 10:30 AM",
  },
  {
    from: "Priya Patel",
    subject: "Website redesign discussion",
    time: "Yesterday, 4:15 PM",
  },
  {
    from: "Amit Kumar",
    subject: "Social media campaign review",
    time: "Mar 27, 2:00 PM",
  },
];

const projectUpdates = [
  {
    project: "TechSolutions Brand Refresh",
    status: "Design phase completed",
    time: "Today, 9:15 AM",
  },
  {
    project: "GreenLife Website Redesign",
    status: "Development in progress - 60% complete",
    time: "Yesterday, 3:30 PM",
  },
  {
    project: "FoodFusion Marketing Campaign",
    status: "Content creation started",
    time: "Mar 27, 1:45 PM",
  },
];