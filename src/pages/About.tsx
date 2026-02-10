import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import classroomImage from "@/assets/classroom.jpg";

export default function About() {
  return (
    <div className="pt-24">

      {/* Welcome Section */}
      <section className="pt-4 pb-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
                Welcome to PrepHaus: Where Potential Finds a <span className="text-accent">Home</span>
              </h1>
              <div className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p className="font-semibold text-foreground">
                  PrepHaus was built on a simple belief: students learn best in community.
                </p>
                <p>
                  Our name is our philosophy. Derived from the German <em>Haus</em>, it implies far more than just a building or a classroom. It signifies home, belonging, and a shared life. We've traded the cold, assembly-line feel of traditional test prep for a warm, welcoming environment—a place where students feel at home with teachers who genuinely know them, believe in them, and challenge them to grow.
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

      {/* The Power of Belonging */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-6">
              The Power of <span className="text-accent">Belonging</span>
            </h2>
            <div className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                What sets PrepHaus apart is our focus on community. We believe that curiosity thrives when students feel secure. In our Haus, you aren't just a number on a diagnostic test, but an individual with a story. We've cultivated a space where students are encouraged to ask questions, take risks, support one another, and grow together. With 40+ years of combined expertise, we know that the best results come when a student feels seen and supported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Heart Behind the Knowledge */}
      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-6">
              The Heart Behind the <span className="text-accent">Knowledge</span>
            </h2>
            <div className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                While many see education as a transactional transfer of facts, we strive to be more than mere vessels for knowledge. We believe education is not the end goal, but the vital process that helps students reach their dreams. Our teachers are mentors who care deeply, not just for your score growth, but for your personal potential.
              </p>
              <p className="font-medium text-foreground">
                At PrepHaus, we work intentionally, every step of the way, to help students develop:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span><strong>Curiosity & Self-Belief:</strong> To see themselves as capable of anything.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span><strong>Discipline & Resilience:</strong> To tackle challenges with a steady hand.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span><strong>Character & Purpose:</strong> To ensure their success is built on a solid foundation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Excellence */}
      <section className="py-8 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-6">
              Built for Excellence. Anchored in <span className="text-accent">Community</span>.
            </h2>
            <div className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                In this Haus, we never mistake warmth for weakness. We are uncompromising when it comes to academic rigor. Our standards are elite, and we never sacrifice performance for comfort. Instead, we use our community as the fuel for high achievement, believing that students reach their peak when they are challenged within a place they truly belong.
              </p>
              <p>
                We are a community growing together, leaving no regrets as we build the academic prowess and inner grit needed for a secure future. At PrepHaus, we don't just help you reach a goal; we give you the momentum to surpass it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            Ready to Join the PrepHaus Family?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
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
