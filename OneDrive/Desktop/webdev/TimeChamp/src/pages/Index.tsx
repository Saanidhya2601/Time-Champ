import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Shield, TrendingUp, Cake, Award } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [hrId, setHrId] = useState("");
  const [hrPassword, setHrPassword] = useState("");

  const handleEmployeeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim() || !employeePassword.trim()) {
      toast.error("Please enter your credentials");
      return;
    }
    toast.success("Welcome back!");
    navigate("/employee");
  };

  const handleHRLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hrId.trim() || !hrPassword.trim()) {
      toast.error("Please enter your credentials");
      return;
    }
    toast.success("Welcome, HR Admin!");
    navigate("/hr");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-chart-2/10 to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Clock className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold text-foreground tracking-tight">
                Time<span className="text-primary">Champ</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your workforce management with intelligent time tracking, 
              performance analytics, and seamless HR operations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Time Tracking"
              description="Easy punch-in/out with break management"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Performance Analytics"
              description="Monthly reports and productivity metrics"
            />
            <FeatureCard
              icon={<Award className="h-8 w-8" />}
              title="Recognition"
              description="Top performer rankings and celebrations"
            />
          </div>

          {/* Login Cards */}
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="employee" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="employee" className="text-base py-3">
                  <Users className="h-4 w-4 mr-2" />
                  Employee Login
                </TabsTrigger>
                <TabsTrigger value="hr" className="text-base py-3">
                  <Shield className="h-4 w-4 mr-2" />
                  HR Admin Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employee">
                <Card className="border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                      <Users className="h-6 w-6 text-primary" />
                      Employee Portal
                    </CardTitle>
                    <CardDescription>
                      Track your time, view performance, and stay connected
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmployeeLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="emp-id">Employee ID</Label>
                        <Input
                          id="emp-id"
                          placeholder="Enter your employee ID"
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emp-password">Password</Label>
                        <Input
                          id="emp-password"
                          type="password"
                          placeholder="Enter your password"
                          value={employeePassword}
                          onChange={(e) => setEmployeePassword(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <Button type="submit" variant="hero" size="lg" className="w-full">
                        Sign In to Dashboard
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hr">
                <Card className="border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                      <Shield className="h-6 w-6 text-primary" />
                      HR Admin Portal
                    </CardTitle>
                    <CardDescription>
                      Manage leave requests, view analytics, and oversee operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleHRLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hr-id">Admin ID</Label>
                        <Input
                          id="hr-id"
                          placeholder="Enter your admin ID"
                          value={hrId}
                          onChange={(e) => setHrId(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hr-password">Password</Label>
                        <Input
                          id="hr-password"
                          type="password"
                          placeholder="Enter your password"
                          value={hrPassword}
                          onChange={(e) => setHrPassword(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <Button type="submit" variant="hero" size="lg" className="w-full">
                        Access HR Dashboard
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 TimeChamp. Empowering teams to work smarter.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="border-border/30 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardContent className="pt-6 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default Index;
