import { MainLayout } from "@/components/layout/MainLayout";
import { MarkAttendanceDialog } from "@/components/attendance/MarkAttendanceDialog";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { useAttendance } from "@/hooks/useAttendance";
import { useEmployees } from "@/hooks/useEmployees";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Attendance() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: employees } = useEmployees();
  const { data: attendance, isLoading } = useAttendance(
    selectedEmployee === "all" ? undefined : selectedEmployee
  );

  const filteredAttendance = attendance?.filter((record) =>
    record.employee_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Attendance
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage employee attendance
            </p>
          </div>
          <MarkAttendanceDialog />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by employee ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filter by employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {employees?.map((emp) => (
                <SelectItem key={emp.id} value={emp.employee_id}>
                  {emp.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <AttendanceTable attendance={filteredAttendance} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
}
