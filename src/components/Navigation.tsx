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
            
            {/* Who We Are Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`px-4 py-2 text-sm font-medium ${
                    isActive("/who-we-are") ? "text-primary" : "text-muted-foreground"
                  }`}>
                    Who We Are
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/who-we-are#about-us"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">About Us</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Our mission, approach, and core values
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/who-we-are#rai-board"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAI Board</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Meet our board members and leadership team
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/who-we-are#rai-fellows"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAI Fellows</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Our expert advisors and thought leaders
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/who-we-are#rai-advisors"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAI Advisors</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Our advisory network and strategic partners
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/who-we-are#rai-community"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">RAI Community</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Our members and ecosystem collaborators
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
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
                    ["/tools-guides", "/ai-policy-template", "/ai-maturity-assessment", "/responsible-ai-handbook", "/news", "/blog", "/rai-controls-library", "/verification-badges", "/raise-agents", "/raise-pathways-assets", "/case-studies", "/ai-code-of-conduct", "/events-archive"].includes(location.pathname) ? "text-primary" : "text-muted-foreground"
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
                            <div className="text-sm font-medium leading-none">Tools & Frameworks</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              RAI Controls Library, RAISE Pathways Assets, and implementation tools
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
                            <div className="text-sm font-medium leading-none">Certification & Badges</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Verification badges and certification programs
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
                            <div className="text-sm font-medium leading-none">AI Agents</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              MIRA, VERA, and other AI-powered RAI tools
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
                            <div className="text-sm font-medium leading-none">Case Studies & Success Stories</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Real-world RAI implementations from our member community
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/blog"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Insights Hub</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Research, reports, blogs, and thought leadership
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
                            <div className="text-sm font-medium leading-none">Events & Webinars</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Live events and on-demand webinar recordings
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
              to="/community"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/community")
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Community
            </Link>

            <Button asChild className="bg-cta-primary hover:bg-cta-hover text-cta-primary-foreground font-semibold shadow-cta" size="sm">
              <Link to="/join" data-cta-location="nav-primary">Membership</Link>
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
            
            <div className="pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">Who We Are</div>
              <Link to="/who-we-are#about-us" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/who-we-are") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>About Us</Link>
              <Link to="/who-we-are#rai-board" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/who-we-are") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAI Board</Link>
              <Link to="/who-we-are#rai-fellows" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/who-we-are") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAI Fellows</Link>
              <Link to="/who-we-are#rai-advisors" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/who-we-are") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAI Advisors</Link>
              <Link to="/who-we-are#rai-community" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/who-we-are") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>RAI Community</Link>
            </div>
            
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
              <Link to="/blog" onClick={() => setIsOpen(false)} className={`block px-6 py-2 rounded-md text-sm transition-colors ${isActive("/blog") ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>Blogs</Link>
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
