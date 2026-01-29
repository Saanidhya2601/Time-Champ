import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  LogOut,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart as RechartsPie, Pie, Cell, AreaChart, Area } from "recharts";

// Mock data
const leaveRequests = [
  { id: 1, employee: "Sarah Johnson", type: "Annual Leave", startDate: "Dec 20", endDate: "Dec 24", days: 5, status: "pending", reason: "Family vacation" },
  { id: 2, employee: "Mike Chen", type: "Sick Leave", startDate: "Dec 15", endDate: "Dec 16", days: 2, status: "pending", reason: "Medical appointment" },
  { id: 3, employee: "Emily Davis", type: "Personal", startDate: "Dec 18", endDate: "Dec 18", days: 1, status: "approved", reason: "Personal matters" },
  { id: 4, employee: "James Wilson", type: "Annual Leave", startDate: "Dec 26", endDate: "Dec 31", days: 6, status: "pending", reason: "Year-end holiday" },
  { id: 5, employee: "Lisa Anderson", type: "Sick Leave", startDate: "Dec 10", endDate: "Dec 11", days: 2, status: "rejected", reason: "Flu" },
];

const monthlyPerformance = [
  { month: "Jul", attendance: 94, productivity: 88, onTime: 92 },
  { month: "Aug", attendance: 96, productivity: 91, onTime: 94 },
  { month: "Sep", attendance: 93, productivity: 87, onTime: 90 },
  { month: "Oct", attendance: 97, productivity: 93, onTime: 95 },
  { month: "Nov", attendance: 95, productivity: 90, onTime: 93 },
  { month: "Dec", attendance: 96, productivity: 92, onTime: 94 },
];

const departmentData = [
  { name: "Engineering", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Marketing", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Sales", value: 25, color: "hsl(var(--chart-3))" },
  { name: "HR", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Finance", value: 10, color: "hsl(var(--chart-5))" },
];

const hoursWorked = [
  { week: "Week 1", hours: 850 },
  { week: "Week 2", hours: 920 },
  { week: "Week 3", hours: 880 },
  { week: "Week 4", hours: 905 },
];

const HRDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(leaveRequests);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleApprove = (id: number) => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: "approved" } : req)
    );
    toast.success("Leave request approved");
  };

  const handleReject = (id: number) => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: "rejected" } : req)
    );
    toast.error("Leave request rejected");
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const approvedCount = requests.filter(r => r.status === "approved").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-chart-1/20 text-chart-5 border-chart-1/30">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Time<span className="text-primary">Champ</span>
            </h1>
            <Badge variant="secondary" className="ml-2">HR Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-muted-foreground">HR Administrator</p>
              <p className="font-semibold text-foreground">Admin User</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Employees"
            value="48"
            trend="+3 this month"
          />
          <StatCard
            icon={<AlertCircle className="h-5 w-5" />}
            label="Pending Requests"
            value={pendingCount.toString()}
            trend="Needs attention"
            highlight
          />
          <StatCard
            icon={<CheckCircle className="h-5 w-5" />}
            label="Approved Today"
            value={approvedCount.toString()}
            trend="All processed"
          />
          <StatCard
            icon={<Activity className="h-5 w-5" />}
            label="Avg Productivity"
            value="92%"
            trend="+2% from last month"
          />
        </div>

        <Tabs defaultValue="leave" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="leave" className="text-base">
              <Calendar className="h-4 w-4 mr-2" />
              Leave Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-base">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Leave Management Tab */}
          <TabsContent value="leave" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Leave Requests
                </CardTitle>
                <CardDescription>
                  Review and process employee leave applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="hidden md:table-cell">Dates</TableHead>
                        <TableHead className="hidden sm:table-cell">Days</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-accent/30">
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{request.employee}</p>
                              <p className="text-xs text-muted-foreground hidden lg:block">{request.reason}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{request.type}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {request.startDate} - {request.endDate}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{request.days}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="text-right">
                            {request.status === "pending" && (
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={() => handleApprove(request.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(request.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Trends */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Performance Trends
                  </CardTitle>
                  <CardDescription>Monthly performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      attendance: { label: "Attendance", color: "hsl(var(--chart-1))" },
                      productivity: { label: "Productivity", color: "hsl(var(--chart-2))" },
                      onTime: { label: "On-Time", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyPerformance}>
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[80, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="attendance" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="productivity" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="onTime" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Department Distribution
                  </CardTitle>
                  <CardDescription>Employee count by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      engineering: { label: "Engineering", color: "hsl(var(--chart-1))" },
                      marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
                      sales: { label: "Sales", color: "hsl(var(--chart-3))" },
                      hr: { label: "HR", color: "hsl(var(--chart-4))" },
                      finance: { label: "Finance", color: "hsl(var(--chart-5))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Weekly Hours */}
              <Card className="border-border/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Weekly Hours Logged
                  </CardTitle>
                  <CardDescription>Total team hours per week this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      hours: { label: "Hours", color: "hsl(var(--primary))" },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hoursWorked}>
                        <defs>
                          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="hours" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorHours)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  trend,
  highlight = false
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  trend: string;
  highlight?: boolean;
}) => (
  <Card className={`border-border/50 ${highlight ? "bg-primary/5 border-primary/20" : ""}`}>
    <CardContent className="pt-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${highlight ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">{trend}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default HRDashboard;
