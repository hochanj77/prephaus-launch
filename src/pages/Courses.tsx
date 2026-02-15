import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "SAT Prep",
    category: "test-prep",
    description: "Comprehensive SAT preparation focusing on critical reading, math, and writing skills.",
    duration: "12 weeks",
    classSize: "Max 10 students",
    format: "In-person & Online",
    features: [
      "Practice tests",
      "Strategy sessions",
      "Personalized feedback",
    ],
    price: "Contact for pricing",
  },
  {
    id: 2,
    title: "ACT Prep",
    category: "test-prep",
    description: "Complete ACT preparation covering all sections with emphasis on pacing, strategy, and content mastery.",
    duration: "10 weeks",
    classSize: "Max 8 students",
    format: "In-person & Online",
    features: [
      "Science reasoning focus",
      "Time management training",
      "Practice test analysis",
    ],
    price: "Contact for pricing",
  },
  {
    id: 3,
    title: "Algebra I",
    category: "academic",
    description: "Build a strong foundation in algebraic concepts including equations, inequalities, and functions.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "Concept reinforcement",
      "Homework help",
      "Test preparation",
    ],
    price: "Contact for pricing",
  },
  {
    id: 4,
    title: "Algebra II",
    category: "academic",
    description: "Advanced algebra covering polynomials, rational expressions, logarithms, and more.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "Advanced problem solving",
      "Concept mastery",
      "Test preparation",
    ],
    price: "Contact for pricing",
  },
  {
    id: 5,
    title: "Geometry",
    category: "academic",
    description: "Comprehensive geometry covering proofs, theorems, area, volume, and coordinate geometry.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "Proof writing skills",
      "Visual problem solving",
      "Test preparation",
    ],
    price: "Contact for pricing",
  },
  {
    id: 6,
    title: "Precalculus (IB / AP)",
    category: "academic",
    description: "Preparation for advanced mathematics covering trigonometry, limits, and analytical geometry for IB and AP curricula.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "IB & AP aligned",
      "Trigonometry mastery",
      "College readiness",
    ],
    price: "Contact for pricing",
  },
  {
    id: 7,
    title: "Calculus (IB / AP)",
    category: "academic",
    description: "In-depth calculus instruction covering derivatives, integrals, and applications for IB and AP exams.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "IB & AP exam prep",
      "Conceptual understanding",
      "Practice problems",
    ],
    price: "Contact for pricing",
  },
  {
    id: 8,
    title: "Literacy",
    category: "academic",
    description: "Reading comprehension, grammar, writing skills, and vocabulary building for all levels.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "Reading strategies",
      "Essay writing",
      "Grammar mastery",
    ],
    price: "Contact for pricing",
  },
];

export default function Courses() {
  return (
    <div className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="pt-4 pb-8 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
             <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4 md:mb-6">
               Our <span className="text-accent">Programs</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              Explore our comprehensive range of test preparation programs and academic tutoring services 
              designed to help every student succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg border border-border hover-lift animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-secondary">{course.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
