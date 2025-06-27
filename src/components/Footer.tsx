
const Footer = () => {
  const footerLinks = {
    project: [
      { label: 'About SpiderNet', href: '#about' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Roadmap', href: '#' }
    ],
    community: [
      { label: 'GitHub', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Contributors', href: '#' }
    ],
    social: [
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Open Source License', href: '#' },
      { label: 'Contact', href: '#' }
    ]
  };

  return (
    <footer className="relative py-20 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg glow-blue flex items-center justify-center">
                <span className="text-black font-bold">🕸️</span>
              </div>
              <span className="text-2xl font-bold gradient-text">SpiderNet</span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Revolutionary offline emergency mesh network. When networks fall, SpiderNet rises. 
              Connecting communities when it matters most.
            </p>

            {/* Mission Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-green-400/20 glow-green">
              <span className="text-sm font-medium">🌍 Global Emergency Response</span>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4 gradient-text">Project</h4>
            <ul className="space-y-2">
              {footerLinks.project.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:glow-text-blue"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 gradient-text">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:glow-text-green"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 gradient-text">Connect</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.social.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:glow-text-blue"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Emergency Contact */}
            <div className="glass rounded-lg p-3 border border-red-400/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-red-400">EMERGENCY</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                emergency@spidernet.mesh
              </p>
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div className="glass rounded-2xl p-6 mb-12 glow-blue">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full glass-strong border-2 border-green-400 flex items-center justify-center glow-green">
                <span className="text-sm font-bold">🌐</span>
              </div>
              <div>
                <div className="font-semibold gradient-text">Global Network Status</div>
                <div className="text-sm text-muted-foreground">Real-time mesh network monitoring</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-lg font-bold gradient-text">247</div>
                <div className="text-xs text-muted-foreground">Active Nodes</div>
              </div>
              <div>
                <div className="text-lg font-bold gradient-text">15.2k</div>
                <div className="text-xs text-muted-foreground">Messages Sent</div>
              </div>
              <div>
                <div className="text-lg font-bold gradient-text">99.7%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 SpiderNet. Built by the SpiderNet Team in Bangladesh 🇧🇩
          </div>
          
          <div className="flex items-center space-x-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Spider Web Pattern */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <path
              d="M100,10 L190,100 L100,190 L10,100 Z M100,40 L160,100 L100,160 L40,100 Z M100,70 L130,100 L100,130 L70,100 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
