import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const MAP_SIZE = width - 32;

const getCircleRadius = (distance: number, maxDistance: number) => {
  // Map distance to a radius between 60 and (MAP_SIZE/2 - 40)
  const minR = 60;
  const maxR = MAP_SIZE / 2 - 40;
  return minR + ((distance / maxDistance) * (maxR - minR));
};

const MapScreen: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [homeNode, setHomeNode] = useState<any>(null);

  useEffect(() => {
    fetch('http://192.168.0.104:4000/nodes')
      .then(res => res.json())
      .then(data => {
        // Assume the home node is the one with distance 0
        const home = data.find((n: any) => n.distance === 0) || data[0];
        setHomeNode(home);
        setNodes(data.filter((n: any) => n.id !== home.id));
      })
      .catch(() => setNodes([]));
  }, []);

  if (!homeNode) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' }}><Text style={{ color: '#fff' }}>Loading map...</Text></View>;
  }

  // Find max distance for scaling
  const maxDistance = Math.max(...nodes.map(n => n.distance), 1);
  const center = MAP_SIZE / 2;

  // Arrange nodes in concentric circles by distance
  const grouped = nodes.reduce((acc, node) => {
    const d = Math.round(node.distance / 50) * 50; // group by 50m
    if (!acc[d]) acc[d] = [];
    acc[d].push(node);
    return acc;
  }, {} as Record<number, any[]>);
  const rings = Object.keys(grouped).map(Number).sort((a, b) => a - b);

  let nodePositions: { id: string; x: number; y: number; name: string; status: string; distance: number }[] = [];
  rings.forEach((ringDist, ringIdx) => {
    const ringNodes = grouped[ringDist];
    const r = getCircleRadius(ringDist, maxDistance);
    ringNodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / ringNodes.length;
      nodePositions.push({
        id: node.id,
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        name: node.name,
        status: node.status,
        distance: node.distance,
      });
    });
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' }}>
      <Svg width={MAP_SIZE} height={MAP_SIZE}>
        {/* Draw rings */}
        {rings.map((d, i) => (
          <Circle
            key={`ring-${d}`}
            cx={center}
            cy={center}
            r={getCircleRadius(d, maxDistance)}
            stroke="#374151"
            strokeDasharray="6,6"
            strokeWidth={1}
            fill="none"
            opacity={0.3}
          />
        ))}
        {/* Draw lines from home to each node */}
        {nodePositions.map((node) => (
          <Line
            key={`line-${node.id}`}
            x1={center}
            y1={center}
            x2={node.x}
            y2={node.y}
            stroke="#06B6D4"
            strokeWidth={1}
            opacity={0.2}
          />
        ))}
        {/* Draw nodes */}
        {nodePositions.map((node) => (
          <Circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={16}
            fill={node.status === 'online' ? '#06B6D4' : node.status === 'connecting' ? '#F59E42' : '#6B7280'}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
        {/* Draw node labels and distance */}
        {nodePositions.map((node) => (
          <>
            <SvgText
              key={`label-${node.id}`}
              x={node.x}
              y={node.y - 22}
              fill="#fff"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              {node.name}
            </SvgText>
            <SvgText
              key={`dist-${node.id}`}
              x={node.x}
              y={node.y + 28}
              fill="#9CA3AF"
              fontSize="10"
              textAnchor="middle"
            >
              {node.distance}m
            </SvgText>
          </>
        ))}
        {/* Draw home node at center */}
        <Circle cx={center} cy={center} r={22} fill="#10B981" stroke="#fff" strokeWidth={3} />
        <SvgText
          x={center}
          y={center + 5}
          fill="#fff"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          {homeNode.name}
        </SvgText>
      </Svg>
      <Text style={{ color: '#fff', marginTop: 16 }}>Nearby Nodes (distance-based layout)</Text>
    </View>
  );
};

export default MapScreen; 