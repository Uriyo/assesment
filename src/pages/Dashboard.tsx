import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { useEmployees } from "@/hooks/useEmployees";
import { useTodayAttendance, useAttendance } from "@/hooks/useAttendance";
import { Users, UserCheck, UserX, CalendarDays, TrendingUp, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurText } from "@/components/ui/blur-text";
import { AnimatedCard, StaggerContainer, StaggerItem } from "@/components/ui/animated-card";
import {
  AttendanceOverviewChart,
  DepartmentDistributionChart,
  AttendanceTrendChart,
  AttendanceRateGauge,
} from "@/components/dashboard/DashboardCharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: employees, isLoading: employeesLoading } = useEmployees();
  const { data: todayAttendance, isLoading: todayLoading } = useTodayAttendance();
  const { data: allAttendance, isLoading: attendanceLoading } = useAttendance();

  const totalEmployees = employees?.length || 0;
  const presentToday = todayAttendance?.filter((a) => a.status === "Present").length || 0;
  const absentToday = todayAttendance?.filter((a) => a.status === "Absent").length || 0;
  const totalRecords = allAttendance?.length || 0;

  const isLoading = employeesLoading || todayLoading || attendanceLoading;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header with animated text */}
        <div className="space-y-2">
          <BlurText
            text="Dashboard"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            animateBy="letters"
            delay={0.03}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base text-muted-foreground"
          >
            Welcome back! Here's your HR overview for today.
          </motion.p>
        </div>

        {/* Stats Grid with animated cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </>
          ) : (
            <>
              <StatCard
                title="Total Employees"
                value={totalEmployees}
                icon={Users}
                description="Active workforce"
                variant="default"
                delay={0.1}
              />
              <StatCard
                title="Present Today"
                value={presentToday}
                icon={UserCheck}
                description={`${totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0}% attendance rate`}
                variant="success"
                delay={0.2}
              />
              <StatCard
                title="Absent Today"
                value={absentToday}
                icon={UserX}
                description="Employees absent"
                variant="destructive"
                delay={0.3}
              />
              <StatCard
                title="Total Records"
                value={totalRecords}
                icon={CalendarDays}
                description="Attendance entries"
                variant="default"
                delay={0.4}
              />
            </>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {isLoading ? (
            <>
              <Skeleton className="h-[300px] rounded-xl lg:col-span-2" />
              <Skeleton className="h-[300px] rounded-xl" />
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="lg:col-span-2"
              >
                <AttendanceOverviewChart attendance={allAttendance || []} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <DepartmentDistributionChart employees={employees || []} />
              </motion.div>
            </>
          )}
        </div>

        {/* Trend Chart */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <AttendanceTrendChart attendance={allAttendance || []} />
          </motion.div>
        )}

        {/* Quick Info with Attendance Rate Gauge */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Attendance Rate */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <AnimatedCard className="flex flex-col items-center justify-center h-full">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  Today's Rate
                </h2>
                <AttendanceRateGauge
                  present={presentToday}
                  total={todayAttendance?.length || 0}
                />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  {presentToday} present out of {todayAttendance?.length || 0} marked
                </p>
              </AnimatedCard>
            </motion.div>
          )}

          {/* Recent Employees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="rounded-xl bg-card p-6 shadow-sm border border-border/50"
          >
            <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Employees
            </h2>
            {employeesLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : employees && employees.length > 0 ? (
              <StaggerContainer className="space-y-3">
                {employees.slice(0, 5).map((employee, idx) => (
                  <StaggerItem key={employee.id}>
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {employee.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-card-foreground truncate">
                            {employee.full_name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {employee.department}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {employee.employee_id}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No employees added yet.</p>
            )}
          </motion.div>

          {/* Today's Attendance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="rounded-xl bg-card p-6 shadow-sm border border-border/50"
          >
            <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-success" />
              Today's Attendance
            </h2>
            {todayLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : todayAttendance && todayAttendance.length > 0 ? (
              <StaggerContainer className="space-y-3">
                {todayAttendance.slice(0, 5).map((record, idx) => (
                  <StaggerItem key={record.id}>
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 hover:bg-muted/70 transition-colors">
                      <span className="font-mono text-sm text-card-foreground">
                        {record.employee_id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          record.status === "Present"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No attendance marked today.</p>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
