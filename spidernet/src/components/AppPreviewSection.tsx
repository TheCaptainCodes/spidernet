
const AppPreviewSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-green mb-6">
            <span className="text-sm font-medium gradient-text">App & Hardware</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Built for Real Emergencies
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every pixel and circuit designed for life-saving communication. 
            Field-tested in disaster scenarios across Bangladesh.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile App Preview */}
          <div className="scroll-fade-in">
            <div className="glass rounded-2xl p-8 glow-blue">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                SpiderNet Mobile App
              </h3>
              
              {/* Mock Phone Interface */}
              <div className="relative max-w-sm mx-auto">
                <div className="glass-strong rounded-3xl p-6 border-2 border-white/20">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-xs">🕸️</span>
                      </div>
                      <span className="font-bold">SpiderNet</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs">MESH</span>
                    </div>
                  </div>

                  {/* Message Interface */}
                  <div className="space-y-4 mb-6">
                    <div className="glass p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        <span className="text-xs font-semibold text-red-400">EMERGENCY</span>
                      </div>
                      <p className="text-sm">Medical assistance needed at Sector 7. Two injured, stable condition.</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        Via 3 hops • 2 min ago
                      </div>
                    </div>
                    
                    <div className="glass p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs font-semibold text-green-400">RESOURCE</span>
                      </div>
                      <p className="text-sm">Safe house available for 50 people. Clean water supply confirmed.</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        Via 2 hops • 5 min ago
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="glass rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="Type emergency message..."
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                        disabled
                      />
                      <button className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-xs">📤</span>
                      </button>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span>6 nodes in range</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Battery: 92%</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* App Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold mb-1">React Native</h4>
                  <p className="text-sm text-muted-foreground">Cross-platform</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h4 className="font-semibold mb-1">End-to-End</h4>
                  <p className="text-sm text-muted-foreground">Encrypted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Preview */}
          <div className="scroll-fade-in">
            <div className="glass rounded-2xl p-8 glow-green">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                SpiderNet Hardware Node
              </h3>
              
              {/* Mock Hardware Diagram */}
              <div className="relative">
                <div className="glass-strong rounded-2xl p-8 border-2 border-green-400/20">
                  {/* Solar Panel */}
                  <div className="mb-6">
                    <div className="w-full h-16 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg border border-white/20 flex items-center justify-center">
                      <span className="text-2xl">☀️</span>
                      <span className="ml-2 font-mono text-sm">Solar Panel 5W</span>
                    </div>
                  </div>

                  {/* Main Board */}
                  <div className="glass rounded-lg p-4 mb-4 glow-blue">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-sm">ESP32-WROOM</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-green-400 font-mono">WiFi: OFF</div>
                        <div className="text-blue-400 font-mono">BLE: ON</div>
                      </div>
                      <div>
                        <div className="text-green-400 font-mono">LoRa: TX</div>
                        <div className="text-blue-400 font-mono">Range: 5km</div>
                      </div>
                    </div>
                  </div>

                  {/* Components */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-lg p-3 text-center">
                      <div className="text-xl mb-1">🔋</div>
                      <div className="text-xs font-mono">Li-Ion 18650</div>
                      <div className="text-xs text-green-400">3.7V</div>
                    </div>
                    
                    <div className="glass rounded-lg p-3 text-center">
                      <div className="text-xl mb-1">📡</div>
                      <div className="text-xs font-mono">LoRa SX1276</div>
                      <div className="text-xs text-blue-400">868MHz</div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs">PWR</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-xs">TX</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-xs">RX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware Specs */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold mb-1">Low Power</h4>
                  <p className="text-sm text-muted-foreground">24h battery life</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌦️</div>
                  <h4 className="font-semibold mb-1">Weatherproof</h4>
                  <p className="text-sm text-muted-foreground">IP65 rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub & Download Links */}
        <div className="mt-16 text-center scroll-fade-in">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg glass border border-white/20 hover:border-white/40 transition-all duration-200 hover:glow-blue">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">📱</span>
                <span className="font-medium">Download App (Coming Soon)</span>
              </div>
            </button>
            
            <button className="px-8 py-4 rounded-lg glass border border-white/20 hover:border-white/40 transition-all duration-200 hover:glow-green">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">⚙️</span>
                <span className="font-medium">Hardware Schematics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;
