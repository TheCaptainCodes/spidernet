
const FeaturesSection = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Offline Messaging',
      description: 'Send and receive messages without any internet connection using our mesh network protocol.',
      color: 'blue'
    },
    {
      icon: '🔒',
      title: 'Encrypted Alerts',
      description: 'End-to-end encryption ensures your emergency communications remain secure and private.',
      color: 'green'
    },
    {
      icon: '☀️',
      title: 'Solar Powered',
      description: 'Self-sustaining hardware nodes that run indefinitely on renewable solar energy.',
      color: 'blue'
    },
    {
      icon: '📶',
      title: 'Mesh Relay Logic',
      description: 'Intelligent routing algorithm that finds the best path through the network automatically.',
      color: 'green'
    },
    {
      icon: '📍',
      title: 'Interactive Map UI',
      description: 'Real-time visualization of network status, node locations, and message routing.',
      color: 'blue'
    },
    {
      icon: '🛰️',
      title: 'Gateway Integration',
      description: 'Bridge to traditional networks like Telegram and SMS when internet access is available.',
      color: 'green'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-blue mb-6">
            <span className="text-sm font-medium gradient-text">Core Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Engineered for Emergencies
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature designed to work when traditional communication fails. 
            Built by engineers, tested in real disaster scenarios.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 scroll-fade-in ${
                feature.color === 'blue' ? 'hover:glow-blue' : 'hover:glow-green'
              } scan-line`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl ${
                feature.color === 'blue' ? 'bg-blue-500/20 glow-blue' : 'bg-green-500/20 glow-green'
              } flex items-center justify-center mb-6 text-3xl`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 gradient-text">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground">
                {feature.description}
              </p>

              {/* Tech Badge */}
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  feature.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'
                } animate-pulse`} />
                <span className="text-xs font-mono">TESTED</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 glass rounded-2xl p-8 scroll-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Technical Specifications</h3>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">5 Km</div>
              <div className="text-sm text-muted-foreground">LoRa Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">30m</div>
              <div className="text-sm text-muted-foreground">Bluetooth Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">24h</div>
              <div className="text-sm text-muted-foreground">Battery Life</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">256-bit</div>
              <div className="text-sm text-muted-foreground">Encryption</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
