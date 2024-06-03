import {HTMLAttributes} from 'react';

export const ALL_COLORS = [
  'white',
  'amber',
  'blue',
  'teal',
  'green',
  'yellow',
  'orange',
  'red',
  'pink',
  'indigo',
  'purple',
  'cyan'
] as const;

export type Color = typeof ALL_COLORS[number];

export const TAG_COLORS = ALL_COLORS.filter(color => ![
  'white'
].includes(color));

export const pickColor = (): string => {
  const colorIndex = Math.ceil(Math.random() * 11) - 1;
  return TAG_COLORS[colorIndex];
};

export const createColorClasses = (type: 'tag' | 'svg' | 'selected'): Partial<Record<Color, HTMLAttributes<unknown>['className']>> => {
  if (type === 'tag') {
    return {
      amber: 'text-amber-700 bg-amber-200 hover:text-amber-200 hover:bg-amber-700',
      blue: 'text-blue-700 bg-blue-200 hover:text-blue-200 hover:bg-blue-700',
      teal: 'text-teal-700 bg-teal-200 hover:text-teal-200 hover:bg-teal-700',
      green: 'text-green-700 bg-green-200 hover:text-green-200 hover:bg-green-700',
      yellow: 'text-yellow-700 bg-yellow-200 hover:text-yellow-200 hover:bg-yellow-700',
      orange: 'text-orange-700 bg-orange-200 hover:text-orange-200 hover:bg-orange-700',
      red: 'text-red-700 bg-red-200 hover:text-red-200 hover:bg-red-700',
      pink: 'text-pink-700 bg-pink-200 hover:text-pink-200 hover:bg-pink-700',
      indigo: 'text-indigo-700 bg-indigo-200 hover:text-indigo-200 hover:bg-indigo-700',
      purple: 'text-purple-700 bg-purple-200 hover:text-purple-200 hover:bg-purple-700',
      cyan: 'text-cyan-700 bg-cyan-200 hover:text-cyan-200 hover:bg-cyan-700',
    };
  } else if (type === 'svg') {
    return {
      amber: 'stroke-current hover:stroke-amber-200 hover:fill-amber-200',
      blue: 'stroke-current hover:stroke-blue-200 hover:fill-blue-200',
      teal: 'stroke-current hover:stroke-teal-200 hover:fill-teal-200',
      green: 'stroke-current hover:stroke-green-200 hover:fill-green-200',
      yellow: 'stroke-current hover:stroke-yellow-200 hover:fill-yellow-200',
      orange: 'stroke-current hover:stroke-orange-200 hover:fill-orange-200',
      red: 'stroke-current hover:stroke-red-200 hover:fill-red-200',
      pink: 'stroke-current hover:stroke-pink-200 hover:fill-pink-200',
      indigo: 'stroke-current hover:stroke-indigo-200 hover:fill-indigo-200',
      purple: 'stroke-current hover:stroke-purple-200 hover:fill-purple-200',
      cyan: 'stroke-current hover:stroke-cyan-200 hover:fill-cyan-200',
    };
  } else {
    return {
      amber: 'text-white bg-amber-700 fill-amber-200 hover:text-amber-200',
      blue: 'text-white bg-blue-700 fill-blue-200 hover:text-blue-200',
      teal: 'text-white bg-teal-700 fill-teal-200 hover:text-teal-200',
      green: 'text-white bg-green-700 fill-green-200 hover:text-green-200',
      yellow: 'text-white bg-yellow-700 fill-yellow-200 hover:text-yellow-200',
      orange: 'text-white bg-orange-700 fill-orange-200 hover:text-orange-200',
      red: 'text-white bg-red-700 fill-red-200 hover:text-red-200',
      pink: 'text-white bg-pink-700 fill-pink-200 hover:text-pink-200',
      indigo: 'text-white bg-indigo-700 fill-indigo-200 hover:text-indigo-200',
      purple: 'text-white bg-purple-700 fill-purple-200 hover:text-purple-200',
      cyan: 'text-white bg-cyan-700 fill-cyan-200 hover:text-cyan-200',
    };
  }
};
