import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  participants?: number;
  rating?: number;
  onStart: () => void;
  className?: string;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  description,
  duration,
  difficulty,
  participants,
  rating,
  onStart,
  className,
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "Advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <Card className={cn("group hover:shadow-elegant transition-all duration-300 bg-gradient-card", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <Badge className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            {participants && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{participants.toLocaleString()} participants</span>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={onStart}
          className="w-full group bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          Start Assessment
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};