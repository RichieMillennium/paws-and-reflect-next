import { FC, PropsWithChildren} from 'react';
import {Chip} from '@nextui-org/chip';
import {Color, createColorClasses} from '@paws-and-reflect-next/shared-utils';

interface IProps {
  color?: Color;
  selected: boolean;
  onClick: () => void;
}

export const TagButton: FC<PropsWithChildren<IProps>> = ({ children, color, selected, onClick }) => {
  const tagStyles = selected
    ? createColorClasses('selected')
    : createColorClasses('tag');
  const svgColors = createColorClasses('svg');
  const useColor = color || 'indigo';
  return (
    <Chip size="lg" className={`mr-4 my-4 leading-sm text-xs uppercase cursor-pointer ${tagStyles[useColor]} ${svgColors[useColor]}`} avatar={
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 mr-3">
        <g id="dog">
          <path d="M29 7h-2.37a4.24 4.24 0 0 0-2.31-1.95A4.13 4.13 0 0 0 23 4.84V3a1 1 0 0 0-1-1h-1.29a3.36 3.36 0 0 0-3.2 2.3l-.44 1.33-1.3 3.26A9.54 9.54 0 0 1 14 11.72l-3.75 4.17a1 1 0 1 0 1.48 1.33l3.75-4.16a11.41 11.41 0 0 0 2.13-3.43L19 6.32l.46-1.39A1.38 1.38 0 0 1 20.71 4H21v2a1 1 0 0 0 1.31 1 2.22 2.22 0 0 1 1.37 0 2.38 2.38 0 0 1 1.38 1.39A1 1 0 0 0 26 9h2v1.63A1.37 1.37 0 0 1 26.63 12H24a1 1 0 0 0-.86.49 1 1 0 0 0 0 1 7.55 7.55 0 0 1 .86 2.64 8.06 8.06 0 0 1-.89 4.78.94.94 0 0 0-.12.47 4.45 4.45 0 0 0 .08.81 4.7 4.7 0 0 0 .25.78l2.15 5h-1.85L21 22.76V20a1 1 0 0 0-2 0v3a1 1 0 0 0 .11.45L21.38 28H20v-.67a3.32 3.32 0 0 0-2-3V24a4 4 0 0 0-4-4 1 1 0 0 0 0 2 2 2 0 0 1 2 2h-2a1 1 0 0 0 0 2h2.67A1.34 1.34 0 0 1 18 27.33V28h-3.46a4.71 4.71 0 0 1-4.23-2.61l-.06-.12a6.71 6.71 0 0 1-.62-4.11 3.82 3.82 0 0 1 .09-.44 1 1 0 0 0-.36-1v-.17a8 8 0 0 1-.74-4.94L9 12.16A1 1 0 0 0 7.73 11 7.81 7.81 0 0 0 2 19a6.32 6.32 0 0 0 2.4 4.8A6.07 6.07 0 0 0 8 25a8.81 8.81 0 0 0 .47 1.16l.06.12a6.71 6.71 0 0 0 6 3.72H27a1 1 0 0 0 .92-1.39l-2.76-6.43a2.91 2.91 0 0 1-.12-.39v-.19a9.84 9.84 0 0 0 1-5.73 10 10 0 0 0-.5-1.87h1.09A3.37 3.37 0 0 0 30 10.63V8a1 1 0 0 0-1-1zM5.6 22.2A4.34 4.34 0 0 1 4 18.94a6 6 0 0 1 .85-3.41 5.67 5.67 0 0 1 1.86-1.86l-.1.61a10 10 0 0 0 .92 6.17 1.06 1.06 0 0 0 .16.21v.18a9 9 0 0 0-.1 2.16 4 4 0 0 1-1.99-.8z"/>
          <path d="M24 9a1 1 0 0 0-1-1 1 1 0 1 0 1 1z"/>
        </g>
      </svg>
    } onClick={onClick}>
      {children}
    </Chip>
  );
};

export default TagButton;
