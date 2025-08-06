import { AssessmentCard } from "@/components/assessment/AssessmentCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Skills Readiness Assessment
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Discover your potential with AI-driven assessments that evaluate your psychological compatibility, 
              technical readiness, and career alignment for various skills and professions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm font-medium">Psychometrically Valid</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-sm font-medium">Personalized Roadmap</span>
            </div>
          </div>
        </div>

        {/* Featured Assessment */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Assessment</h2>
          <AssessmentCard
            title="Should You Learn Motion Graphics Design?"
            description="Evaluate your psychological compatibility, technical readiness, and career alignment with Motion Graphics Design using our comprehensive WISCAR framework analysis."
            duration="20-30 minutes"
            difficulty="Beginner"
            participants={12547}
            rating={4.8}
            onStart={() => window.location.href = '/assessment/motion-graphics'}
            className="animate-fade-in"
          />
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-primary-foreground">🧠</span>
            </div>
            <h3 className="text-xl font-semibold">Psychological Assessment</h3>
            <p className="text-muted-foreground">
              Evaluate personality traits, cognitive styles, and motivational factors using validated psychometric tools.
            </p>
          </div>

          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-primary-foreground">⚡</span>
            </div>
            <h3 className="text-xl font-semibold">Technical Readiness</h3>
            <p className="text-muted-foreground">
              Test your existing skills, aptitude, and prerequisite knowledge for your chosen field.
            </p>
          </div>

          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-primary-foreground">🎯</span>
            </div>
            <h3 className="text-xl font-semibold">Career Guidance</h3>
            <p className="text-muted-foreground">
              Get personalized learning paths, career opportunities, and actionable next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
