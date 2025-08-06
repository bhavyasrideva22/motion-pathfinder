import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "scale" | "text";
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string | number;
  onAnswerChange: (answer: string | number) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  isFirstQuestion = false,
  isLastQuestion = false,
  className,
}) => {
  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={onAnswerChange}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "scale":
        const scaleValues = [];
        const min = question.scaleMin || 1;
        const max = question.scaleMax || 5;
        for (let i = min; i <= max; i++) {
          scaleValues.push(i);
        }
        
        return (
          <div className="space-y-4">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => onAnswerChange(Number(value))}
              className="flex justify-between items-center"
            >
              {scaleValues.map((value) => (
                <div key={value} className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value={value.toString()} id={`scale-${value}`} />
                  <Label htmlFor={`scale-${value}`} className="text-sm font-medium">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {question.scaleLabels && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{question.scaleLabels.min}</span>
                <span>{question.scaleLabels.max}</span>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className={cn("w-full max-w-3xl mx-auto", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-32 bg-muted rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl leading-relaxed">
          {question.text}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderQuestionContent()}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className={isFirstQuestion ? "invisible" : ""}
          >
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={selectedAnswer === undefined || selectedAnswer === ""}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isLastQuestion ? "Complete Assessment" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};