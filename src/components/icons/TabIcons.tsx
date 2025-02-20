import React from 'react';
import { Home, Dumbbell, Activity, BookOpen, User } from '@tamagui/lucide-icons';

interface IconProps {
  color: string;
  size?: number;
}

export const HomeIcon = ({ color, size = 24 }: IconProps) => (
  <Home size={size} color={color} />
);

export const ExerciseIcon = ({ color, size = 24 }: IconProps) => (
  <Dumbbell size={size} color={color} />
);

export const ProgressIcon = ({ color, size = 24 }: IconProps) => (
  <Activity size={size} color={color} />
);

export const EducationIcon = ({ color, size = 24 }: IconProps) => (
  <BookOpen size={size} color={color} />
);

export const ProfileIcon = ({ color, size = 24 }: IconProps) => (
  <User size={size} color={color} />
); 