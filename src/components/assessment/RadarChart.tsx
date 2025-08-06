import React from "react";
import { cn } from "@/lib/utils";

interface RadarData {
  label: string;
  value: number;
  maxValue?: number;
}

interface RadarChartProps {
  data: RadarData[];
  size?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 300,
  className,
}) => {
  const center = size / 2;
  const radius = (size / 2) - 50;
  const angleStep = (2 * Math.PI) / data.length;

  // Generate points for the data
  const dataPoints = data.map((item, index) => {
    const angle = (index * angleStep) - (Math.PI / 2);
    const normalizedValue = item.value / (item.maxValue || 100);
    const x = center + (radius * normalizedValue * Math.cos(angle));
    const y = center + (radius * normalizedValue * Math.sin(angle));
    return { x, y, ...item };
  });

  // Generate grid lines (concentric polygons)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridLines = gridLevels.map((level) => {
    const points = Array.from({ length: data.length }, (_, index) => {
      const angle = (index * angleStep) - (Math.PI / 2);
      const x = center + (radius * level * Math.cos(angle));
      const y = center + (radius * level * Math.sin(angle));
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // Generate axis lines
  const axisLines = data.map((_, index) => {
    const angle = (index * angleStep) - (Math.PI / 2);
    const x = center + (radius * Math.cos(angle));
    const y = center + (radius * Math.sin(angle));
    return { x1: center, y1: center, x2: x, y2: y };
  });

  // Generate label positions
  const labels = data.map((item, index) => {
    const angle = (index * angleStep) - (Math.PI / 2);
    const labelRadius = radius + 25;
    const x = center + (labelRadius * Math.cos(angle));
    const y = center + (labelRadius * Math.sin(angle));
    return { x, y, label: item.label, value: item.value };
  });

  // Create the data polygon
  const dataPolygon = dataPoints.map(point => `${point.x},${point.y}`).join(" ");

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid lines */}
        {gridLines.map((points, index) => (
          <polygon
            key={`grid-${index}`}
            points={points}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}
        
        {/* Axis lines */}
        {axisLines.map((line, index) => (
          <line
            key={`axis-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}
        
        {/* Data area */}
        <polygon
          points={dataPolygon}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {labels.map((label, index) => (
          <g key={`label-${index}`}>
            <text
              x={label.x}
              y={label.y - 5}
              textAnchor="middle"
              className="text-xs font-medium fill-foreground"
            >
              {label.label}
            </text>
            <text
              x={label.x}
              y={label.y + 10}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              {label.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};