import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Users, Settings, LogOut, BarChart, LineChart, Briefcase, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ManagerDashboard() {
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
          <h1 className="text-3xl font-bold text-primary">Manager Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="mt-4 md:mt-0">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">42</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">18</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">6 due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 on leave</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">₹6.2L</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current status of active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectStatus.map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm">{project.progress}%</p>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <p>Assigned: {project.teamMember}</p>
                    <p>Due: {project.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual team member productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamPerformance.map((member) => (
                <div key={member.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm">{member.completionRate}%</p>
                  </div>
                  <Progress value={member.completionRate} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <p>Assigned: {member.tasksAssigned} tasks</p>
                    <p>Completed: {member.tasksCompleted} tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Project Pipeline</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Project Name</th>
              <th className="text-left py-3 px-4">Client</th>
              <th className="text-left py-3 px-4">Team Lead</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Timeline</th>
              <th className="text-left py-3 px-4">Budget</th>
            </tr>
          </thead>
          <tbody>
            {projectPipeline.map((project) => (
              <tr key={project.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">{project.name}</td>
                <td className="py-3 px-4">{project.client}</td>
                <td className="py-3 px-4">{project.teamLead}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-3 px-4">{project.timeline}</td>
                <td className="py-3 px-4">₹{project.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusClass(status: string): string {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "On Hold":
      return "bg-yellow-100 text-yellow-800";
    case "Planning":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Sample data (in a real app, this would come from an API)
const projectStatus = [
  {
    id: 1,
    name: "TechSolutions Website Redesign",
    progress: 75,
    teamMember: "Arjun Mehta",
    dueDate: "Apr 15",
  },
  {
    id: 2,
    name: "GreenLife Branding",
    progress: 45,
    teamMember: "Priya Sharma",
    dueDate: "Apr 30",
  },
  {
    id: 3,
    name: "FoodFusion App UI",
    progress: 90,
    teamMember: "Rahul Patel",
    dueDate: "Apr 10",
  },
  {
    id: 4,
    name: "Edutech Marketing Campaign",
    progress: 30,
    teamMember: "Neha Singh",
    dueDate: "May 5",
  },
];

const teamPerformance = [
  {
    id: 1,
    name: "Arjun Mehta",
    completionRate: 92,
    tasksAssigned: 25,
    tasksCompleted: 23,
  },
  {
    id: 2,
    name: "Priya Sharma",
    completionRate: 85,
    tasksAssigned: 20,
    tasksCompleted: 17,
  },
  {
    id: 3,
    name: "Rahul Patel",
    completionRate: 95,
    tasksAssigned: 22,
    tasksCompleted: 21,
  },
  {
    id: 4,
    name: "Neha Singh",
    completionRate: 78,
    tasksAssigned: 18,
    tasksCompleted: 14,
  },
];

const projectPipeline = [
  {
    id: 1,
    name: "TechSolutions Website",
    client: "TechSolutions Pvt Ltd",
    teamLead: "Arjun Mehta",
    status: "In Progress",
    timeline: "Mar 15 - Apr 15",
    budget: "1,50,000",
  },
  {
    id: 2,
    name: "GreenLife Branding",
    client: "GreenLife Organics",
    teamLead: "Priya Sharma",
    status: "Planning",
    timeline: "Apr 1 - Apr 30",
    budget: "2,25,000",
  },
  {
    id: 3,
    name: "FoodFusion App UI",
    client: "FoodFusion Restaurants",
    teamLead: "Rahul Patel",
    status: "In Progress",
    timeline: "Mar 20 - Apr 10",
    budget: "1,80,000",
  },
  {
    id: 4,
    name: "Edutech Marketing",
    client: "LearnSmart Education",
    teamLead: "Neha Singh",
    status: "On Hold",
    timeline: "Apr 5 - May 5",
    budget: "2,50,000",
  },
  {
    id: 5,
    name: "HealthPlus Brand Refresh",
    client: "HealthPlus Clinics",
    teamLead: "Vikram Desai",
    status: "Completed",
    timeline: "Feb 10 - Mar 15",
    budget: "1,25,000",
  },
];