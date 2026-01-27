import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, BookOpen, CheckCircle, ArrowRight, Quote } from "lucide-react";
import heroImage from "@/assets/hero-study-desk.jpg";
import classroomImage from "@/assets/classroom.jpg";

const stats = [
  { value: "500+", label: "Students Helped", icon: Users },
  { value: "150+", label: "Avg. Point Improvement", icon: TrendingUp },
  { value: "98%", label: "Parent Satisfaction", icon: Award },
  { value: "15+", label: "Years Experience", icon: BookOpen },
];

const features = [
  "Personalized learning plans tailored to each student",
  "Expert tutors with proven track records",
  "Comprehensive practice tests and materials",
  "Flexible scheduling to fit busy lives",
  "Regular progress reports for parents",
  "Small group and one-on-one options",
];

const testimonials = [
  {
    quote: "PrepHaus helped my daughter increase her SAT score by 200 points! The personalized attention made all the difference.",
    author: "Sarah M.",
    role: "Parent",
  },
  {
    quote: "The tutors really care about your success. I went from anxious about the test to confident and prepared.",
    author: "James T.",
    role: "Student",
  },
  {
    quote: "Worth every penny. Our son got into his dream school thanks to his improved scores.",
    author: "The Rodriguez Family",
    role: "Parents",
  },
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-secondary/20" />
        </div>

        {/* Hero Card */}
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="hero-card text-center animate-scale-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-secondary">
              AT <span className="text-primary">PREPHAUS</span>, WE FOCUS ON{" "}
              <span className="text-emphasis">EXCELLENCE</span> TO CREATE A{" "}
              <span className="text-emphasis">STRONG EDUCATIONAL EXPERIENCE</span> FOR EACH STUDENT.
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="hero-outline" size="xl">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Your Path to <span className="text-accent">SAT Success</span> Starts Here
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At PrepHaus, we believe every student has the potential to excel. Our proven methodology combines 
                personalized instruction, comprehensive materials, and unwavering support to help students achieve 
                their best possible scores.
              </p>
              <ul className="space-y-4">
                {features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="accent" size="lg">
                    Learn More About Us
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-fade-in-up animate-fade-in-delay">
              <img
                src={classroomImage}
                alt="Students learning at PrepHaus"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our <span className="text-accent">Programs</span>
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
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-accent">{course.duration}</span>
                  <Link to="/courses" className="text-sm font-semibold text-secondary hover:text-accent transition-colors">
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
      <section className="py-20 bg-warm">
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
