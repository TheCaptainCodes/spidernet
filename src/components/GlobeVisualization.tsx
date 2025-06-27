
import { useEffect, useRef } from 'react';

const GlobeVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Network nodes with specific roles
    const nodes = [
      { x: 0.15, y: 0.3, type: 'mobile', hasInternet: false, id: 'mobile1', label: 'Mobile (SOS)' },
      { x: 0.25, y: 0.35, type: 'spidernet', hasInternet: false, id: 'spider1', label: 'SpiderNet Node' },
      { x: 0.45, y: 0.25, type: 'spidernet', hasInternet: false, id: 'spider2', label: 'SpiderNet Node' },
      { x: 0.65, y: 0.4, type: 'spidernet', hasInternet: false, id: 'spider3', label: 'SpiderNet Node' },
      { x: 0.8, y: 0.35, type: 'mobile', hasInternet: true, id: 'mobile2', label: 'Mobile (Internet)' },
      { x: 0.85, y: 0.6, type: 'gateway', hasInternet: true, id: 'gateway1', label: 'Emergency Services' },
    ];

    // SOS message path through the network
    const messagePath = [
      { from: 0, to: 1 }, // Mobile to first SpiderNet
      { from: 1, to: 2 }, // SpiderNet to SpiderNet
      { from: 2, to: 3 }, // SpiderNet to SpiderNet
      { from: 3, to: 4 }, // SpiderNet to internet-connected mobile
      { from: 4, to: 5 }, // Mobile to emergency services
    ];

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw network coverage area
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 2.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw all possible connections (mesh network)
      messagePath.forEach((path, index) => {
        const fromNode = nodes[path.from];
        const toNode = nodes[path.to];
        
        const x1 = fromNode.x * width;
        const y1 = fromNode.y * height;
        const x2 = toNode.x * width;
        const y2 = toNode.y * height;

        ctx.strokeStyle = 'rgba(0, 191, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Animate SOS message packet along the path
      const packetSpeed = 0.001;
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

        ctx.strokeStyle = 'rgba(0, 255, 100, 0.8)';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(0, 255, 100, 0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw moving SOS packet
        const packetX = fromNode.x + (toNode.x - fromNode.x) * pathProgress;
        const packetY = fromNode.y + (toNode.y - fromNode.y) * pathProgress;

        ctx.fillStyle = '#FF0040';
        ctx.shadowColor = 'rgba(255, 0, 64, 0.8)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(packetX * width, packetY * height, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // SOS text following the packet
        ctx.fillStyle = '#FF0040';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SOS', packetX * width, packetY * height - 15);
      }

      // Draw nodes
      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;

        // Node appearance based on type
        let nodeColor, nodeSize, glowColor;
        switch (node.type) {
          case 'mobile':
            nodeColor = node.hasInternet ? '#00FF64' : '#FFD700';
            nodeSize = 8;
            glowColor = node.hasInternet ? 'rgba(0, 255, 100, 0.6)' : 'rgba(255, 215, 0, 0.6)';
            break;
          case 'spidernet':
            nodeColor = '#00BFFF';
            nodeSize = 12;
            glowColor = 'rgba(0, 191, 255, 0.6)';
            break;
          case 'gateway':
            nodeColor = '#FF6B6B';
            nodeSize = 14;
            glowColor = 'rgba(255, 107, 107, 0.6)';
            break;
          default:
            nodeColor = '#666';
            nodeSize = 6;
            glowColor = 'rgba(102, 102, 102, 0.6)';
        }

        // Node glow effect
        const pulse = (Math.sin(time * 0.003 + index) + 1) / 2;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 15 + pulse * 10;

        // Draw node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Node type indicator
        ctx.fillStyle = 'white';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        let icon = '';
        switch (node.type) {
          case 'mobile':
            icon = node.hasInternet ? '📱✅' : '📱';
            break;
          case 'spidernet':
            icon = '🕸️';
            break;
          case 'gateway':
            icon = '🚨';
            break;
        }
        ctx.fillText(icon, x, y + 25);

        // Special indicator for SOS origin
        if (index === 0) {
          const sosAlpha = (Math.sin(time * 0.008) + 1) / 2;
          ctx.fillStyle = `rgba(255, 0, 64, ${sosAlpha})`;
          ctx.font = 'bold 14px monospace';
          ctx.fillText('SOS!', x, y - 20);
        }

        // Internet connectivity indicator
        if (node.hasInternet) {
          ctx.fillStyle = '#00FF64';
          ctx.font = '8px monospace';
          ctx.fillText('INET', x, y - 25);
        }
      });

      time += 16; // Approximately 60fps
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
      <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <span className="text-sm font-medium">SOS Signal Active</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-lg">
        <div className="text-sm">
          <div className="text-red-400 font-mono">EMERGENCY_RELAY</div>
          <div className="text-muted-foreground">Signal → Mesh → Internet</div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass px-3 py-2 rounded-lg">
        <div className="text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <span>📱</span>
            <span>Mobile Device</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🕸️</span>
            <span>SpiderNet Node</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🚨</span>
            <span>Emergency Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;
