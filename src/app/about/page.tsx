import { Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">About VibeCode</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re on a mission to make coding more intuitive, more creative, and more fun.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Target, title: "Our Mission", desc: "Democratize software development by making AI-powered tools accessible to everyone." },
            { icon: Users, title: "Our Team", desc: "A passionate group of engineers, designers, and dreamers from around the world." },
            { icon: Heart, title: "Our Values", desc: "Open source first, privacy by default, and always putting developers first." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border p-6 text-center">
              <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
