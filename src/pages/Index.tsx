import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/ivy-league-campus.jpg";
import { usePageContent } from "@/hooks/useSiteContent";

const heroDefaults = {
  headline: "Where Academic Potential Finds a Home.",
  subheading: "We are a community growing together, leaving no regrets as we build the academic prowess and inner grit needed for a secure future. At PrepHaus, we don't just help you reach a goal; we give you the momentum to surpass it.",
  cta_primary_text: "View Programs",
  cta_primary_link: "/courses",
  cta_secondary_text: "Download Course Catalog",
  cta_secondary_link: "/catalog",
};

const ctaDefaults = {
  headline: "Ready to Start Your Journey?",
  subheading: "Contact us today and learn how PrepHaus can help you achieve your academic goals.",
  button_text: "Contact Us",
  button_link: "/contact",
};

function SmartLink({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) {
  if (to.startsWith('http')) {
    return <a href={to} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  }
  return <Link to={to} {...props}>{children}</Link>;
}

export default function Index() {
  const { data: pageContent } = usePageContent("home");
  const hero = { ...heroDefaults, ...pageContent?.hero };
  const cta = { ...ctaDefaults, ...pageContent?.cta_section };

  const { data: announcements = [] } = useQuery({
    queryKey: ['published-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/75 to-secondary/50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              {hero.headline}
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-lg">
              {hero.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <SmartLink to={hero.cta_primary_link}>
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  {hero.cta_primary_text}
                </Button>
              </SmartLink>
              <SmartLink to={hero.cta_secondary_link}>
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground/10">
                  {hero.cta_secondary_text}
                </Button>
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Marquee Banner */}
      {announcements.length > 0 && (
        <div className="bg-secondary text-secondary-foreground overflow-hidden">
          <div className="flex items-center">
            <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 md:px-6 bg-accent text-accent-foreground font-semibold text-sm">
              <Megaphone className="h-4 w-4" />
              <span>News</span>
            </div>
            <div className="overflow-hidden relative flex-1">
              <div className="animate-marquee whitespace-nowrap py-2.5 flex gap-12">
                {[...announcements, ...announcements].map((a, i) => (
                  <span key={`${a.id}-${i}`} className="inline-flex items-center gap-2 text-sm">
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-secondary-foreground/70">—</span>
                    <span className="text-secondary-foreground/80">{a.content}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            {cta.headline}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            {cta.subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SmartLink to={cta.button_link}>
              <Button variant="hero" size="xl">
                {cta.button_text}
              </Button>
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  );
}

