import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-study-desk.jpg";

const stats = [
  { value: "1500+", label: "Avg. Elite Score", icon: TrendingUp },
  { value: "Guaranteed", label: "Score Improvement", icon: CheckCircle },
  { value: "+180", label: "Average student gain", icon: TrendingUp },
];

const features = [
  "Personalized learning plans tailored to each student",
  "Expert tutors with proven track records",
  "Comprehensive practice tests and materials",
  "Flexible scheduling to fit busy lives",
];

const courses = [
  {
    title: "SAT Comprehensive",
    description: "Complete preparation covering all sections with intensive practice.",
    duration: "12 weeks",
  },
  {
    title: "ACT Prep Program",
    description: "Focused ACT preparation with strategy and content mastery.",
    duration: "10 weeks",
  },
  {
    title: "Subject Tutoring",
    description: "One-on-one help in Math, Reading, Writing, and more.",
    duration: "Flexible",
  },
];

export default function Index() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Full Width Background */}
      <section
        className="relative min-h-[85vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/75 to-secondary/50" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-semibold">TOP RATED SAT PREPARATION</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Unlock Your{" "}
              <span className="text-primary">Ivy League</span>{" "}
              Potential.
            </h1>

            {/* Subheading */}
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Expert-led prep programs designed to boost your scores and confidence.
              Join over 5,000 students who achieved their dream scores with PrepHaus.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/courses">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  View Programs
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-secondary">
                  Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Your Path to <span className="text-primary">SAT Success</span> Starts Here
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At PrepHaus, we believe every student has the potential to excel. Our proven methodology combines
              personalized instruction, comprehensive materials, and unwavering support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="h-8 w-8 text-primary mb-4" />
                <p className="text-foreground font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our <span className="text-primary">Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive test preparation programs designed to help students reach their full potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.title}
                className="bg-card rounded-2xl p-8 shadow-lg hover-lift border border-border animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{course.duration}</span>
                  <Link to="/courses" className="text-sm font-semibold text-secondary hover:text-primary transition-colors">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="hero" size="lg">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and learn how PrepHaus can help you achieve your academic goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link to="/consulting">
              <Button variant="hero-outline" size="xl">
                Learn About Consulting
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
