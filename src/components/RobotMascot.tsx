import React from 'react';
import { ExactRobotSvg } from './ExactRobotSvg';

interface RobotMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onTap?: () => void;
}

export const RobotMascot: React.FC<RobotMascotProps> = ({
  className = '',
  size = 'md',
  onTap,
}) => {
  return (
    <div
      onClick={onTap}
      className={`w-full flex flex-col items-center select-none cursor-default transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <ExactRobotSvg size={size} />
    </div>
  );
};
