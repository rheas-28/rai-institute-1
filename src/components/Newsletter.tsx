import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter."
    });
    setEmail("");
  };
  return <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-cobalt relative overflow-hidden border-t border-border/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Informed on AI Governance
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Get monthly insights on responsible AI practices, regulatory updates, and industry best practices delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40" />
            <Button type="submit" size="lg" className="text-navy font-semibold bg-blue-500 hover:bg-blue-400">
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-white/60 mt-4">
            No spam. Unsubscribe anytime. View our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>;
};
export default Newsletter;