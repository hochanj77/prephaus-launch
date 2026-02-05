import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import classroomImage from "@/assets/classroom.jpg";

export default function About() {
  return (
    <div className="pt-14">

      {/* Story Section */}
      <section className="pt-4 pb-8 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
                Our <span className="text-accent">Story</span>
              </h2>
              <div className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  We at PrepHaus believe that all students have the right to receive a good education. 
                  Moreover, the past 20 years of experience has taught me that good education is impossible 
                  without sharing life together with the students.
                </p>
                <p>
                  Education is the process of reaching our dreams and not the end goal. Therefore, we strive 
                  to be more than mere vessels for transferring knowledge. We try our best to leave no regrets 
                  to help students develop character alongside academic prowess every step of the way until the 
                  student can have a secure future.
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
