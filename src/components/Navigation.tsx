import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-navy-darker/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-foreground">
            <Logo showText={true} className="hidden sm:flex" />
            <Logo showText={false} className="flex sm:hidden" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/who-we-are"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/who-we-are")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Who We Are
            </Link>
            
            {/* What We Offer Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`px-4 py-2 text-sm font-medium ${
                    isActive("/raise-pathways") ? "text-primary" : "text-muted-foreground"
                  }`}>
                    What We Offer
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/raise-pathways"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAISE Pathways</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Structured certification programs aligned with global AI governance standards
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Resources Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`px-4 py-2 text-sm font-medium ${
                    ["/tools-guides", "/ai-policy-template", "/ai-maturity-assessment", "/responsible-ai-handbook"].includes(location.pathname) ? "text-primary" : "text-muted-foreground"
                  }`}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tools-guides"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Tools & Guides</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Comprehensive toolkit for practical AI implementation
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/ai-policy-template"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">AI Policy Template</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Ready-to-use policy template for AI governance
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/ai-maturity-assessment"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">AI Maturity Assessment</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              5-minute assessment to benchmark your AI readiness
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/responsible-ai-handbook"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Responsible AI Handbook</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Enterprise-ready guide to building responsible AI
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/news"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/news")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              News
            </Link>
            <Link
              to="/join"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/join")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Join
            </Link>
            <Link
              to="/faq"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/faq")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              FAQ
            </Link>
            <Link
              to="/careers"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/careers")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Careers
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild>
              <Link to="/join">Become a Member</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border">
            <Link to="/" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive("/") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Home</Link>
            <Link to="/who-we-are" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive("/who-we-are") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Who We Are</Link>
            
            <div className="pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">What We Offer</div>
              <Link to="/raise-pathways" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/raise-pathways") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAISE Pathways</Link>
            </div>

            <div className="pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">Resources</div>
              <Link to="/tools-guides" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/tools-guides") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Tools & Guides</Link>
              <Link to="/ai-policy-template" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/ai-policy-template") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>AI Policy Template</Link>
              <Link to="/ai-maturity-assessment" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/ai-maturity-assessment") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>AI Maturity Assessment</Link>
              <Link to="/responsible-ai-handbook" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/responsible-ai-handbook") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Responsible AI Handbook</Link>
            </div>

            <Link to="/news" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive("/news") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>News</Link>
            <Link to="/join" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive("/join") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Join</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive("/faq") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>FAQ</Link>
            <Link to="/careers" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive("/careers") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Careers</Link>
            <div className="pt-4"><Button asChild className="w-full"><Link to="/join" onClick={() => setIsOpen(false)}>Become a Member</Link></Button></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
