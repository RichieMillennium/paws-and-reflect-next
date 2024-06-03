'use client'

import {CSSProperties, FC, forwardRef, PropsWithChildren, Ref} from 'react';
import { VirtuosoGrid, VirtuosoGridProps, VirtuosoGridHandle } from 'react-virtuoso';
import {IBreed} from '@paws-and-reflect-next/shared-types';

interface IList {
  style?: CSSProperties;
  className?: string;
}

const GridList = forwardRef<HTMLDivElement, PropsWithChildren<IList>>(
  ({style, children, ...props}, ref) => (
    <div ref={ref} {...props} style={style}>
      {children}
    </div>
  )
);

const GridItem: FC<PropsWithChildren> = ({children, ...props}) => (
  <div {...props}>
    {children}
  </div>
);

export const InfiniteBreedGrid = ({ data, totalCount, style, itemContent }: VirtuosoGridProps<IBreed, never>) => {
  return (
    <VirtuosoGrid
      style={style}
      totalCount={totalCount}
      data={data}
      components={{
        List: GridList,
        Item: GridItem
      }}
      itemContent={itemContent}
    />
  );
};

interface IGridProps extends VirtuosoGridProps<string, never> {
  gridRef?: Ref<VirtuosoGridHandle>;
}

export const InfiniteImageGrid = ({ data, totalCount, style, itemContent, gridRef }: IGridProps) => {
  return (
    <VirtuosoGrid
      ref={gridRef}
      style={style}
      totalCount={totalCount}
      data={data}
      components={{
        List: GridList,
        Item: GridItem
      }}
      itemContent={itemContent}
    />
  );
};
