
const SupportSection = () => {
  const supportOptions = [
    {
      title: 'For Developers',
      description: 'Join our open-source community and help build the future of emergency communication.',
      icon: '👩‍💻',
      actions: [
        { label: 'GitHub Repository', link: '#', primary: true },
        { label: 'Developer Docs', link: '#', primary: false },
        { label: 'Join Discord', link: '#', primary: false }
      ]
    },
    {
      title: 'For NGOs & Relief Organizations',
      description: 'Partner with us to deploy SpiderNet in disaster-prone areas and save lives.',
      icon: '🤝',
      actions: [
        { label: 'Partnership Program', link: '#', primary: true },
        { label: 'Deployment Guide', link: '#', primary: false },
        { label: 'Contact Us', link: '#', primary: false }
      ]
    },
    {
      title: 'For Supporters',
      description: 'Help us scale SpiderNet globally and bring emergency communication to every community.',
      icon: '❤️',
      actions: [
        { label: 'Support Development', link: '#', primary: true },
        { label: 'Spread the Word', link: '#', primary: false },
        { label: 'Follow Updates', link: '#', primary: false }
      ]
    }
  ];

  return (
    <section id="support" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-green mb-6">
            <span className="text-sm font-medium gradient-text">Join the Movement</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Support SpiderNet
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SpiderNet is more than technology – it's a global movement to ensure no community 
            is left isolated during emergencies. Here's how you can help.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 scroll-fade-in glow-blue scan-line"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 glow-blue flex items-center justify-center mb-6 text-3xl">
                {option.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 gradient-text">
                {option.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {option.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                {option.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      action.primary
                        ? 'gradient-primary text-black hover:scale-105 glow-blue'
                        : 'glass border border-white/20 hover:border-white/40 hover:glow-green'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="glass rounded-2xl p-8 mb-16 scroll-fade-in glow-green">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
            Growing Community
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">500+</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Partner NGOs</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">3</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto scroll-fade-in">
          <div className="glass rounded-2xl p-8 text-center glow-blue">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Stay Updated
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Get the latest updates on SpiderNet development, deployment news, and ways to get involved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg glass border border-white/20 focus:border-blue-400/50 focus:outline-none focus:glow-blue transition-all duration-200"
              />
              <button className="px-8 py-3 rounded-lg gradient-primary text-black font-medium hover:scale-105 transition-all duration-200 glow-blue">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center scroll-fade-in">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-red-400/20 glow-green">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-medium">
              🚨 For emergency deployment requests: emergency@spidernet.mesh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
