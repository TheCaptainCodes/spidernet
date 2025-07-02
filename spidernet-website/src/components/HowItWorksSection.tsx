
const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Connect via Bluetooth',
      description: 'User opens the SpiderNet app and connects to the nearest node via Bluetooth. No internet required.',
      icon: '📱',
      color: 'blue'
    },
    {
      number: '02', 
      title: 'Send Encrypted Message',
      description: 'Message is encrypted end-to-end and packaged with routing information for the mesh network.',
      icon: '🔒',
      color: 'green'
    },
    {
      number: '03',
      title: 'Mesh Network Relay',
      description: 'Message hops from node to node using LoRa radio, automatically finding the best path.',
      icon: '🕸️',
      color: 'blue'
    },
    {
      number: '04',
      title: 'Gateway Transmission',
      description: 'When a gateway node with internet access receives the message, it forwards to rescue teams.',
      icon: '🛰️',
      color: 'green'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-blue mb-6">
            <span className="text-sm font-medium gradient-text">System Overview</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            How SpiderNet Works
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple 4-step process that enables life-saving communication 
            when traditional networks are down.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-green-500 to-blue-500 rounded-full hidden lg:block" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 scroll-fade-in ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`glass rounded-2xl p-8 ${
                    step.color === 'blue' ? 'glow-blue' : 'glow-green'
                  } hover:scale-105 transition-all duration-300`}>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className={`w-12 h-12 rounded-full ${
                        step.color === 'blue' ? 'bg-blue-500/20 glow-blue' : 'bg-green-500/20 glow-green'
                      } flex items-center justify-center text-2xl mr-4`}>
                        {step.icon}
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">STEP {step.number}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 gradient-text">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step Number Circle */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full glass-strong border-2 ${
                    step.color === 'blue' ? 'border-blue-400 glow-blue' : 'border-green-400 glow-green'
                  } flex items-center justify-center lg:relative lg:z-10`}>
                    <span className="text-xl font-bold gradient-text">{step.number}</span>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Technical Flow Diagram */}
        <div className="mt-20 scroll-fade-in">
          <div className="glass rounded-2xl p-8 glow-green">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
              Message Flow Architecture
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 glow-blue flex items-center justify-center text-3xl mx-auto mb-4">
                  📱
                </div>
                <h4 className="font-semibold mb-2">Mobile App</h4>
                <p className="text-sm text-muted-foreground">React Native + Bluetooth API</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 glow-green flex items-center justify-center text-3xl mx-auto mb-4">
                  🔌
                </div>
                <h4 className="font-semibold mb-2">Hardware Node</h4>
                <p className="text-sm text-muted-foreground">ESP32 + LoRa + Solar Panel</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 glow-blue flex items-center justify-center text-3xl mx-auto mb-4">
                  🕸️
                </div>
                <h4 className="font-semibold mb-2">Mesh Protocol</h4>
                <p className="text-sm text-muted-foreground">Custom routing algorithm</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 glow-green flex items-center justify-center text-3xl mx-auto mb-4">
                  🌐
                </div>
                <h4 className="font-semibold mb-2">Gateway</h4>
                <p className="text-sm text-muted-foreground">Bridge to Internet/SMS</p>
              </div>
            </div>

            {/* Connection Arrows */}
            <div className="hidden md:flex justify-center items-center mt-8 space-x-8">
              <div className="flex items-center text-muted-foreground">
                <span className="text-2xl">→</span>
                <span className="mx-2 text-sm">Bluetooth</span>
                <span className="text-2xl">→</span>
                <span className="mx-2 text-sm">LoRa</span>
                <span className="text-2xl">→</span>
                <span className="mx-2 text-sm">Internet</span>
                <span className="text-2xl">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
