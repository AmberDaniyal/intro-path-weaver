
import React from 'react';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, label }) => {
  // Calculate smooth curve path
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const controlOffset = Math.abs(dx) * 0.5;
  
  const path = `M ${from.x} ${from.y} C ${from.x + controlOffset} ${from.y}, ${to.x - controlOffset} ${to.y}, ${to.x} ${to.y}`;
  
  // Calculate midpoint for label
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  return (
    <g>
      {/* Connection path */}
      <path
        d={path}
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        className="opacity-60"
        markerEnd="url(#arrowhead)"
      />
      
      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#3b82f6"
            className="opacity-60"
          />
        </marker>
      </defs>
      
      {/* Label */}
      {label && (
        <g>
          <rect
            x={midX - 30}
            y={midY - 10}
            width="60"
            height="20"
            rx="10"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          <text
            x={midX}
            y={midY + 3}
            textAnchor="middle"
            className="text-xs fill-slate-600"
            fontSize="10"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};
