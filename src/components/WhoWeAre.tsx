import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, TrendingUp, Brain, Heart, Star } from "lucide-react";

const WhoWeAre = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Enhance athletic activities within institutions by establishing world-class sports academies"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Enriching social life through sports counseling, events, and interactive activities"
    },
    {
      icon: TrendingUp,
      title: "Growth & Excellence",
      description: "Continuously expanding and elevating the sports life of students and faculty"
    }
  ];

  return (
    <section id="who-we-are" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-blue-900">
              Who we are?
            </h2>
            <p className="text-2xl text-blue-800 max-w-5xl mx-auto leading-relaxed font-medium">
              We transcend traditional sports education by cultivating champions who excel both on the field and in life, fostering excellence, discipline, and leadership that extends far beyond athletic performance.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-3xl p-12 md:p-16 mb-20 shadow-2xl border-4 border-blue-100">
            <p className="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
              At Active Performance Hub (APH), we believe that sports is more than just a game, it's a mindset. We are a youth-focused academy dedicated to developing the next generation of athletes by nurturing not just their technical abilities, but their discipline, confidence, and leadership.
            </p>
            <p className="text-xl leading-relaxed text-gray-800 font-medium">
              Founded in 2025, we specialize in enhancing athletic activities within institutions by establishing sports academies or partnering with existing clubs. Our first academy, <strong className="text-blue-600">Strike Tennis Academy</strong>, has been successfully operating for three years in New Cairo.
            </p>
          </div>

          {/* Our Approach Section */}
          <div className="mb-20">
            <h3 className="text-4xl font-black text-center mb-12 text-blue-900">
              Our Approach
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-blue-200 bg-white"
                  >
                    <CardContent className="p-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold mb-4 text-blue-900">{feature.title}</h4>
                      <p className="text-gray-700 text-lg leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Mindset Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 md:p-16 text-white text-center mb-20 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <Brain className="h-12 w-12 mr-4" />
              <h3 className="text-4xl font-black">Reach it Mental Health</h3>
            </div>
            <p className="text-xl leading-relaxed mb-10 max-w-5xl mx-auto font-medium">
              There are countless ways we develop the mindset of our players each designed to build confidence, resilience, and a champion's spirit both on and off the pitch.
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-4 text-lg rounded-full shadow-lg">
              <a href="mailto:business@aph-sports.org">Contact Now</a>
            </Button>
          </div>

          {/* Balanced Development Section */}
          <div className="text-center bg-white rounded-3xl p-12 md:p-16 shadow-2xl border-4 border-blue-100">
            <h3 className="text-5xl font-black mb-8 text-blue-900">
              Balanced sports development for future champions.
            </h3>
            <p className="text-2xl text-blue-800 mb-8 max-w-4xl mx-auto font-medium leading-relaxed">
              At APH, we help young players grow in talent, mindset, and leadership one session at a time.
            </p>
            <p className="text-xl text-blue-700 mb-12 max-w-5xl mx-auto font-semibold leading-relaxed">
              Our coaching staff brings over 7+ years of professional experience in each specialized field, ensuring world-class training and mentorship for every athlete.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => {
                  const element = document.getElementById('news');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 text-lg rounded-full shadow-lg"
              >
                Join our training program today!
              </Button>
              <Button variant="outline" className="border-4 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-12 py-4 text-lg rounded-full">
                Experience Our Expert Coaching
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
