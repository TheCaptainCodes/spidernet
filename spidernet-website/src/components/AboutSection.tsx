
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

          {/* Right Content - Enhanced Real-World Message Flow */}
          <div className="scroll-fade-in">
            <div className="glass rounded-2xl p-8 glow-green relative overflow-hidden">
              {/* Meaningful Background Elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-6 left-6 text-6xl">🏠</div>
                <div className="absolute bottom-6 right-6 text-6xl">🏥</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">🕸️</div>
              </div>

              <div className="relative">
                <h3 className="text-xl font-bold mb-6 text-center gradient-text">
                  Real Emergency Scenario
                </h3>

                {/* Emergency Flow Visualization */}
                <div className="space-y-6">
                  {/* Step 1: Disaster Strikes */}
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-red-500/20">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <span className="text-lg">🚨</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-400">Disaster Strikes</h4>
                      <p className="text-sm text-muted-foreground">Cell towers down, internet out</p>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-transparent rounded animate-pulse" />
                  </div>

                  {/* Step 2: SpiderNet Activates */}
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-blue-500/20">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                      <span className="text-lg">🕸️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-400">SpiderNet Mesh Activates</h4>
                      <p className="text-sm text-muted-foreground">Solar nodes create emergency network</p>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* Step 3: Message Routing */}
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-green-500/20">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                      <span className="text-lg">📱</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400">SOS Message Routes</h4>
                      <p className="text-sm text-muted-foreground">Hops through mesh to reach help</p>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-transparent rounded animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                  {/* Step 4: Help Arrives */}
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-purple-500/20">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-lg">🚁</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-400">Emergency Response</h4>
                      <p className="text-sm text-muted-foreground">Rescue teams dispatched with exact location</p>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded animate-pulse" style={{ animationDelay: '1.5s' }} />
                  </div>
                </div>

                {/* Central Network Visualization */}
                <div className="mt-8 relative">
                  <div className="flex justify-center items-center space-x-8">
                    {/* Home */}
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full glass-strong border-2 border-blue-400 flex items-center justify-center glow-blue mb-2">
                        <span className="text-2xl">🏠</span>
                      </div>
                      <span className="text-xs">Home</span>
                    </div>

                    {/* SpiderNet Hub */}
                    <div className="text-center relative">
                      <div className="w-20 h-20 rounded-full glass-strong border-2 border-green-400 flex items-center justify-center glow-green mb-2">
                        <span className="text-3xl">🕸️</span>
                      </div>
                      <span className="text-xs font-semibold">SpiderNet</span>
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-20" />
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Emergency Services */}
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full glass-strong border-2 border-red-400 flex items-center justify-center glow-blue mb-2">
                        <span className="text-2xl">🚨</span>
                      </div>
                      <span className="text-xs">Emergency</span>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated connection lines */}
                    <line
                      x1="20%"
                      y1="50%"
                      x2="80%"
                      y2="50%"
                      stroke="url(#connectionGradient)"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                  </svg>
                </div>

                {/* Real-time Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-lg font-bold text-blue-400">3 sec</div>
                    <div className="text-xs text-muted-foreground">Message Delivery</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-lg font-bold text-green-400">24/7</div>
                    <div className="text-xs text-muted-foreground">Network Uptime</div>
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
