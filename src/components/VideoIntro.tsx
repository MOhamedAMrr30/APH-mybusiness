import { useEffect, useState } from "react";
import companyLogo from "@/assets/company_logo.jpg";

const VideoIntro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<'text' | 'logo' | 'hidden'>('text');

  useEffect(() => {
    // Show motivational text for 3 seconds
    const textTimer = setTimeout(() => {
      setStage('logo');
    }, 3000);

    // Show logo for 2 seconds then hide
    const logoTimer = setTimeout(() => {
      setStage('hidden');
      setIsVisible(false);
    }, 5500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero animate-fade-in">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--primary-dark))_100%)] opacity-50" />
      
      {stage === 'text' && (
        <div className="relative z-10 text-center px-4 animate-scale-in">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 animate-fade-in">
            Unleash Your
            <span className="block text-gradient mt-2">Potential</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Where champions are made through dedication, excellence, and passion
          </p>
          <div className="mt-8 flex justify-center gap-2 animate-pulse">
            <div className="w-3 h-3 rounded-full bg-primary-light animate-float" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 rounded-full bg-primary-light animate-float" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 rounded-full bg-primary-light animate-float" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}

      {stage === 'logo' && (
        <div className="relative z-10 animate-scale-in">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden hero-shadow glow-effect">
            <img 
              src={companyLogo} 
              alt="Active Performance Hub" 
              className="w-full h-full object-cover animate-zoom-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
          <p className="text-center mt-6 text-2xl md:text-3xl font-bold text-primary-foreground animate-fade-in">
            Active Performance Hub
          </p>
        </div>
      )}

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-light/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoIntro;
