import { useEffect, useRef } from 'react';
import { Smartphone, Wifi, Radio, AlertTriangle } from 'lucide-react';

const GlobeVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determine mesh speed multiplier for display
  let meshSpeed = 2;
  if (typeof window !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox')) {
    meshSpeed = 4;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationFrame: number;
    let time = 0;

    // Spider web pattern - arranged in a web formation
    const nodes = [
      // SOS Origin
      { x: 0.15, y: 0.3, type: 'mobile', hasInternet: false, id: 'mobile1', label: 'Mobile (SOS)' },
      
      // First ring of SpiderNet nodes (closer to center)
      { x: 0.35, y: 0.25, type: 'spidernet', hasInternet: false, id: 'spider1', label: 'SpiderNet Node' },
      { x: 0.4, y: 0.45, type: 'spidernet', hasInternet: false, id: 'spider2', label: 'SpiderNet Node' },
      { x: 0.25, y: 0.55, type: 'spidernet', hasInternet: false, id: 'spider3', label: 'SpiderNet Node' },
      
      // Second ring of SpiderNet nodes (outer web)
      { x: 0.55, y: 0.2, type: 'spidernet', hasInternet: false, id: 'spider4', label: 'SpiderNet Node' },
      { x: 0.65, y: 0.4, type: 'spidernet', hasInternet: false, id: 'spider5', label: 'SpiderNet Node' },
      { x: 0.45, y: 0.7, type: 'spidernet', hasInternet: false, id: 'spider6', label: 'SpiderNet Node' },
      
      // Internet-connected device and emergency services
      { x: 0.77, y: 0.47, type: 'mobile', hasInternet: true, id: 'mobile2', label: 'Mobile (Internet)' },
      { x: 0.85, y: 0.27  , type: 'gateway', hasInternet: true, id: 'gateway1', label: 'Emergency Services' },
    ];

    // SOS message path through the spider web network
    const messagePath = [
      { from: 0, to: 1 }, // Mobile to first SpiderNet
      { from: 1, to: 2 }, // SpiderNet to SpiderNet
      { from: 2, to: 4 }, // SpiderNet to outer ring
      { from: 4, to: 5 }, // Outer ring to outer ring
      { from: 5, to: 7 }, // SpiderNet to internet-connected mobile
      { from: 7, to: 8 }, // Mobile to emergency services
    ];

    // Helper function to draw an icon
    const drawIcon = (x: number, y: number, type: string, size: number = 16) => {
      ctx.fillStyle = 'white';
      ctx.font = `${size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let icon = '';
      switch (type) {
        case 'mobile':
          icon = '📱';
          break;
        case 'spidernet':
          icon = '🕸️';
          break;
        case 'gateway':
          icon = '🚨';
          break;
        case 'house':
          icon = '🏠';
          break;
        case 'signal':
          icon = '📡';
          break;
      }
      
      ctx.fillText(icon, x, y);
    };

    // Helper function to draw spider web connections
    const drawSpiderWeb = (width: number, height: number) => {
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      // Draw web connections between SpiderNet nodes
      const spiderNodes = nodes.filter(node => node.type === 'spidernet');
      spiderNodes.forEach((node, i) => {
        spiderNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            
            // Only connect nearby nodes to create web pattern
            if (distance < 0.3) {
              ctx.beginPath();
              ctx.moveTo(node.x * width, node.y * height);
              ctx.lineTo(otherNode.x * width, otherNode.y * height);
              ctx.stroke();
            }
          }
        });
      });
      
      ctx.setLineDash([]);
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw spider web background pattern
      drawSpiderWeb(width, height);

      // Draw network coverage areas around SpiderNet nodes (houses/networks)
      nodes.forEach((node) => {
        if (node.type === 'spidernet') {
          const x = node.x * width;
          const y = node.y * height;
          
          // Draw house/network coverage area
          const pulse = (Math.sin(time * 0.005 + nodes.indexOf(node)) + 1) / 2;
          ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 + pulse * 0.1})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.arc(x, y, 25 + pulse * 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Animate SOS message packet along the path (much faster)
      let packetSpeed = 0.002; // Default: Chrome-based (2x)
      if (navigator.userAgent.toLowerCase().includes('firefox')) {
        packetSpeed = 0.004; // 4x for Firefox
      }
      const totalPathTime = messagePath.length;
      const currentTime = (time * packetSpeed) % totalPathTime;
      const currentPathIndex = Math.floor(currentTime);
      const pathProgress = currentTime - currentPathIndex;

      if (currentPathIndex < messagePath.length) {
        const currentPath = messagePath[currentPathIndex];
        const fromNode = nodes[currentPath.from];
        const toNode = nodes[currentPath.to];

        // Animate connection being active
        const x1 = fromNode.x * width;
        const y1 = fromNode.y * height;
        const x2 = toNode.x * width;
        const y2 = toNode.y * height;

        ctx.strokeStyle = 'rgba(255, 0, 100, 0.8)';
        ctx.lineWidth = 4;
        ctx.shadowColor = 'rgba(255, 0, 100, 0.6)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw moving SOS packet
        const packetX = fromNode.x + (toNode.x - fromNode.x) * pathProgress;
        const packetY = fromNode.y + (toNode.y - fromNode.y) * pathProgress;

        // SOS packet with pulsing effect
        const packetPulse = (Math.sin(time * 0.01) + 1) / 2;
        ctx.fillStyle = '#FF0040';
        ctx.shadowColor = 'rgba(255, 0, 64, 0.9)';
        ctx.shadowBlur = 20 + packetPulse * 10;
        ctx.beginPath();
        ctx.arc(packetX * width, packetY * height, 8 + packetPulse * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // SOS text following the packet
        ctx.fillStyle = '#FF0040';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(255, 0, 64, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText('SOS', packetX * width, packetY * height - 20);
        ctx.shadowBlur = 0;
      }

      // Draw nodes with proper icons
      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;

        // Node appearance based on type
        let nodeColor, nodeSize, glowColor;
        switch (node.type) {
          case 'mobile':
            nodeColor = node.hasInternet ? '#00FF64' : '#FFD700';
            nodeSize = 20;
            glowColor = node.hasInternet ? 'rgba(0, 255, 100, 0.6)' : 'rgba(255, 215, 0, 0.6)';
            break;
          case 'spidernet':
            nodeColor = '#00BFFF';
            nodeSize = 24;
            glowColor = 'rgba(0, 191, 255, 0.6)';
            break;
          case 'gateway':
            nodeColor = '#FF6B6B';
            nodeSize = 28;
            glowColor = 'rgba(255, 107, 107, 0.6)';
            break;
          default:
            nodeColor = '#666';
            nodeSize = 16;
            glowColor = 'rgba(102, 102, 102, 0.6)';
        }

        // Node glow effect with faster pulse
        const pulse = (Math.sin(time * 0.008 + index) + 1) / 2;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 20 + pulse * 15;

        // Draw node background circle
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Draw device icon on top of the node
        drawIcon(x, y, node.type, nodeSize);

        // Draw small house icon on top for SpiderNet nodes
        // if (node.type === 'spidernet') {
        //   drawIcon(x - 15, y - 15, 'house', 12);
        // }

        // Special indicator for SOS origin with faster blinking
        if (index === 0) {
          const sosAlpha = (Math.sin(time * 0.015) + 1) / 2;
          ctx.fillStyle = `rgba(255, 0, 64, ${sosAlpha})`;
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'rgba(255, 0, 64, 0.8)';
          ctx.shadowBlur = 15;
          ctx.fillText('SOS!', x, y - 35);
          ctx.shadowBlur = 0;
        }

        // Internet connectivity indicator
        if (node.hasInternet) {
          ctx.fillStyle = '#00FF64';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'rgba(0, 255, 100, 0.6)';
          ctx.shadowBlur = 8;
          ctx.fillText('INET', x, y - 35);
          ctx.shadowBlur = 0;
        }

        // Node labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label.split(' ')[0], x, y + 40);
      });

      time += 20; // Increased from 16 to make everything faster
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-full h-96 lg:h-[500px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg glass border border-white/20 glow-blue"
        style={{ background: 'rgba(0, 0, 0, 0.2)' }}
      />
      
      {/* Overlay Labels */}
      <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg z-10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <span className="text-sm font-medium">SOS Signal Active</span>
        </div>
      </div>
      
      {/* Fixed Emergency Relay Button - Positioned Better */}
      {typeof window !== 'undefined' && !/Mobi|Android/i.test(navigator.userAgent) && (
        <div className="absolute top-4 right-4 glass px-3 py-2 rounded-lg z-10">
          <div className="text-sm">
            <div className="text-red-400 font-mono">EMERGENCY_RELAY</div>
            <div className="text-muted-foreground">Device → Mesh → Internet</div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass px-3 py-2 rounded-lg z-10">
        <div className="text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <span>📱</span>
            <span>Mobile Device</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🕸️</span>
            <span>SpiderNet Node</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <span>🏠</span>
            <span>House/Network</span>
          </div> */}
          <div className="flex items-center space-x-2">
            <span>🚨</span>
            <span>Emergency Services</span>
          </div>
        </div>
      </div>

      {/* Speed indicator */}
      <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-lg z-10">
        <div className="text-xs text-muted-foreground">
          <div className="text-green-400 font-mono">MESH_SPEED: {meshSpeed}X</div>
          <div>Web Pattern Active</div>
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;
