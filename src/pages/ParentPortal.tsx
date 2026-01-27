import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Bell, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Lock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "View detailed charts and analytics showing your student's improvement over time.",
  },
  {
    icon: FileText,
    title: "Access Reports",
    description: "Download grade reports, practice test scores, and performance analysis.",
  },
  {
    icon: Calendar,
    title: "View Schedule",
    description: "See upcoming sessions, homework deadlines, and important dates.",
  },
  {
    icon: MessageSquare,
    title: "Message Instructors",
    description: "Communicate directly with your student's tutors through secure messaging.",
  },
  {
    icon: Bell,
    title: "Get Notifications",
    description: "Receive alerts about new reports, schedule changes, and progress updates.",
  },
  {
    icon: Lock,
    title: "Secure Access",
    description: "Your student's information is protected with enterprise-grade security.",
  },
];

const faqItems = [
  {
    question: "How do I create a parent account?",
    answer: "When your student enrolls, you'll receive an email invitation to create your parent portal account. Follow the link and set up your credentials.",
  },
  {
    question: "What information can I see in the portal?",
    answer: "You can view attendance records, test scores, homework completion, instructor notes, and progress reports.",
  },
  {
    question: "How often are reports updated?",
    answer: "Progress reports are updated weekly, while test scores are posted within 48 hours of completion.",
  },
  {
    question: "Can I communicate with instructors through the portal?",
    answer: "Yes! The portal includes a secure messaging system for direct communication with your student's tutors.",
  },
  {
    question: "Is my child's information secure?",
    answer: "Absolutely. We use industry-standard encryption and security measures to protect all student and family data.",
  },
];

export default function ParentPortal() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Parent <span className="text-accent">Portal</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Stay connected to your student's academic journey. Access reports, track progress, 
              and communicate with instructors all in one place.
            </p>
            <Button variant="accent" size="xl" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Parent Login
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Portal <span className="text-accent">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to support your student's success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Sign Up */}
      <section className="py-20 bg-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Getting <span className="text-accent">Started</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                { step: 1, title: "Enroll Your Student", description: "Complete the enrollment process for any PrepHaus program." },
                { step: 2, title: "Receive Invitation", description: "Check your email for a portal invitation within 24 hours of enrollment." },
                { step: 3, title: "Create Account", description: "Click the link in your email to set up your parent account credentials." },
                { step: 4, title: "Access Dashboard", description: "Log in and start tracking your student's progress immediately." },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex items-start gap-6 bg-card rounded-xl p-6 shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xl font-bold text-secondary-foreground">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Frequently Asked <span className="text-accent">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-md border border-border animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg font-bold text-secondary mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
            Need Help Accessing the Portal?
          </h2>
          <p className="text-lg text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get set up and answer any questions.
          </p>
          <Link to="/contact">
            <Button variant="accent" size="xl">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
