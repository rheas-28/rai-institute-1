import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, TrendingUp, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: 1,
    question: "What best describes your organization's size?",
    options: [
      "Global enterprise (e.g., Fortune 500)",
      "Large business ($1B–$5B annual revenue)",
      "Mid-size business ($100M–$1B revenue)",
      "Small business ($10M–$100M revenue)",
      "Startup or very small business (under $10M)"
    ]
  },
  {
    id: 2,
    question: "Where are you in your AI journey?",
    options: [
      "Just researching or planning",
      "Testing or piloting some AI tools",
      "Using AI in parts of the business, with some rules in place",
      "Using AI at scale, with some structure",
      "Using AI widely, with clear internal processes"
    ]
  },
  {
    id: 3,
    question: "Which of these does your organization currently have in place for AI? (Select all that apply)",
    options: [
      "Written policies for how AI should be used",
      "Steps to evaluate risks or impacts of AI systems",
      "Regular tracking or checks on how AI is working",
      "A group or committee that oversees responsible AI",
      "Ways to test for bias or unfair outcomes",
      "Privacy or security protections for AI systems"
    ],
    multiSelect: true
  }
];

const AIMaturityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-navy-darker via-navy-dark to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Interactive Survey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              5-Minute AI Readiness Assessment
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find your starting point and get clarity on your next steps
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Benchmark Your Responsible AI Maturity</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our AI Maturity Assessment helps you quickly understand how prepared your organization is to manage AI responsibly—no expertise required. Whether you're just starting out or scaling advanced systems, this quiz gives you a clear view of your strengths, gaps, and most practical next steps.
              </p>
            </div>

            {/* Benefits Section */}
            <div className="bg-card border border-border rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                In just 5 minutes, you'll get:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">A personalized readiness score</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">A tailored action path: starter toolkit, 1:1 review, or strategy briefing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Clarity on how your current efforts stack up</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Insights to share with internal teams or execs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">A credible, nonprofit-backed way to start the right conversation</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary/20 border border-border rounded-lg p-8 mb-12">
              <p className="text-xl font-semibold text-primary text-center">
                Start with clarity. Take the AI Maturity Assessment.
              </p>
            </div>

            {/* Assessment Questions */}
            {!showResults ? (
              <div className="space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {currentQ.question}
                  </h3>
                  
                  <RadioGroup 
                    value={answers[currentQuestion] as string} 
                    onValueChange={handleAnswer}
                    className="space-y-4"
                  >
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 cursor-pointer text-foreground"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!hasAnswer}
                    className="gap-2"
                  >
                    {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Assessment Complete!</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for completing the assessment. Your results are being processed.
                </p>
                <Button onClick={() => { setCurrentQuestion(0); setAnswers({}); setShowResults(false); }}>
                  Retake Assessment
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIMaturityAssessment;
