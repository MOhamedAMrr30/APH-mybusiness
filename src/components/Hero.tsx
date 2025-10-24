import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-athlete.jpg";
import videoFile from "@/assets/WhatsApp Video 2025-10-20 at 00.47.36_d7bbaecb.mp4";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80 z-10" />
        <img
          src={heroImage}
          alt="Sports Action"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Dream Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-6">
              Your dream
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-tight">
              Let's change the game
            </h1>
          </div>

          {/* Values */}
          <div className="flex flex-wrap justify-center gap-12 mb-16 text-white/90">
            <span className="text-2xl md:text-3xl font-medium">teamwork</span>
            <span className="text-2xl md:text-3xl font-medium">respect</span>
            <span className="text-2xl md:text-3xl font-medium">ambition</span>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => {
                const element = document.getElementById('academies');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-blue-900 hover:bg-gray-100 text-xl px-12 py-6 font-bold group rounded-full"
            >
              Try Out
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              onClick={() => {
                const element = document.getElementById('academies');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-blue-900 text-xl px-12 py-6 font-bold transition-all rounded-full"
            >
              Enrol
            </Button>
            <Button 
              size="lg" 
              asChild
              className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-blue-900 text-xl px-12 py-6 font-bold transition-all rounded-full"
            >
              <a href={videoFile} target="_blank" rel="noopener noreferrer">
                <Play className="mr-3 h-6 w-6" />
                Watch Video
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-float">
        <div className="w-8 h-12 border-3 border-white/70 rounded-full flex items-start justify-center p-3">
          <div className="w-2 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
