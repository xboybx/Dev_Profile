'use client';

import { icons } from 'lucide-react';
import { FC } from 'react';

interface LucideIconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

const LucideIcon: FC<LucideIconProps> = ({ name, color, size, className }) => {
  const Icon = icons[name as keyof typeof icons];

  if (!Icon) {
    return null;
  }

  return <Icon color={color} size={size} className={className} />;
};

export default LucideIcon;