import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the Responsible AI Institute?",
      answer: "We are a nonprofit organization dedicated to advancing trustworthy AI through standards-aligned certification programs, comprehensive resources, and a global community of practice. We help organizations build AI systems that are safe, fair, transparent, and accountable.",
    },
    {
      question: "What are RAISE Pathways?",
      answer: "RAISE (Responsible AI Standards & Evaluation) Pathways are our structured certification programs. They provide organizations with clear frameworks for implementing responsible AI practices aligned with global standards like ISO, NIST, and the EU AI Act. We offer foundation, advanced, domain-specific, and executive pathways.",
    },
    {
      question: "Who should become a member?",
      answer: "Our membership serves AI practitioners, researchers, developers, policy professionals, and organizations of all sizes—from startups to enterprises. If you're involved in building, deploying, or governing AI systems and want to do so responsibly, membership provides the tools, certification, and community support you need.",
    },
    {
      question: "How long does certification take?",
      answer: "Certification timelines vary based on your organization's current AI maturity and chosen pathway. The Foundation Pathway typically takes 2-3 months, while Advanced Pathway may take 4-6 months. Domain-specific pathways vary by industry requirements. We provide assessment tools to help you estimate your timeline.",
    },
    {
      question: "What standards do you align with?",
      answer: "RAISE certification aligns with major global frameworks including ISO/IEC 42001 (AI Management Systems), NIST AI Risk Management Framework, EU AI Act requirements, OECD AI Principles, and emerging standards from IEEE and other standards bodies. We continuously update our frameworks as standards evolve.",
    },
    {
      question: "Is certification mandatory for membership?",
      answer: "No. While certification is a key benefit, membership also provides access to our complete toolkit, community forums, training programs, and resources even if you're not pursuing certification. Many members join first to learn and assess, then pursue certification when ready.",
    },
    {
      question: "Do you provide implementation support?",
      answer: "Yes. Organizational and Enterprise members receive dedicated implementation support. This includes consultation calls, framework customization assistance, review of documentation, and guidance on addressing gaps identified in assessments. We also offer optional paid consulting for complex implementations.",
    },
    {
      question: "How is certification maintained?",
      answer: "RAISE certification requires annual renewal through a streamlined review process. You'll submit updated documentation demonstrating continued compliance and any improvements made. We recognize that responsible AI is an ongoing practice, not a one-time achievement.",
    },
    {
      question: "Can we get certified for specific AI systems?",
      answer: "Yes. While some organizations pursue organizational-level certification for their overall AI program, you can also certify individual AI systems or applications. This is particularly common in regulated industries or for high-risk AI systems.",
    },
    {
      question: "What if we're just starting with AI?",
      answer: "Perfect! The Foundation Pathway is designed specifically for organizations in the early stages of AI adoption. It provides essential frameworks and practices to build responsible AI capabilities from the ground up, helping you avoid common pitfalls and establish strong governance early.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Frequently Asked Questions"
        description="Find answers to common questions about membership, certification, and responsible AI practices."
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground">
              Our team is here to help. Reach out and we'll get back to you within 2-3 business days.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
