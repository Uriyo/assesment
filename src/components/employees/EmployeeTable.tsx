import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee, useDeleteEmployee } from "@/hooks/useEmployees";
import { Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface EmployeeTableProps {
  employees: Employee[] | undefined;
  isLoading: boolean;
}

function EmployeeCard({ employee, onDelete, isDeleting }: { 
  employee: Employee; 
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {employee.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-card-foreground">{employee.full_name}</p>
            <p className="text-xs text-muted-foreground font-mono">{employee.employee_id}</p>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Employee</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {employee.full_name}?
                This will also remove all their attendance records. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Email</p>
          <p className="text-card-foreground truncate">{employee.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Department</p>
          <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {employee.department}
          </span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        Joined {format(new Date(employee.created_at), "MMM d, yyyy")}
      </div>
    </div>
  );
}

export function EmployeeTable({ employees, isLoading }: EmployeeTableProps) {
  const deleteEmployee = useDeleteEmployee();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12">
        <p className="text-muted-foreground">No employees found</p>
        <p className="text-sm text-muted-foreground/60">
          Add your first employee to get started
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="grid gap-3 md:hidden">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDelete={() => deleteEmployee.mutate(employee.employee_id)}
            isDeleting={deleteEmployee.isPending}
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Employee ID</TableHead>
              <TableHead className="font-semibold">Full Name</TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">Email</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">Joined</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-mono text-sm">
                  {employee.employee_id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {employee.full_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{employee.full_name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  {employee.email}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {employee.department}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  {format(new Date(employee.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {employee.full_name}?
                          This will also remove all their attendance records. This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteEmployee.mutate(employee.employee_id)
                          }
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deleteEmployee.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
