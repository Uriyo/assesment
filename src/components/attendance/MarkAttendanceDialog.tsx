import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEmployees } from "@/hooks/useEmployees";
import { useMarkAttendance } from "@/hooks/useAttendance";
import { Plus, Loader2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function MarkAttendanceDialog() {
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<"Present" | "Absent" | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: employees } = useEmployees();
  const markAttendance = useMarkAttendance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!employeeId) newErrors.employee = "Please select an employee";
    if (!date) newErrors.date = "Please select a date";
    if (!status) newErrors.status = "Please select a status";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await markAttendance.mutateAsync({
        employee_id: employeeId,
        date: format(date!, "yyyy-MM-dd"),
        status: status as "Present" | "Absent",
      });
      setEmployeeId("");
      setDate(new Date());
      setStatus("");
      setOpen(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Record attendance for an employee on a specific date.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Employee</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees?.map((emp) => (
                  <SelectItem key={emp.id} value={emp.employee_id}>
                    {emp.full_name} ({emp.employee_id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.employee && (
              <p className="text-xs text-destructive">{errors.employee}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-xs text-destructive">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "Present" | "Absent")}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    Present
                  </span>
                </SelectItem>
                <SelectItem value="Absent">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                    Absent
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-xs text-destructive">{errors.status}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={markAttendance.isPending}>
              {markAttendance.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Mark Attendance
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
