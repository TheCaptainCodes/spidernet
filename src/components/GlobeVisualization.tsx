
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

    // Network nodes data
    const nodes = [
      { x: 0.2, y: 0.3, active: true, id: 'node1' },
      { x: 0.7, y: 0.2, active: true, id: 'node2' },
      { x: 0.5, y: 0.6, active: false, id: 'node3' },
      { x: 0.3, y: 0.8, active: true, id: 'node4' },
      { x: 0.8, y: 0.7, active: true, id: 'node5' },
      { x: 0.1, y: 0.5, active: false, id: 'node6' },
    ];

    // Connection paths
    const connections = [
      { from: 0, to: 1, active: true },
      { from: 1, to: 2, active: false },
      { from: 0, to: 3, active: true },
      { from: 3, to: 4, active: true },
      { from: 1, to: 4, active: true },
      { from: 5, to: 0, active: false },
    ];

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw globe outline
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 3, 0, Math.PI * 2);
      ctx.stroke();

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(
          width / 2 + Math.cos(angle) * (Math.min(width, height) / 3),
          height / 2 + Math.sin(angle) * (Math.min(width, height) / 3)
        );
        ctx.stroke();
      }

      // Draw connections
      connections.forEach((conn, index) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        const x1 = fromNode.x * width;
        const y1 = fromNode.y * height;
        const x2 = toNode.x * width;
        const y2 = toNode.y * height;

        if (conn.active) {
          // Animated pulse along connection
          const pulse = (Math.sin(time * 0.003 + index) + 1) / 2;
          ctx.strokeStyle = `rgba(0, 191, 255, ${0.3 + pulse * 0.4})`;
          ctx.lineWidth = 2 + pulse * 2;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        const radius = node.active ? 8 : 4;

        // Node glow
        if (node.active) {
          const pulse = (Math.sin(time * 0.005 + index) + 1) / 2;
          ctx.shadowColor = 'rgba(0, 191, 255, 0.8)';
          ctx.shadowBlur = 20 + pulse * 10;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        // Node circle
        ctx.fillStyle = node.active ? '#00BFFF' : '#333';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // SOS indicator for active nodes
        if (node.active && index === 0) {
          const sosAlpha = (Math.sin(time * 0.01) + 1) / 2;
          ctx.fillStyle = `rgba(255, 0, 0, ${sosAlpha})`;
          ctx.font = '12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('SOS', x, y - 15);
        }
      });

      // Message packet animation
      const packetTime = (time * 0.002) % 1;
      if (connections[0].active) {
        const fromNode = nodes[0];
        const toNode = nodes[1];
        const packetX = fromNode.x + (toNode.x - fromNode.x) * packetTime;
        const packetY = fromNode.y + (toNode.y - fromNode.y) * packetTime;

        ctx.fillStyle = '#00FF64';
        ctx.shadowColor = 'rgba(0, 255, 100, 0.8)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(packetX * width, packetY * height, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

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
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping" />
          <span className="text-sm font-medium">Live Network</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-lg">
        <div className="text-sm">
          <div className="text-green-400 font-mono">MSG_RELAY_ACTIVE</div>
          <div className="text-muted-foreground">6 nodes online</div>
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;
