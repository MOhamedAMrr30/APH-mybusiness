const TunnelBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-background to-background" />
      
      {/* Animated tunnel rings */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-primary/20 animate-float"
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`,
              opacity: 0.6 - i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Particle grid effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary-light) / 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-primary-light/30 via-primary/20 to-transparent animate-float"
            style={{
              transform: `translateX(-50%) rotate(${i * 15 - 30}deg)`,
              transformOrigin: 'top',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '8s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TunnelBackground;
