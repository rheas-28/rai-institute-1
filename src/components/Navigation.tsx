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
                    ["/raise-pathways"].includes(location.pathname) ? "text-primary" : "text-muted-foreground"
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
                            <div className="text-sm font-medium leading-none">Responsible AI Verification</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Independent verification and certification for trusted AI systems
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/news"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Thought Leadership</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Industry insights, research, and expert perspectives on responsible AI
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/community"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Community</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Connect with enterprise AI leaders and peers
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/enterprise"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Support for Enterprise Leaders</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Resources and partnerships for enterprise AI governance
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
                    ["/tools-guides", "/ai-policy-template", "/ai-maturity-assessment", "/responsible-ai-handbook", "/news", "/rai-controls-library", "/verification-badges", "/raise-agents", "/raise-pathways-assets", "/case-studies", "/ai-code-of-conduct", "/events-archive"].includes(location.pathname) ? "text-primary" : "text-muted-foreground"
                  }`}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 max-h-[500px] overflow-y-auto">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/rai-controls-library"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAI Controls Library</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Comprehensive library of responsible AI controls and frameworks
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/verification-badges"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Responsible AI Verification Badges</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Industry-recognized verification and certification badges
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/raise-agents"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAISE Agents</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              AI agents for responsible AI implementation and monitoring
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/raise-pathways-assets"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAISE Pathways Assets</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Resources and assets for RAISE certification pathways
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/case-studies"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Member Case Studies</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Real-world success stories from our member organizations
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/ai-code-of-conduct"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Unified AI Code of Conduct</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Industry-standard code of conduct for AI development
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/news"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Research, Reports & Blogs</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Latest insights and thought leadership on responsible AI
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events-archive"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Events & Webinars Archive</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Access past events, webinars, and recorded sessions
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
              <Link to="/raise-pathways" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/raise-pathways") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Responsible AI Verification</Link>
              <Link to="/news" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/news") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Thought Leadership</Link>
              <Link to="/community" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/community") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Community</Link>
              <Link to="/enterprise" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/enterprise") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Support for Enterprise Leaders</Link>
            </div>

            <div className="pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">Resources</div>
              <Link to="/rai-controls-library" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/rai-controls-library") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAI Controls Library</Link>
              <Link to="/verification-badges" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/verification-badges") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Verification Badges</Link>
              <Link to="/raise-agents" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/raise-agents") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAISE Agents</Link>
              <Link to="/raise-pathways-assets" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/raise-pathways-assets") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAISE Pathways Assets</Link>
              <Link to="/case-studies" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/case-studies") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Member Case Studies</Link>
              <Link to="/ai-code-of-conduct" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/ai-code-of-conduct") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>AI Code of Conduct</Link>
              <Link to="/news" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/news") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Research, Reports & Blogs</Link>
              <Link to="/events-archive" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/events-archive") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Events & Webinars Archive</Link>
            </div>

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
