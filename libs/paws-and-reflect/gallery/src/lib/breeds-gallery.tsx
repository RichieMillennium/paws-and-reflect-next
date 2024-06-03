'use client'

import {
  FC,
} from 'react';
import { InfiniteBreedGrid } from '@paws-and-reflect-next/paws-and-reflect/core';
import {selectAllBreeds, usePawsSelector} from '@paws-and-reflect-next/shared-state';
import BreedCard from '../components/breed-card';

export const BreedsGallery: FC = () => {
  const breeds = usePawsSelector(selectAllBreeds);
  return (
    <div>
      <h2 className="text-2xl mb-4">Breeds Gallery</h2>
      <InfiniteBreedGrid
        style={{height: 'calc(100vh - 250px)'}}
        data={breeds}
        totalCount={breeds.length}
        itemContent={(_index, data) => <BreedCard breed={data} />}
      />
    </div>
  );
};

export default BreedsGallery;
