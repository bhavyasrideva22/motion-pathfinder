import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/ui/score-display";
import { RadarChart } from "./RadarChart";
import { CheckCircle, XCircle, AlertCircle, ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AssessmentResults {
  overallScore: number;
  recommendation: "YES" | "MAYBE" | "NO";
  confidence: number;
  psychometricScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: string[];
  alternativePaths: string[];
  careerRoles: string[];
  learningPath: {
    foundation: string[];
    intermediate: string[];
    advanced: string[];
  };
}

interface ResultsPanelProps {
  results: AssessmentResults;
  skillName: string;
  onRetakeAssessment: () => void;
  onDownloadReport: () => void;
  className?: string;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  skillName,
  onRetakeAssessment,
  onDownloadReport,
  className,
}) => {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "YES":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "MAYBE":
        return <AlertCircle className="w-6 h-6 text-warning" />;
      case "NO":
        return <XCircle className="w-6 h-6 text-destructive" />;
      default:
        return null;
    }
  };

  const getRecommendationVariant = (recommendation: string) => {
    switch (recommendation) {
      case "YES":
        return "success";
      case "MAYBE":
        return "warning";
      case "NO":
        return "danger";
      default:
        return "default";
    }
  };

  const radarData = [
    { label: "Will", value: results.psychometricScores.will },
    { label: "Interest", value: results.psychometricScores.interest },
    { label: "Skill", value: results.psychometricScores.skill },
    { label: "Cognitive", value: results.psychometricScores.cognitive },
    { label: "Ability", value: results.psychometricScores.ability },
    { label: "Real-World", value: results.psychometricScores.realWorld },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          {getRecommendationIcon(results.recommendation)}
          <h1 className="text-3xl font-bold">Assessment Complete!</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Here's your personalized analysis for learning {skillName}
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className="bg-gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Our Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Badge 
            className={cn(
              "text-lg px-6 py-2",
              results.recommendation === "YES" && "bg-success/10 text-success border-success/20",
              results.recommendation === "MAYBE" && "bg-warning/10 text-warning border-warning/20",
              results.recommendation === "NO" && "bg-destructive/10 text-destructive border-destructive/20"
            )}
          >
            {results.recommendation === "YES" ? "Highly Recommended" :
             results.recommendation === "MAYBE" ? "Proceed with Caution" :
             "Consider Alternatives"}
          </Badge>
          <ScoreDisplay
            score={results.confidence}
            label="Confidence Score"
            description={`We're ${results.confidence}% confident in this recommendation based on your responses.`}
            variant={getRecommendationVariant(results.recommendation) as any}
          />
        </CardContent>
      </Card>

      {/* WISCAR Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>WISCAR Framework Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart data={radarData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScoreDisplay
              score={results.psychometricScores.will}
              label="Will (Motivation)"
              description="Your consistency and determination"
            />
            <ScoreDisplay
              score={results.psychometricScores.interest}
              label="Interest"
              description="Genuine interest vs. passing curiosity"
            />
            <ScoreDisplay
              score={results.psychometricScores.skill}
              label="Current Skills"
              description="Existing relevant abilities"
            />
          </CardContent>
        </Card>
      </div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-success">Your Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-warning">Areas for Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-warning mt-1 flex-shrink-0" />
                  <span className="text-sm">{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Foundation</h4>
              <ul className="space-y-1 text-sm">
                {results.learningPath.foundation.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Intermediate</h4>
              <ul className="space-y-1 text-sm">
                {results.learningPath.intermediate.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Advanced</h4>
              <ul className="space-y-1 text-sm">
                {results.learningPath.advanced.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Career Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {results.careerRoles.map((role, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {role}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={onDownloadReport}
          variant="outline"
          size="lg"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </Button>
        <Button
          onClick={onRetakeAssessment}
          variant="outline"
          size="lg"
        >
          Retake Assessment
        </Button>
        <Button
          size="lg"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          Start Learning
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};