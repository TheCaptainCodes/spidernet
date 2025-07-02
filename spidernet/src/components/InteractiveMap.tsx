
import { useState } from 'react';

const InteractiveMap = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      x: 20,
      y: 30,
      content: "Medical assistance needed at coordinates 23.7231, 90.4086. Two injured, stable condition.",
      timestamp: "2 minutes ago",
      hops: 3,
      status: "delivered"
    },
    {
      id: 2,
      x: 60,
      y: 20,
      content: "Safe house available for 50 people. Clean water and food supplies for 3 days.",
      timestamp: "5 minutes ago",
      hops: 2,
      status: "relaying"
    },
    {
      id: 3,
      x: 40,
      y: 70,
      content: "Road blocked at Highway 1 junction. Alternative route via local roads recommended.",
      timestamp: "8 minutes ago",
      hops: 4,
      status: "delivered"
    },
    {
      id: 4,
      x: 80,
      y: 60,
      content: "Emergency supplies drop zone established. GPS: 23.7500, 90.3900",
      timestamp: "12 minutes ago",
      hops: 1,
      status: "delivered"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-green mb-6">
            <span className="text-sm font-medium gradient-text">Live Network</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Messages in Motion
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how real emergency messages hop through our mesh network. 
            Click on any message to see its journey.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="scroll-fade-in">
          <div className="glass rounded-2xl p-8 glow-blue">
            <div className="relative h-96 bg-gradient-to-br from-blue-950/20 to-green-950/20 rounded-lg overflow-hidden">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="rgba(0, 191, 255, 0.3)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
              </div>

              {/* Network Connections */}
              <svg className="absolute inset-0 w-full h-full">
                {messages.map((msg, index) => {
                  const nextMsg = messages[index + 1];
                  if (!nextMsg) return null;
                  
                  return (
                    <line
                      key={`connection-${index}`}
                      x1={`${msg.x}%`}
                      y1={`${msg.y}%`}
                      x2={`${nextMsg.x}%`}
                      y2={`${nextMsg.y}%`}
                      stroke="rgba(0, 191, 255, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>

              {/* Message Pins */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                    selectedMessage === message.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                  style={{ left: `${message.x}%`, top: `${message.y}%` }}
                  onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    message.status === 'delivered' ? 'bg-green-400 glow-green' : 
                    message.status === 'relaying' ? 'bg-blue-400 glow-blue animate-pulse' : 
                    'bg-yellow-400'
                  }`} />
                  
                  {/* Message Popup */}
                  {selectedMessage === message.id && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-80 animate-scale-in">
                      <div className="glass-strong rounded-lg p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            message.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            message.status === 'relaying' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {message.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        
                        <p className="text-sm mb-2">{message.content}</p>
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Hops: {message.hops}</span>
                          <span className="mx-2">•</span>
                          <span>ID: MSG_{message.id.toString().padStart(4, '0')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Network Status */}
              <div className="absolute top-4 left-4 glass px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-sm font-medium">Network Active</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 glass px-4 py-2 rounded-lg">
                <div className="text-sm font-mono">
                  <div className="text-green-400">TX: 247 msgs</div>
                  <div className="text-blue-400">RX: 189 msgs</div>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Delivered</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span>Relaying</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Click Instruction */}
        <div className="text-center mt-8 scroll-fade-in">
          <p className="text-muted-foreground">
            💡 Click on any glowing pin to see the message details and routing information
          </p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
