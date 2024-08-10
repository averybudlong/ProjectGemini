import React from "react";
import { Rectangle } from "recharts";

const CustomSankeyNode = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: any;
  textColor: string;
}) => {
  const { x, y, width, height, index, payload, textColor } = props;

  const centerX = x + width / 2 + 10;
  const centerY = y + height / 2;
  const nodeOffset = 5; // Makes the node slightly taller than the link
  let rectangleColor = "hsl(var(--foreground))";

  if (index == 1) {
    // rejected
    rectangleColor = "#f2322c"; // Red
  } else if (index == 2) {
    // admitted
    rectangleColor = "hsl(var(--accent))"; // Green
  } else if (index == 3) {
    // enrolled
    rectangleColor = "#1659f5"; // Blue
  } else if (index == 4) {
    // declined
    rectangleColor = "#eb8f34"; // Orange
  }

  return (
    <g>
      <Rectangle
        x={x}
        y={y - nodeOffset / 2}
        width={width}
        height={height + nodeOffset}
        fill={rectangleColor}
        fillOpacity="0.8"
        radius={4}
      />
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="start"
        dominantBaseline="middle"
        fill={textColor}
        fontWeight="bold"
        fontSize="1rem"
      >
        {payload.name}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="start"
        dominantBaseline="middle"
        fill={textColor}
        fontSize="1rem"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default CustomSankeyNode;
