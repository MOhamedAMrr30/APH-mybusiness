import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Star, Trophy, Users, Instagram } from "lucide-react";
import SubscribeForm from "@/components/SubscribeForm";

const News = () => {
  const newsItems = [
    {
      date: "Coming Soon",
      title: "🏆 Championship Updates & Results",
      description: "Stay tuned for the latest tournament results and championship news",
      icon: Star
    },
    {
      date: "Coming Soon", 
      title: "🎯 New Program Announcements",
      description: "Exciting new training programs and academy expansions coming your way",
      icon: Trophy
    },
    {
      date: "Coming Soon",
      title: "🌟 Success Stories & Achievements",
      description: "Celebrating our athletes' remarkable achievements and milestones",
      icon: Users
    }
  ];

  return (
    <section id="news" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Coming Soon Banner */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl border-4 border-white">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight">
                  COMING SOON
                </h3>
              </div>
              <p className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
                🚀 Exciting News Section Under Development
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                We're working hard to bring you the latest updates, achievements, and announcements. 
                Stay tuned for groundbreaking news about our programs, events, and success stories!
              </p>
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-blue-900">
              APH News
            </h2>
            <p className="text-2xl text-blue-800 max-w-4xl mx-auto font-medium">
              Stay updated with the latest developments and achievements
            </p>
          </div>

          {/* News Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {newsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-white bg-white"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center text-blue-600 font-semibold">
                        <Calendar className="h-4 w-4 mr-2" />
                        {item.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-blue-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full group">
                      Stay Tuned for Updates! ⭐
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stay Tuned Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 md:p-16 text-white shadow-2xl mb-12">
              <div className="inline-block mb-8">
                <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 animate-pulse">
                  Stay Tuned!
                </h3>
                <div className="h-3 bg-white rounded-full animate-pulse" />
              </div>
              <p className="text-2xl font-medium mb-8 max-w-4xl mx-auto leading-relaxed">
                Exciting announcements, new programs, and groundbreaking developments are coming your way. 
                Be the first to know about our latest initiatives and achievements.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-4 text-lg rounded-full shadow-lg">
                  <a href="https://www.instagram.com/activeperformancehub" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-3 h-6 w-6" />
                    Follow Our Journey
                  </a>
                </Button>
                <Button className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-12 py-4 text-lg rounded-full transition-all">
                  Stay Tuned for More
                </Button>
              </div>
            </div>
            
            {/* Subscription Form */}
            <div className="max-w-2xl mx-auto">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
