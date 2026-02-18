import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { usePageContent } from "@/hooks/useSiteContent";

const defaultPrograms = [
  "SAT Prep", "ACT Prep", "BCA Prep", "Columbia SHP",
  "Math Contests", "Writing Contests", "Science Contest", "Private Lessons",
];

const heroDefaults = {
  headline: "Our Programs",
  subheading: "Explore our comprehensive range of test preparation programs and academic tutoring services designed to help every student succeed.",
};

const ctaDefaults = {
  text: "Reach out and we'll help you find the perfect program for your needs.",
  button_text: "Download Course Catalog",
  button_link: "/catalog",
};

export default function Courses() {
  const { data: pageContent } = usePageContent("courses");
  const hero = { ...heroDefaults, ...pageContent?.hero };
  const cta = { ...ctaDefaults, ...pageContent?.cta };

  let programs = defaultPrograms;
  if (pageContent?.programs_list?.programs) {
    try {
      const parsed = JSON.parse(pageContent.programs_list.programs);
      if (Array.isArray(parsed) && parsed.length > 0) programs = parsed;
    } catch { /* use defaults */ }
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4 md:mb-6">
              {hero.headline}
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              {hero.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {programs.map((title, index) => (
              <div
                key={index}
                className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg border border-border hover-lift animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-secondary">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-warm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            {cta.text}
          </p>
          <Link to={cta.button_link}>
            <Button variant="hero" size="xl">
              {cta.button_text}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
