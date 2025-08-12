import * as React from 'react';
import * as Icons from '@redocly/theme';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export function ThemeIcon({ name, size = 24, color = 'currentColor' }: IconProps) {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent size={size} color={color} style={{ width: size, height: size }} />;
}
