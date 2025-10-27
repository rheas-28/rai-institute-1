import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    organization: [
      { name: "Who We Are", path: "/who-we-are" },
      { name: "Careers", path: "/careers" },
      { name: "News", path: "/news" },
      { name: "FAQ", path: "/faq" },
    ],
    programs: [
      { name: "RAISE Pathways", path: "/raise-pathways" },
      { name: "Tools & Guides", path: "/tools-guides" },
      { name: "Join", path: "/join" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/responsibleai", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/responsible-ai-institute", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/responsible-ai-institute", label: "GitHub" },
    { icon: Mail, href: "mailto:info@responsible.ai", label: "Email" },
  ];

  return (
    <footer className="bg-navy-darker border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-foreground font-semibold text-lg">
                Responsible AI Institute
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              Advancing standards-aligned AI development through membership, certification pathways, and tools for trustworthy AI systems.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Contact</p>
              <p>123 AI Standards Way</p>
              <p>San Francisco, CA 94102</p>
              <p>info@responsible.ai</p>
            </div>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Organization</h3>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Responsible AI Institute. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary transition-colors flex items-center justify-center group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
