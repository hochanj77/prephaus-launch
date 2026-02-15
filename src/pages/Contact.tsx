import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";

const gradeOptions = [
  { value: "8", label: "8th Grade" },
  { value: "9", label: "9th Grade" },
  { value: "10", label: "10th Grade" },
  { value: "11", label: "11th Grade" },
  { value: "12", label: "12th Grade" },
  { value: "college", label: "College" },
];

const subjectOptions = [
  { value: "sat", label: "SAT Prep" },
  { value: "act", label: "ACT Prep" },
  { value: "math", label: "Math" },
  { value: "english", label: "English/Writing" },
  { value: "science", label: "Science" },
  { value: "other", label: "Other" },
];

const contactDefaults = {
  address_line1: "268 Broad Ave Floor 2B",
  address_line2: "Palisades Park, NJ 07650",
  phone: "(201) 525-8577",
  email: "info@prephaus.com",
  hours_weekday: "Mon-Fri: 9am - 8pm",
  hours_weekend: "Sat-Sun: 10am - 5pm",
};

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    subjects: [] as string[],
    message: "",
    wantsCatalog: false,
  });

  const { data: contactData } = useSiteContent("global", "contact_info");
  const c = { ...contactDefaults, ...contactData?.content };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [c.address_line1, c.address_line2],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [c.phone],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [c.email],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [c.hours_weekday, c.hours_weekend],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      grade: "",
      subjects: [],
      message: "",
      wantsCatalog: false,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-10 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ready to start your journey to SAT success? Get in touch for a free consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-6 md:py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in-up">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-4 shadow-md border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-sm mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-xs">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map/CTA */}
      <section className="py-6 md:py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-5 shadow-lg border border-border animate-fade-in-up">
                <h2 className="text-xl font-bold text-secondary mb-3">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="grade">Student Grade Level</Label>
                      <Select
                        value={formData.grade}
                        onValueChange={(value) => setFormData({ ...formData, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Subject(s) of Interest</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {subjectOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.value}
                            checked={formData.subjects.includes(option.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, subjects: [...formData.subjects, option.value] });
                              } else {
                                setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== option.value) });
                              }
                            }}
                          />
                          <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your goals and how we can help..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="catalog"
                      checked={formData.wantsCatalog}
                      onCheckedChange={(checked) => setFormData({ ...formData, wantsCatalog: checked as boolean })}
                    />
                    <Label htmlFor="catalog" className="text-sm font-normal cursor-pointer">
                      I'd like to receive the course catalog via email
                    </Label>
                  </div>

                  <Button variant="hero" size="lg" type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Map & CTA Sidebar */}
            <div className="space-y-4 animate-fade-in-up animate-fade-in-delay">
              <div className="bg-muted rounded-xl h-48 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Google Maps Integration</p>
                </div>
              </div>

              <div className="bg-warm rounded-xl p-5">
                <h3 className="text-lg font-bold text-secondary mb-2">
                  Prefer to Talk?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Schedule a free phone or in-person consultation with one of our academic advisors.
                </p>
                <Button variant="hero" size="default" asChild className="w-full">
                  <a href={`tel:${c.phone.replace(/\D/g, '')}`}>
                    Call {c.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

