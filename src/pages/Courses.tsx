import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

const categories = [
  { id: "all", label: "All Courses" },
  { id: "sat", label: "SAT Prep" },
  { id: "act", label: "ACT Prep" },
  { id: "tutoring", label: "Subject Tutoring" },
];

const courses = [
  {
    id: 1,
    title: "SAT Comprehensive Prep",
    category: "sat",
    description: "Our flagship program covering all SAT sections with intensive practice, strategy sessions, and personalized feedback.",
    duration: "12 weeks",
    classSize: "Max 8 students",
    format: "In-person & Online",
    features: [
      "Full-length practice tests every 2 weeks",
      "Personalized study plan",
      "24/7 homework help access",
      "Score improvement guarantee",
    ],
    price: "Starting at $2,400",
  },
  {
    id: 2,
    title: "SAT Intensive Bootcamp",
    category: "sat",
    description: "Accelerated preparation for students who need quick, focused improvement before their test date.",
    duration: "4 weeks",
    classSize: "Max 6 students",
    format: "In-person & Online",
    features: [
      "Daily practice sessions",
      "Weekend practice tests",
      "One-on-one check-ins",
      "Test-taking strategies",
    ],
    price: "Starting at $1,200",
  },
  {
    id: 3,
    title: "SAT One-on-One",
    category: "sat",
    description: "Completely personalized instruction tailored to your unique learning style and target areas.",
    duration: "Flexible",
    classSize: "1-on-1",
    format: "In-person & Online",
    features: [
      "Custom curriculum",
      "Flexible scheduling",
      "Progress tracking",
      "Direct tutor access",
    ],
    price: "$150/hour",
  },
  {
    id: 4,
    title: "ACT Comprehensive Prep",
    category: "act",
    description: "Complete ACT preparation covering all sections with emphasis on pacing and strategy.",
    duration: "10 weeks",
    classSize: "Max 8 students",
    format: "In-person & Online",
    features: [
      "Science reasoning focus",
      "Essay writing workshop",
      "Time management training",
      "Practice test analysis",
    ],
    price: "Starting at $2,200",
  },
  {
    id: 5,
    title: "ACT Speed Course",
    category: "act",
    description: "Focused preparation emphasizing the unique timing challenges of the ACT.",
    duration: "6 weeks",
    classSize: "Max 8 students",
    format: "In-person & Online",
    features: [
      "Pacing strategies",
      "Section-specific tactics",
      "Bi-weekly practice tests",
      "Score analysis",
    ],
    price: "Starting at $1,500",
  },
  {
    id: 6,
    title: "Math Tutoring",
    category: "tutoring",
    description: "Algebra, Geometry, Pre-Calculus, and Calculus support for school and test prep.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "Homework help",
      "Concept reinforcement",
      "Test preparation",
      "Problem-solving skills",
    ],
    price: "$80-120/hour",
  },
  {
    id: 7,
    title: "English & Writing Tutoring",
    category: "tutoring",
    description: "Reading comprehension, grammar, and essay writing support for all levels.",
    duration: "Ongoing",
    classSize: "1-on-1 or small group",
    format: "In-person & Online",
    features: [
      "Essay structure",
      "Grammar mastery",
      "Reading strategies",
      "Vocabulary building",
    ],
    price: "$80-120/hour",
  },
  {
    id: 8,
    title: "Science Tutoring",
    category: "tutoring",
    description: "Biology, Chemistry, and Physics support for coursework and standardized tests.",
    duration: "Ongoing",
    classSize: "1-on-1",
    format: "In-person & Online",
    features: [
      "Lab report help",
      "Concept clarification",
      "Test preparation",
      "Problem solving",
    ],
    price: "$90-130/hour",
  },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCourses = activeCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-8 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4 md:mb-6">
              Course <span className="text-accent">Descriptions</span>
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
          {/* Filter Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg border border-border hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4 md:mb-6">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-secondary text-xs font-semibold rounded-full uppercase">
                        {categories.find(c => c.id === course.category)?.label}
                      </span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-secondary mb-2 md:mb-3">{course.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">{course.description}</p>

                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">{course.classSize}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">{course.format}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 md:mb-6">
                      {course.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-border flex items-center justify-between">
                      <span className="font-bold text-accent">{course.price}</span>
                      <Link to="/contact">
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-accent">
                          Inquire <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            Not Sure Which Course Is Right for You?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and we'll help you find the perfect program for your needs.
          </p>
          <Link to="/consulting">
            <Button variant="hero" size="xl">
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
