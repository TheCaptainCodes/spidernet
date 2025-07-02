
import { ArrowDown } from 'lucide-react';
import GlobeVisualization from './GlobeVisualization';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* SOS Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass glow-blue mb-6 animate-pulse-glow">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping" />
              <span className="text-sm font-medium">Emergency Network Active</span>
            </div>

            {/* Main Heading - Static, Smaller Text */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="gradient-text glow-text-blue">
                When networks fall, SpiderNet rises.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Revolutionary offline emergency mesh network powered by solar hardware. 
              Connecting disaster-hit communities when it matters most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 rounded-lg gradient-primary text-black font-medium text-lg hover:scale-105 transition-all duration-200 glow-blue">
                Try App Prototype
              </button>
              <button className="px-8 py-4 rounded-lg glass border border-white/20 hover:border-white/40 transition-all duration-200 hover:glow-green">
                How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">∞</div>
                <div className="text-sm text-muted-foreground">Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">0$</div>
                <div className="text-sm text-muted-foreground">Data Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Globe Visualization */}
          <div className="relative">
            <GlobeVisualization />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
