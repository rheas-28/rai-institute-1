import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const MembershipComparison = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const tiers = [
    {
      name: "Individual",
      price: "$199",
      period: "/year",
      description: "For professionals building responsible AI expertise",
      popular: false,
      features: [
        "Access to RAI resources & tools",
        "Community forum access",
        "Monthly webinars",
        "Individual certification pathway",
        "Newsletter & insights",
      ],
      cta: "Get Started",
      ctaLocation: "pricing-tier-individual",
    },
    {
      name: "Organizational",
      price: "$2,499",
      period: "/year",
      description: "For teams implementing responsible AI practices",
      popular: true,
      features: [
        "Everything in Individual, plus:",
        "Up to 10 team member seats",
        "Priority support",
        "Organizational certification",
        "Custom workshops (2/year)",
        "RAI maturity assessment",
        "Case study opportunities",
      ],
      cta: "Start Free Trial",
      ctaLocation: "pricing-tier-organizational",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations scaling responsible AI",
      popular: false,
      features: [
        "Everything in Organizational, plus:",
        "Unlimited team seats",
        "Dedicated success manager",
        "Custom certification pathways",
        "On-site training & workshops",
        "Executive advisory sessions",
        "White-label resources",
        "API access to RAI agents",
      ],
      cta: "Contact Sales",
      ctaLocation: "pricing-tier-enterprise",
    },
  ];

  const additionalFeatures = [
    {
      category: "Learning & Development",
      features: [
        { name: "Self-paced courses", individual: true, org: true, enterprise: true },
        { name: "Live workshops", individual: false, org: "2/year", enterprise: "Unlimited" },
        { name: "Custom training programs", individual: false, org: false, enterprise: true },
      ],
    },
    {
      category: "Certification",
      features: [
        { name: "Individual certification", individual: true, org: true, enterprise: true },
        { name: "Team certification", individual: false, org: true, enterprise: true },
        { name: "Custom certification tracks", individual: false, org: false, enterprise: true },
      ],
    },
    {
      category: "Support & Services",
      features: [
        { name: "Email support", individual: "Standard", org: "Priority", enterprise: "24/7" },
        { name: "Dedicated success manager", individual: false, org: false, enterprise: true },
        { name: "Advisory sessions", individual: false, org: false, enterprise: true },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-navy-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Membership Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of organizations building trustworthy AI. Select the membership tier that fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-8 transition-all duration-300 hover:scale-105 animate-fade-up ${
                tier.popular
                  ? "bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary shadow-glow"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cta-primary to-warning px-4 py-1 rounded-full text-sm font-semibold text-cta-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  tier.popular
                    ? "bg-cta-primary hover:bg-cta-hover text-cta-primary-foreground shadow-cta"
                    : ""
                }`}
                variant={tier.popular ? "default" : "outline"}
                data-cta-location={tier.ctaLocation}
              >
                <Link to="/join">{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="w-full text-center py-4 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            {showAllFeatures ? "Hide" : "Compare"} all features
          </button>

          {showAllFeatures && (
            <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Features</th>
                      <th className="text-center py-4 px-6 font-semibold text-foreground">Individual</th>
                      <th className="text-center py-4 px-6 font-semibold text-foreground">Organizational</th>
                      <th className="text-center py-4 px-6 font-semibold text-foreground">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalFeatures.map((category, categoryIdx) => (
                      <>
                        <tr key={category.category} className="border-t border-border">
                          <td
                            colSpan={4}
                            className="py-3 px-6 font-semibold text-foreground bg-muted/30"
                          >
                            {category.category}
                          </td>
                        </tr>
                        {category.features.map((feature, featureIdx) => (
                          <tr
                            key={`${categoryIdx}-${featureIdx}`}
                            className="border-t border-border/50"
                          >
                            <td className="py-3 px-6 text-muted-foreground">{feature.name}</td>
                            <td className="text-center py-3 px-6">
                              {typeof feature.individual === "boolean" ? (
                                feature.individual ? (
                                  <Check className="w-5 h-5 text-success mx-auto" />
                                ) : (
                                  <span className="text-muted-foreground/50">—</span>
                                )
                              ) : (
                                <span className="text-sm text-muted-foreground">{feature.individual}</span>
                              )}
                            </td>
                            <td className="text-center py-3 px-6">
                              {typeof feature.org === "boolean" ? (
                                feature.org ? (
                                  <Check className="w-5 h-5 text-success mx-auto" />
                                ) : (
                                  <span className="text-muted-foreground/50">—</span>
                                )
                              ) : (
                                <span className="text-sm text-muted-foreground">{feature.org}</span>
                              )}
                            </td>
                            <td className="text-center py-3 px-6">
                              {typeof feature.enterprise === "boolean" ? (
                                feature.enterprise ? (
                                  <Check className="w-5 h-5 text-success mx-auto" />
                                ) : (
                                  <span className="text-muted-foreground/50">—</span>
                                )
                              ) : (
                                <span className="text-sm text-muted-foreground">{feature.enterprise}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MembershipComparison;
