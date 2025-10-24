import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Target, Users } from "lucide-react";
import footballLogo from "@/assets/football.jpg";
import kickboxingLogo from "@/assets/kb.jpg";
import tennisLogo from "@/assets/tennis.png";

const Academies = () => {
  const programs = [
    {
      name: "Futures Under 10",
      description: "Early development program for young athletes",
      ageGroup: "Under 10",
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      icon: Star
    },
    {
      name: "Zone 1: U8 – U12",
      description: "Foundation training for young players",
      ageGroup: "U8 - U12",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: Target
    },
    {
      name: "Zone 2: U13 – U14",
      description: "Intermediate development program",
      ageGroup: "U13 - U14",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: Trophy
    },
    {
      name: "Zone 3: U15 – U19",
      description: "Advanced training for competitive athletes",
      ageGroup: "U15 - U19",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      icon: Users
    }
  ];

  const academies = [
    {
      name: "Northline Football Academy",
      logo: footballLogo,
      description: "Elite football training program focused on technical skills, tactical awareness, and competitive excellence",
      sport: "Football",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      borderColor: "border-green-300"
    },
    {
      name: "Überkraft Kickboxing Akademie",
      logo: kickboxingLogo,
      description: "Professional kickboxing training combining fitness, discipline, and martial arts mastery",
      sport: "Kickboxing",
      bgColor: "bg-gradient-to-br from-red-100 to-orange-100",
      borderColor: "border-red-300"
    },
        {
          name: "Strike Tennis Academy",
          logo: tennisLogo,
          description: "Professional tennis training and development, program developing champions through expert coaching and modern techniques",
          sport: "Tennis",
          bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
          borderColor: "border-blue-300",
          isNew: true,
          badge: "Second Branch Opening Soon"
        }
  ];

  return (
    <section id="academies" className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Programs Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-blue-900">
              Programs
            </h2>
            <p className="text-2xl text-blue-800 max-w-4xl mx-auto font-medium">
              Structured development programs for all age groups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-white bg-white"
                >
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 ${program.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-900">{program.name}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{program.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Academies Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-blue-900">
              Our Academies
            </h2>
            <p className="text-2xl text-blue-800 max-w-4xl mx-auto font-medium">
              World-class training facilities and expert coaching across multiple sports disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
            {academies.map((academy, index) => (
                  <Card 
                    key={index} 
                    className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 ${
                      academy.name === "Strike Tennis Academy" 
                        ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50' 
                        : academy.name === "Überkraft Kickboxing Akademie"
                        ? 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50'
                        : 'border-white bg-white'
                    }`}
                  >
                <CardContent className="p-0">
                  <div className="relative h-64 bg-white overflow-hidden border-b-4 border-gray-200">
                    {academy.isNew && (
                      <Badge className="absolute top-6 right-6 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        {academy.badge}
                      </Badge>
                    )}
                        <div className={`flex items-center justify-center h-full p-8 ${
                          academy.name === "Strike Tennis Academy" 
                            ? 'bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100' 
                            : academy.name === "Überkraft Kickboxing Akademie"
                            ? 'bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100'
                            : 'bg-gradient-to-br from-gray-50 to-white'
                        }`}>
                          <img 
                            src={academy.logo} 
                            alt={academy.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                            style={{
                              filter: academy.name === "Strike Tennis Academy" 
                                ? 'drop-shadow(0 12px 24px rgba(59, 130, 246, 0.3)) brightness(1.1) contrast(1.3) saturate(1.2)'
                                : academy.name === "Überkraft Kickboxing Akademie"
                                ? 'drop-shadow(0 12px 24px rgba(239, 68, 68, 0.3)) brightness(1.1) contrast(1.3) saturate(1.2)'
                                : 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1) contrast(1.25) saturate(1.1)',
                              border: academy.name === "Strike Tennis Academy" 
                                ? '3px solid rgba(59, 130, 246, 0.3)' 
                                : academy.name === "Überkraft Kickboxing Akademie"
                                ? '3px solid rgba(239, 68, 68, 0.3)'
                                : '2px solid rgba(0,0,0,0.1)',
                              borderRadius: academy.name === "Strike Tennis Academy" 
                                ? '16px' 
                                : academy.name === "Überkraft Kickboxing Akademie"
                                ? '16px'
                                : '12px',
                              backgroundColor: academy.name === "Strike Tennis Academy" 
                                ? 'rgba(255, 255, 255, 0.8)' 
                                : academy.name === "Überkraft Kickboxing Akademie"
                                ? 'rgba(255, 255, 255, 0.8)'
                                : 'transparent',
                              padding: academy.name === "Strike Tennis Academy" 
                                ? '12px' 
                                : academy.name === "Überkraft Kickboxing Akademie"
                                ? '12px'
                                : '0px',
                              boxShadow: academy.name === "Strike Tennis Academy" 
                                ? '0 8px 32px rgba(59, 130, 246, 0.2)' 
                                : academy.name === "Überkraft Kickboxing Akademie"
                                ? '0 8px 32px rgba(239, 68, 68, 0.2)'
                                : 'none'
                            }}
                          />
                        </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-2xl font-bold ${
                        academy.name === "Strike Tennis Academy" 
                          ? 'text-blue-900' 
                          : academy.name === "Überkraft Kickboxing Akademie"
                          ? 'text-red-900'
                          : 'text-blue-900'
                      }`}>{academy.name}</h3>
                      <span className={`text-sm px-4 py-2 rounded-full font-bold border-2 ${
                        academy.name === "Strike Tennis Academy" 
                          ? 'text-blue-600 bg-blue-100 border-blue-200' 
                          : academy.name === "Überkraft Kickboxing Akademie"
                          ? 'text-red-600 bg-red-100 border-red-200'
                          : 'text-blue-600 bg-blue-100 border-blue-200'
                      }`}>
                        {academy.sport}
                      </span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {academy.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Camps Section */}
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center shadow-2xl border-4 border-blue-100">
            <h3 className="text-4xl font-black mb-8 text-blue-900">
              Camps
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-blue-900">Summer Camp</h4>
                  <p className="text-gray-700 text-lg">Intensive summer training programs</p>
                </CardContent>
              </Card>
              <Card className="border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-purple-900">School Break Camp</h4>
                  <p className="text-gray-700 text-lg">Specialized training during school breaks</p>
                </CardContent>
              </Card>
              <Card className="border-4 border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-cyan-900">Swim Camp</h4>
                  <p className="text-gray-700 text-lg">Aquatic training and swimming programs</p>
                </CardContent>
              </Card>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 text-lg rounded-full shadow-lg">
              Stay Tuned for More Details! 🚀
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academies;
