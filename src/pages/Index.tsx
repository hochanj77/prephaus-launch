import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/ivy-league-campus.jpg";


export default function Index() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Full Width Background */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/75 to-secondary/50" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              Unlock Your{" "}
              <span className="text-accent">Ivy League</span>{" "}
              Potential.
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-lg">
              Expert-led prep programs designed to boost your scores and confidence.
              With 40+ years of expertise, we know that the best results come when a student feels seen and supported.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <Link to="/courses">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  View Programs
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground/10">
                  Download Course Catalog
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            Ready to Start Your Journey?
          </h2>
           <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Contact us today and learn how PrepHaus can help you achieve your academic goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
