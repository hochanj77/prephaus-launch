import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, Twitter, Linkedin, ExternalLink } from "lucide-react";

const socialPlatforms = [
  {
    name: "Instagram",
    handle: "@prephaus",
    icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    url: "#",
    description: "Daily study tips, student success stories, and behind-the-scenes content.",
  },
  {
    name: "Facebook",
    handle: "PrepHaus Academy",
    icon: Facebook,
    color: "bg-blue-600",
    url: "#",
    description: "Community updates, parent resources, and event announcements.",
  },
  {
    name: "YouTube",
    handle: "PrepHaus",
    icon: Youtube,
    color: "bg-red-600",
    url: "#",
    description: "Free SAT prep videos, study strategies, and student testimonials.",
  },
  {
    name: "Twitter",
    handle: "@prephaus",
    icon: Twitter,
    color: "bg-sky-500",
    url: "#",
    description: "Quick tips, test date reminders, and education news.",
  },
  {
    name: "LinkedIn",
    handle: "PrepHaus Academy",
    icon: Linkedin,
    color: "bg-blue-700",
    url: "#",
    description: "Professional updates and career resources for students.",
  },
];

const recentPosts = [
  {
    platform: "Instagram",
    content: "Congratulations to Sarah for achieving a perfect 1600 on her SAT! 🎉 Hard work pays off!",
    engagement: "1.2K likes",
    date: "2 days ago",
  },
  {
    platform: "YouTube",
    content: "New video: '5 Math Shortcuts Every SAT Student Should Know' - Watch now!",
    engagement: "5.4K views",
    date: "1 week ago",
  },
  {
    platform: "Facebook",
    content: "Join us for our FREE SAT Strategy Workshop this Saturday! Limited spots available.",
    engagement: "234 shares",
    date: "3 days ago",
  },
];

const successStories = [
  {
    name: "Marcus T.",
    improvement: "SAT: 1180 → 1420",
    quote: "PrepHaus gave me the confidence I needed. The tutors made even the hardest concepts click!",
  },
  {
    name: "Emily R.",
    improvement: "SAT: 1250 → 1510",
    quote: "I couldn't have done it without the personalized attention. Thank you, PrepHaus!",
  },
  {
    name: "Jason L.",
    improvement: "ACT: 24 → 32",
    quote: "The practice tests were exactly like the real thing. I felt so prepared on test day.",
  },
];

export default function Social() {
  return (
    <div className="pt-16 md:pt-24">

      {/* Social Platforms */}
      <section className="pt-4 pb-8 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {socialPlatforms.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg border border-border hover-lift animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl ${platform.color} flex items-center justify-center mb-3 md:mb-6`}>
                  <platform.icon className="h-5 w-5 md:h-8 md:w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-secondary mb-1">{platform.name}</h3>
                <p className="text-accent font-medium text-xs md:text-base mb-2 md:mb-3">{platform.handle}</p>
                <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 hidden md:block">{platform.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-secondary group-hover:text-accent transition-colors">
                  <span className="hidden md:inline">Follow Us</span> <ExternalLink className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12 md:py-20 bg-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4">
              Recent <span className="text-accent">Posts</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {recentPosts.map((post, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 md:p-6 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-accent">{post.platform}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <p className="text-foreground mb-4">{post.content}</p>
                <p className="text-sm text-muted-foreground">{post.engagement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Student <span className="text-accent">Success Stories</span>
            </h2>
            <p className="text-secondary-foreground/70">Real students. Real results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-secondary-foreground/5 rounded-xl md:rounded-2xl p-5 md:p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-accent font-bold text-lg mb-2">{story.improvement}</div>
                <p className="text-secondary-foreground/90 italic mb-4">"{story.quote}"</p>
                <p className="font-semibold text-secondary-foreground">— {story.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-4 md:mb-6">
            Want to Be Our Next Success Story?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have achieved their target scores with PrepHaus.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
