import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import classroomImage from "@/assets/classroom.jpg";

export default function About() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              About <span className="text-accent">PrepHaus</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded in 2009, PrepHaus has been dedicated to helping students achieve their academic dreams 
              through personalized test preparation and unwavering support.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our <span className="text-accent">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  PrepHaus was born from a simple belief: every student deserves access to high-quality 
                  test preparation that meets them where they are and takes them where they want to go.
                </p>
                <p>
                  Our founder, Dr. Sarah Mitchell, started tutoring students from her living room, 
                  developing personalized strategies that consistently delivered results. Word spread, 
                  and what began as one-on-one sessions grew into the comprehensive academy we are today.
                </p>
                <p>
                  After helping over 500 students improve their scores and gain admission to their 
                  dream schools, we remain committed to the same personal touch that started it all.
                </p>
              </div>
            </div>
            <div className="animate-fade-in-up animate-fade-in-delay">
              <img
                src={classroomImage}
                alt="PrepHaus learning environment"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            Ready to Join the PrepHaus Family?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step toward achieving your academic goals.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
