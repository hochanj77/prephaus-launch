import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Users, BookOpen, Target, Heart, User } from "lucide-react";
import classroomImage from "@/assets/classroom.jpg";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "Every student is treated as an individual with unique needs.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build lasting relationships with students and families.",
  },
  {
    icon: BookOpen,
    title: "Growth",
    description: "Continuous improvement is at the heart of our approach.",
  },
];

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & Lead Instructor",
    bio: "15+ years of experience in standardized test preparation with a Ph.D. in Education.",
  },
  {
    name: "Michael Chen",
    role: "SAT Math Specialist",
    bio: "Former math olympiad coach with a passion for making numbers accessible to everyone.",
  },
  {
    name: "Emily Rodriguez",
    role: "Reading & Writing Expert",
    bio: "Published author and language arts educator with 10 years of tutoring experience.",
  },
];

const differentiators = [
  "Small class sizes (max 8 students) for personalized attention",
  "Proprietary curriculum developed over 15 years",
  "Regular practice tests with detailed score analysis",
  "Parent communication every step of the way",
  "Money-back guarantee if targets aren't met",
  "Flexible scheduling including weekends",
];

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

      {/* Values Section */}
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our <span className="text-accent">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-8 text-center hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                  <value.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Meet Our <span className="text-accent">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert educators passionate about helping students succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <User className="h-24 w-24 text-muted-foreground/40" />
                  </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
                What Makes Us <span className="text-accent">Different</span>
              </h2>
            </div>

            <div className="space-y-4">
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-secondary-foreground/5 rounded-xl p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground">{item}</span>
                </div>
              ))}
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
