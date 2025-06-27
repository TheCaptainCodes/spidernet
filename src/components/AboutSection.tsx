
const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="scroll-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-green mb-6">
              <span className="text-sm font-medium gradient-text">What is SpiderNet?</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Off-Grid Communication Revolution
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              SpiderNet is an offline communication mesh network built on solar-powered microcontrollers. 
              When disasters strike and traditional networks fail, our mesh rises to connect communities 
              and enable life-saving communication.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-1 glow-blue">
                  <span className="text-xs text-black">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">No Internet Required</h4>
                  <p className="text-muted-foreground">Works completely offline using Bluetooth and LoRa technology</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-1 glow-blue">
                  <span className="text-xs text-black">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Solar Powered</h4>
                  <p className="text-muted-foreground">Self-sustaining nodes that run indefinitely on renewable energy</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-1 glow-blue">
                  <span className="text-xs text-black">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Mesh Network</h4>
                  <p className="text-muted-foreground">Messages automatically route through the network to reach their destination</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Diagram */}
          <div className="scroll-fade-in">
            <div className="glass rounded-2xl p-8 glow-green">
              <div className="relative h-80">
                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full glass-strong border-2 border-green-400 flex items-center justify-center glow-green animate-pulse-glow">
                    <span className="text-2xl">🕸️</span>
                  </div>
                  <div className="text-center mt-2 text-sm font-medium">SpiderNet Hub</div>
                </div>

                {/* Surrounding Nodes */}
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const angle = (index / 6) * Math.PI * 2;
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-12 h-12 rounded-full glass border border-blue-400 flex items-center justify-center glow-blue animate-pulse float"
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 24px)`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    >
                      <span className="text-lg">📱</span>
                    </div>
                  );
                })}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const angle = (index / 6) * Math.PI * 2;
                    const radius = 120;
                    const x = Math.cos(angle) * radius + 160;
                    const y = Math.sin(angle) * radius + 160;
                    
                    return (
                      <line
                        key={index}
                        x1="160"
                        y1="160"
                        x2={x}
                        y2={y}
                        stroke="rgba(0, 191, 255, 0.3)"
                        strokeWidth="2"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
