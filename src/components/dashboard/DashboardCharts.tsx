import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Attendance } from "@/hooks/useAttendance";

interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  department: string;
  email: string;
  created_at: string | null;
}

interface AttendanceChartProps {
  attendance: Attendance[];
}

interface DepartmentChartProps {
  employees: Employee[];
}

interface WeeklyTrendChartProps {
  attendance: Attendance[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
  "hsl(199, 89%, 48%)",
  "hsl(262, 83%, 58%)",
];

export function AttendanceOverviewChart({ attendance }: AttendanceChartProps) {
  const data = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const dayAttendance = attendance.filter((a) => a.date === dateStr);
      const present = dayAttendance.filter((a) => a.status === "Present").length;
      const absent = dayAttendance.filter((a) => a.status === "Absent").length;
      
      last7Days.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        present,
        absent,
        date: dateStr,
      });
    }
    return last7Days;
  }, [attendance]);

  const chartConfig = {
    present: {
      label: "Present",
      color: "hsl(var(--success))",
    },
    absent: {
      label: "Absent",
      color: "hsl(var(--destructive))",
    },
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Weekly Attendance</CardTitle>
        <CardDescription>Last 7 days overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={30}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="present"
              fill="hsl(var(--success))"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="absent"
              fill="hsl(var(--destructive))"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function DepartmentDistributionChart({ employees }: DepartmentChartProps) {
  const data = useMemo(() => {
    const deptCounts: Record<string, number> = {};
    employees.forEach((emp) => {
      deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
    });
    return Object.entries(deptCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [employees]);

  const chartConfig = data.reduce((acc, dept, idx) => {
    acc[dept.name] = {
      label: dept.name,
      color: COLORS[idx % COLORS.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Department Distribution</CardTitle>
        <CardDescription>Employees by department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AttendanceTrendChart({ attendance }: WeeklyTrendChartProps) {
  const data = useMemo(() => {
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const dayAttendance = attendance.filter((a) => a.date === dateStr);
      const total = dayAttendance.length;
      const present = dayAttendance.filter((a) => a.status === "Present").length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;
      
      last30Days.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        rate,
        present,
        total,
      });
    }
    return last30Days;
  }, [attendance]);

  const chartConfig = {
    rate: {
      label: "Attendance Rate",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Attendance Trend</CardTitle>
        <CardDescription>30-day attendance rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={30}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value) => [`${value}%`, "Rate"]}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorRate)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function AttendanceRateGauge({ present, total }: { present: number; total: number }) {
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;
  
  const data = [
    { name: "Present", value: rate },
    { name: "Remaining", value: 100 - rate },
  ];

  return (
    <div className="relative flex items-center justify-center">
      <div className="h-32 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill="hsl(var(--success))" />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-foreground">{rate}%</span>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>
    </div>
  );
}
