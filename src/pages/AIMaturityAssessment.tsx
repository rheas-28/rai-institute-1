import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

const AIMaturityAssessment = () => {
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

            {/* Assessment Preview */}
            <div className="space-y-6 mb-12">
              <h3 className="text-2xl font-bold text-foreground">Sample Questions:</h3>
              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-card border border-border">
                  <p className="font-semibold text-foreground mb-3">Q1. What best describes your organization's size?</p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Global enterprise (e.g., Fortune 500)</li>
                    <li>• Large business ($1B–$5B annual revenue)</li>
                    <li>• Mid-size business ($100M–$1B revenue)</li>
                    <li>• Small business ($10M–$100M revenue)</li>
                    <li>• Startup or very small business (under $10M)</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-card border border-border">
                  <p className="font-semibold text-foreground mb-3">Q2. Where are you in your AI journey?</p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Just researching or planning</li>
                    <li>• Testing or piloting some AI tools</li>
                    <li>• Using AI in parts of the business, with some rules in place</li>
                    <li>• Using AI at scale, with some structure</li>
                    <li>• Using AI widely, with clear internal processes</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-card border border-border">
                  <p className="font-semibold text-foreground mb-3">Q3. Which of these does your organization currently have in place for AI?</p>
                  <p className="text-sm text-muted-foreground mb-2">Select all that apply</p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Written policies for how AI should be used</li>
                    <li>• Steps to evaluate risks or impacts of AI systems</li>
                    <li>• Regular tracking or checks on how AI is working</li>
                    <li>• A group or committee that oversees responsible AI</li>
                    <li>• Ways to test for bias or unfair outcomes</li>
                    <li>• Privacy or security protections for AI systems</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Take the 5-Minute Assessment</h3>
              <Button size="lg" className="gap-2">
                <Target className="w-5 h-5" />
                Start the Assessment
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free and confidential • Results delivered instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIMaturityAssessment;
