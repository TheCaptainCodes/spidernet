
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

          {/* Right Content - Enhanced Message Flow Visualization */}
          <div className="scroll-fade-in">
            <div className="glass rounded-2xl p-8 glow-green relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-20 h-20 border border-blue-400 rounded-lg rotate-12" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border border-green-400 rounded-full" />
                <div className="absolute top-1/2 right-8 w-12 h-12 border border-purple-400 rounded-lg rotate-45" />
              </div>

              <div className="relative h-80">
                {/* Message Flow Steps */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 glow-blue flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                    <span className="text-sm font-medium">1. Send SOS</span>
                  </div>
                  <div className="text-xs text-muted-foreground">User sends emergency message</div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 glow-blue flex items-center justify-center">
                      <span className="text-xs">🕸️</span>
                    </div>
                    <span className="text-sm font-medium">2. Mesh Relay</span>
                  </div>
                  <div className="text-xs text-muted-foreground">SpiderNet nodes forward message</div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 glow-green flex items-center justify-center">
                      <span className="text-xs">📡</span>
                    </div>
                    <span className="text-sm font-medium">3. Internet Gateway</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Message reaches connected device</div>
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 glow-green flex items-center justify-center">
                      <span className="text-xs">🚨</span>
                    </div>
                    <span className="text-sm font-medium">4. Emergency Response</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Help is dispatched</div>
                </div>

                {/* Animated Message Path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="messageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF0040" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#00BFFF" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#00FF64" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  
                  {/* Message flow path */}
                  <path
                    d="M 40 40 Q 200 100 360 40 Q 300 200 360 280 Q 200 240 40 280"
                    fill="none"
                    stroke="url(#messageGradient)"
                    strokeWidth="3"
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                  
                  {/* Animated dots along the path */}
                  <circle r="4" fill="#FF0040" className="animate-pulse">
                    <animateMotion dur="4s" repeatCount="indefinite">
                      <mpath href="#messagePath" />
                    </animateMotion>
                  </circle>
                </svg>

                {/* Central mesh visualization */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full glass-strong border-2 border-blue-400 flex items-center justify-center glow-blue">
                      <div className="text-center">
                        <div className="text-2xl mb-1">🕸️</div>
                        <div className="text-xs font-medium">Mesh</div>
                      </div>
                    </div>
                    
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
