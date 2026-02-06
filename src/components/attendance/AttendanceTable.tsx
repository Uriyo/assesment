import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Attendance } from "@/hooks/useAttendance";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AttendanceTableProps {
  attendance: Attendance[] | undefined;
  isLoading: boolean;
}

function AttendanceCard({ record }: { record: Attendance }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-card-foreground">{record.employee_id}</p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
            record.status === "Present"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              record.status === "Present" ? "bg-success" : "bg-destructive"
            )}
          />
          {record.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Date</p>
          <p className="text-card-foreground font-medium">
            {format(new Date(record.date), "MMM d, yyyy")}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Day</p>
          <p className="text-card-foreground">
            {format(new Date(record.date), "EEEE")}
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Marked {format(new Date(record.created_at), "MMM d, h:mm a")}
      </p>
    </div>
  );
}

export function AttendanceTable({ attendance, isLoading }: AttendanceTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (!attendance || attendance.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12">
        <p className="text-muted-foreground">No attendance records found</p>
        <p className="text-sm text-muted-foreground/60">
          Mark attendance to see records here
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="grid gap-3 md:hidden">
        {attendance.map((record) => (
          <AttendanceCard key={record.id} record={record} />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Employee ID</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">Day</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">Marked At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-mono text-sm">
                  {record.employee_id}
                </TableCell>
                <TableCell className="font-medium">
                  {format(new Date(record.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  {format(new Date(record.date), "EEEE")}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      record.status === "Present"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        record.status === "Present" ? "bg-success" : "bg-destructive"
                      )}
                    />
                    {record.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">
                  {format(new Date(record.created_at), "MMM d, yyyy h:mm a")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
