import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Play, 
  Square, 
  Coffee, 
  LogOut, 
  Cake, 
  Trophy,
  TrendingUp,
  Calendar,
  Timer,
  User
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockBirthdays = [
  { name: "Sarah Johnson", date: "Dec 18", avatar: "SJ" },
  { name: "Mike Chen", date: "Dec 22", avatar: "MC" },
  { name: "Emily Davis", date: "Dec 28", avatar: "ED" },
];

const mockRankings = [
  { rank: 1, name: "Alex Thompson", hours: 186, badge: "🥇" },
  { rank: 2, name: "Maria Garcia", hours: 178, badge: "🥈" },
  { rank: 3, name: "James Wilson", hours: 172, badge: "🥉" },
  { rank: 4, name: "You", hours: 168, badge: "" },
  { rank: 5, name: "Lisa Anderson", hours: 165, badge: "" },
];

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workTime, setWorkTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isPunchedIn && !isOnBreak) {
        setWorkTime(prev => prev + 1);
      }
      if (isOnBreak) {
        setBreakTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPunchedIn, isOnBreak]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePunchIn = () => {
    setIsPunchedIn(true);
    setPunchInTime(new Date());
    toast.success("Punched in successfully! Have a great day.");
  };

  const handlePunchOut = () => {
    setIsPunchedIn(false);
    setIsOnBreak(false);
    toast.success(`Punched out! Total work time: ${formatTime(workTime)}`);
    setWorkTime(0);
    setBreakTime(0);
    setPunchInTime(null);
  };

  const handleBreakToggle = () => {
    if (isOnBreak) {
      setIsOnBreak(false);
      toast.info("Break ended. Back to work!");
    } else {
      setIsOnBreak(true);
      toast.info("Break started. Take your time!");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const dailyProgress = Math.min((workTime / (8 * 3600)) * 100, 100);

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
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-semibold text-foreground">John Doe</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Time Tracking Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Time Card */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-chart-2/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Current Time</p>
                  <p className="text-5xl font-mono font-bold text-foreground mb-4">
                    {currentTime.toLocaleTimeString()}
                  </p>
                  <p className="text-muted-foreground">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Punch In/Out Card */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Time Clock
                </CardTitle>
                <CardDescription>
                  {isPunchedIn 
                    ? `Punched in at ${punchInTime?.toLocaleTimeString()}`
                    : "You are currently not clocked in"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5">
                    <p className="text-sm text-muted-foreground mb-1">Work Time</p>
                    <p className="text-3xl font-mono font-bold text-primary">
                      {formatTime(workTime)}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-chart-2/10">
                    <p className="text-sm text-muted-foreground mb-1">Break Time</p>
                    <p className="text-3xl font-mono font-bold text-chart-2">
                      {formatTime(breakTime)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Progress (8hr target)</span>
                    <span className="font-medium text-foreground">{dailyProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={dailyProgress} className="h-3" />
                </div>

                <div className="flex gap-3">
                  {!isPunchedIn ? (
                    <Button onClick={handlePunchIn} variant="hero" size="lg" className="flex-1">
                      <Play className="h-5 w-5 mr-2" />
                      Punch In
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={handleBreakToggle} 
                        variant={isOnBreak ? "warning" : "secondary"}
                        size="lg" 
                        className="flex-1"
                      >
                        <Coffee className="h-5 w-5 mr-2" />
                        {isOnBreak ? "End Break" : "Start Break"}
                      </Button>
                      <Button onClick={handlePunchOut} variant="destructive" size="lg" className="flex-1">
                        <Square className="h-5 w-5 mr-2" />
                        Punch Out
                      </Button>
                    </>
                  )}
                </div>

                {isOnBreak && (
                  <div className="p-4 rounded-lg bg-chart-4/10 border border-chart-4/20 text-center">
                    <Coffee className="h-6 w-6 mx-auto mb-2 text-chart-4" />
                    <p className="font-medium text-foreground">You're on break</p>
                    <p className="text-sm text-muted-foreground">Enjoy your rest!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Monthly Performance
                </CardTitle>
                <CardDescription>December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Hours Worked" value="168" unit="hrs" />
                  <StatCard label="Days Present" value="21" unit="days" />
                  <StatCard label="On-Time Rate" value="95" unit="%" />
                  <StatCard label="Productivity" value="92" unit="%" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Birthday Reminders */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Cake className="h-5 w-5 text-primary" />
                  Upcoming Birthdays
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockBirthdays.map((person, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {person.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.date}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">🎂</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Rankings */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Monthly Rankings
                </CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockRankings.map((person, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      person.name === "You" ? "bg-primary/10 border border-primary/20" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-sm font-bold text-secondary-foreground">
                      {person.badge || person.rank}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${person.name === "You" ? "font-bold text-primary" : "font-medium text-foreground"}`}>
                        {person.name}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{person.hours}h</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Leave
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Full Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div className="text-center p-4 rounded-lg bg-accent/50">
    <p className="text-2xl font-bold text-foreground">
      {value}<span className="text-sm font-normal text-muted-foreground">{unit}</span>
    </p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </div>
);

export default EmployeeDashboard;
