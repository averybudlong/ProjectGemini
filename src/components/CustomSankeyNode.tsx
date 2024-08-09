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
  const { x, y, width, height, payload, textColor } = props;

  const centerX = x + width / 2 + 10;
  const centerY = y + height / 2;

  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#ff0000"
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
