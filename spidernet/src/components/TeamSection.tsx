
const TeamSection = () => {
  const team = [
    {
      name: 'Mahmudul Hasan',
      role: 'Hardware Engineer',
      avatar: '⚡',
      description: 'Electronics engineer focused on low-power embedded systems and solar energy integration.',
      skills: ['PCB Design', 'Embedded C++', 'Solar Systems', 'RF Engineering'],
      github: '#',
      linkedin: '#'
    },
    {
      name: 'Md. Fatin Hasnat',
      role: 'Software & Network',
      avatar: '👨‍💻',
      description: 'Full-stack developer specializing in mesh networking protocols and mobile app development.',
      skills: ['React Native', 'ESP32', 'LoRa Protocol', 'Network Architecture'],
      github: '#',
      linkedin: '#'
    },
    {
      name: 'Sharika Taj Nur',
      role: 'Logistics & Operations',
      avatar: '📋',
      description: 'Project manager coordinating deployment strategies and community outreach programs.',
      skills: ['Project Management', 'Community Outreach', 'Supply Chain', 'Field Testing'],
      github: '#',
      linkedin: '#'
    }
  ];

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-blue mb-6">
            <span className="text-sm font-medium gradient-text">Meet the Builders</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            The SpiderNet Team
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three passionate engineers from Bangladesh building the future of emergency communication. 
            United by code, circuits, and the mission to save lives.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 scroll-fade-in glow-blue scan-line"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full glass-strong border-2 border-blue-400/50 flex items-center justify-center text-4xl mx-auto mb-4 glow-blue">
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-bold gradient-text mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium">{member.role}</p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-center">
                {member.description}
              </p>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-center">Expertise</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 rounded-full glass border border-white/20 hover:border-blue-400/50 transition-all duration-200 flex items-center justify-center hover:glow-blue">
                  <span className="text-sm">💻</span>
                </button>
                <button className="w-10 h-10 rounded-full glass border border-white/20 hover:border-blue-400/50 transition-all duration-200 flex items-center justify-center hover:glow-blue">
                  <span className="text-sm">💼</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 glass rounded-2xl p-8 scroll-fade-in glow-green">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
            Team Achievements
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Development</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Prototype Iterations</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">5</div>
              <div className="text-sm text-muted-foreground">Field Tests</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Lives to Save</div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center scroll-fade-in">
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <blockquote className="text-xl italic text-muted-foreground mb-4">
              "In Bangladesh, we've seen how quickly natural disasters can cut off entire communities. 
              SpiderNet is our answer – technology that works when everything else fails."
            </blockquote>
            <cite className="text-sm font-medium gradient-text">— The SpiderNet Team</cite>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center scroll-fade-in">
          <button className="px-8 py-4 rounded-lg gradient-primary text-black font-medium text-lg hover:scale-105 transition-all duration-200 glow-blue">
            Connect with the Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
