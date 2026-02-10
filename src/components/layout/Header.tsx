import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings, LogOut } from "lucide-react";
import prephausLogo from "@/assets/prephaus-horizontal-logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Course Descriptions", href: "/courses" },
  { label: "Consulting", href: "/consulting" },
  { label: "Social", href: "/social" },
  { label: "SAT Test Platform", href: "https://prephaus.ditoed.com", external: true },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background",
        isScrolled
          ? "shadow-md py-4"
          : "py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <img 
              src={prephausLogo} 
              alt="PrepHaus" 
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => 
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 text-base font-medium transition-colors rounded-md text-foreground hover:text-accent"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-5 py-2 text-base font-medium transition-colors rounded-md",
                    location.pathname === item.href
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {user && (
              <Button variant="ghost" size="default" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
            {user && isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="default" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/parent-portal">
              <Button variant="accent" size="default">
                Portal Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => 
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm font-medium rounded-lg transition-colors text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      location.pathname === item.href
                        ? "bg-primary/10 text-accent"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                {user && (
                  <Button variant="ghost" className="w-full gap-2 justify-start" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                )}
                {user && isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="w-full gap-2">
                      <Settings className="h-4 w-4" />
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Link to="/parent-portal">
                  <Button variant="accent" className="w-full">
                    Portal Login
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
