import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { CountUp } from "./count-up";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
  delay?: number;
}

const variantStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

const variantBorderGlow = {
  default: "hover:shadow-primary/10",
  success: "hover:shadow-success/10",
  warning: "hover:shadow-warning/10",
  destructive: "hover:shadow-destructive/10",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
  delay = 0,
}: StatCardProps) {
  const numericValue = typeof value === "number" ? value : parseInt(value) || 0;
  const isNumeric = typeof value === "number" || !isNaN(parseInt(value as string));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "rounded-xl bg-card p-6 shadow-sm border border-border/50 transition-all hover:shadow-lg",
        variantBorderGlow[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-3xl font-bold tracking-tight text-card-foreground">
            {isNumeric ? (
              <CountUp to={numericValue} duration={2} delay={delay} />
            ) : (
              value
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className={cn("rounded-lg p-3", variantStyles[variant])}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.div>
  );
}
