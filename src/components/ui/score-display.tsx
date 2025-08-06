import React from "react";
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  label: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  maxScore = 100,
  label,
  description,
  variant = "default",
  className,
}) => {
  const percentage = (score / maxScore) * 100;
  
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "text-success border-success/20 bg-success/5";
      case "warning":
        return "text-warning border-warning/20 bg-warning/5";
      case "danger":
        return "text-destructive border-destructive/20 bg-destructive/5";
      default:
        return "text-primary border-primary/20 bg-primary/5";
    }
  };

  const getProgressColor = () => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-warning";
    if (percentage >= 40) return "bg-primary";
    return "bg-destructive";
  };

  return (
    <div className={cn("p-6 rounded-lg border-2 transition-all hover:shadow-elegant", getVariantStyles(), className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{label}</h3>
        <span className="text-2xl font-bold">{score}/{maxScore}</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-3 mb-2">
        <div
          className={cn("h-3 rounded-full transition-all duration-700 ease-out", getProgressColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
};