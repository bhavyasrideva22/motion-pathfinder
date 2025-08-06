import React, { useState } from "react";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { QuestionCard, Question } from "@/components/assessment/QuestionCard";
import { ResultsPanel, AssessmentResults } from "@/components/assessment/ResultsPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const assessmentSteps = [
  "Introduction",
  "Psychological Assessment", 
  "Technical Evaluation",
  "WISCAR Analysis",
  "Results"
];

const psychometricQuestions: Question[] = [
  {
    id: "interest-1",
    text: "How often do you find yourself experimenting with visual storytelling or animation software?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Never", max: "Very Often" }
  },
  {
    id: "personality-1", 
    text: "I prefer structured problem solving over open-ended creative exploration.",
    type: "scale",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
  },
  {
    id: "cognitive-1",
    text: "When solving problems, I typically prefer:",
    type: "multiple-choice",
    options: [
      "Visual and spatial approaches",
      "Verbal and logical approaches", 
      "A combination of both",
      "Trial and error experimentation"
    ]
  },
  {
    id: "motivation-1",
    text: "What primarily motivates you to learn motion graphics design?",
    type: "multiple-choice",
    options: [
      "Creative self-expression and artistic fulfillment",
      "Career advancement and better job opportunities",
      "Personal interest and intellectual curiosity",
      "Practical skills for current projects"
    ]
  },
  {
    id: "work-style-1",
    text: "I enjoy working on long, detailed projects that require sustained focus.",
    type: "scale",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" }
  }
];

const technicalQuestions: Question[] = [
  {
    id: "tech-1",
    text: "Which animation principle involves making objects appear to have weight and flexibility?",
    type: "multiple-choice",
    options: [
      "Ease-in and ease-out",
      "Squash and stretch", 
      "Anticipation",
      "Follow through"
    ]
  },
  {
    id: "tech-2",
    text: "In After Effects, what is a keyframe used for?",
    type: "multiple-choice",
    options: [
      "Defining specific points in time where properties change",
      "Creating 3D effects",
      "Adding sound effects",
      "Exporting the final video"
    ]
  },
  {
    id: "tech-3",
    text: "What does 'compositing' mean in motion graphics?",
    type: "multiple-choice",
    options: [
      "Creating sound tracks for animations",
      "Combining multiple visual elements into a single image",
      "Drawing frame-by-frame animations",
      "Setting up camera movements"
    ]
  },
  {
    id: "tech-4",
    text: "How familiar are you with video editing software like Premiere Pro or Final Cut?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Not familiar", max: "Very familiar" }
  },
  {
    id: "tech-5",
    text: "What frame rate is typically used for smooth motion in professional video?",
    type: "multiple-choice",
    options: [
      "12 fps",
      "24 fps",
      "30 fps", 
      "60 fps"
    ]
  }
];

const MotionGraphicsAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [psychometricAnswers, setPsychometricAnswers] = useState<Record<string, string | number>>({});
  const [technicalAnswers, setTechnicalAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestions = currentStep === 1 ? psychometricQuestions : technicalQuestions;
  const currentAnswers = currentStep === 1 ? psychometricAnswers : technicalAnswers;
  const setCurrentAnswers = currentStep === 1 ? setPsychometricAnswers : setTechnicalAnswers;

  const handleAnswerChange = (answer: string | number) => {
    const questionId = currentQuestions[currentQuestionIndex].id;
    setCurrentAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next step
      if (currentStep < assessmentSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentQuestionIndex(0);
        
        // If we've completed technical questions, show results
        if (currentStep === 2) {
          setShowResults(true);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const prevQuestions = currentStep === 2 ? psychometricQuestions : technicalQuestions;
      setCurrentQuestionIndex(prevQuestions.length - 1);
    }
  };

  const calculateResults = (): AssessmentResults => {
    // Simple scoring algorithm (in a real app, this would be more sophisticated)
    const psychAnswers = Object.values(psychometricAnswers).map(val => typeof val === 'number' ? val : 3);
    const techAnswers = Object.values(technicalAnswers).map(val => typeof val === 'number' ? val : 3);
    
    const psychScore = psychAnswers.reduce((sum, val) => sum + val, 0) / psychometricQuestions.length;
    const techScore = techAnswers.reduce((sum, val) => sum + val, 0) / technicalQuestions.length;
    
    const overallScore = Math.round(((psychScore + techScore) / 2) * 20);
    
    let recommendation: "YES" | "MAYBE" | "NO" = "MAYBE";
    if (overallScore >= 80) recommendation = "YES";
    else if (overallScore < 50) recommendation = "NO";

    return {
      overallScore,
      recommendation,
      confidence: Math.min(95, Math.max(65, overallScore + 10)),
      psychometricScores: {
        will: Math.round(psychScore * 20),
        interest: Math.round(psychScore * 20) + 5,
        skill: Math.round(techScore * 20),
        cognitive: Math.round(psychScore * 20) - 5,
        ability: Math.round(psychScore * 20),
        realWorld: Math.round(((psychScore + techScore) / 2) * 20)
      },
      strengths: [
        "High visual creativity and curiosity",
        "Strong interest in digital media", 
        "Good analytical thinking abilities"
      ],
      areasForImprovement: [
        "Technical software proficiency",
        "Understanding of animation principles",
        "Portfolio development"
      ],
      nextSteps: [
        "Take a beginner After Effects course",
        "Explore short creative briefs on motion design",
        "Join an online design challenge",
        "Practice with free motion graphics tutorials"
      ],
      alternativePaths: [
        "Graphic Design",
        "UI/UX Design with Animation",
        "Social Media Content Creation"
      ],
      careerRoles: [
        "Motion Graphics Designer",
        "UI Animator", 
        "Explainer Video Producer",
        "YouTube Content Editor",
        "Social Media Animator"
      ],
      learningPath: {
        foundation: [
          "Design principles",
          "Visual storyboarding",
          "Basic animation concepts"
        ],
        intermediate: [
          "After Effects fundamentals",
          "Motion principles",
          "Typography in motion"
        ],
        advanced: [
          "Complex animation techniques",
          "3D integration",
          "Professional workflow"
        ]
      }
    };
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const renderIntroduction = () => (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <h1 className="text-4xl font-bold mb-6">Should You Learn Motion Graphics Design?</h1>
      
      <div className="bg-card p-8 rounded-lg space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">What is Motion Graphics Design?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Motion Graphics Designers use visual design and animation to create engaging media — for video, web, 
            marketing, advertising, films, UI animations, and interactive visuals.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Typical Career Paths:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Motion Graphics Designer", "Video Editor with Motion Specialization", "UI/UX Animator", 
              "Visual Storyteller", "Multimedia Artist", "Branding Animator"].map((career) => (
              <div key={career} className="bg-muted p-3 rounded text-sm">
                {career}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Traits That Succeed in This Field:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
            {["High visual creativity", "Storytelling ability", "Technical fluency with tools", 
              "Attention to detail", "Collaborative mindset", "Curiosity and iteration"].map((trait) => (
              <li key={trait} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-sm">{trait}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button 
        onClick={() => setCurrentStep(1)}
        size="lg"
        className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
      >
        Begin Assessment
      </Button>
    </div>
  );

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <ResultsPanel
            results={calculateResults()}
            skillName="Motion Graphics Design"
            onRetakeAssessment={() => {
              setCurrentStep(0);
              setCurrentQuestionIndex(0);
              setPsychometricAnswers({});
              setTechnicalAnswers({});
              setShowResults(false);
            }}
            onDownloadReport={() => {
              // In a real app, this would generate a PDF
              alert('Report download feature coming soon!');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <ProgressIndicator
          steps={assessmentSteps}
          currentStep={currentStep}
          className="mb-8"
        />

        {currentStep === 0 && renderIntroduction()}
        
        {(currentStep === 1 || currentStep === 2) && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">
                {currentStep === 1 ? "Psychological Assessment" : "Technical Evaluation"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {currentStep === 1 
                  ? "Understanding your personality fit and motivation"
                  : "Evaluating your technical knowledge and aptitude"
                }
              </p>
            </div>
            
            <QuestionCard
              question={currentQuestions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentQuestions.length}
              selectedAnswer={currentAnswers[currentQuestions[currentQuestionIndex].id]}
              onAnswerChange={handleAnswerChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstQuestion={currentStep === 1 && currentQuestionIndex === 0}
              isLastQuestion={currentStep === 2 && currentQuestionIndex === currentQuestions.length - 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MotionGraphicsAssessment;