import { MainLayout } from "@/components/layout/MainLayout";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { useEmployees } from "@/hooks/useEmployees";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Employees() {
  const { data: employees, isLoading } = useEmployees();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees?.filter(
    (employee) =>
      employee.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Employees
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's workforce
            </p>
          </div>
          <AddEmployeeDialog />
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <EmployeeTable employees={filteredEmployees} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
}
