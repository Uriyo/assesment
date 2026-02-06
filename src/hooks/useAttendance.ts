import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
  created_at: string;
}

export interface MarkAttendanceData {
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
}

export function useAttendance(employeeId?: string) {
  return useQuery({
    queryKey: ["attendance", employeeId],
    queryFn: async () => {
      let query = supabase
        .from("attendance")
        .select("*")
        .order("date", { ascending: false });

      if (employeeId) {
        query = query.eq("employee_id", employeeId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Attendance[];
    },
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attendance: MarkAttendanceData) => {
      const { data, error } = await supabase
        .from("attendance")
        .insert([attendance])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Attendance marked successfully");
    },
    onError: (error: Error) => {
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        toast.error("Attendance already marked for this date");
      } else {
        toast.error("Failed to mark attendance");
      }
    },
  });
}

export function useTodayAttendance() {
  const today = new Date().toISOString().split("T")[0];
  
  return useQuery({
    queryKey: ["attendance", "today"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("date", today);

      if (error) throw error;
      return data as Attendance[];
    },
  });
}
