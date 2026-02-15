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

    </div>
  );
}
