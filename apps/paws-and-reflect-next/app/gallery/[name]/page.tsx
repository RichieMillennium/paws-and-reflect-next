import {FC} from 'react';
import {TriviaTable, DogPic, StoreProvider} from '@paws-and-reflect-next/paws-and-reflect/core';
import { fetchAllBreeds } from '@paws-and-reflect-next/shared-api';
import {analyze, getBreedByParam, filterBreeds} from '@paws-and-reflect-next/shared-utils';
import {TBreedTrivia} from '@paws-and-reflect-next/shared-types';
import {BreedsGallery} from '@paws-and-reflect-next/paws-and-reflect-gallery';

const getAnalysis = (imagePrompt?: string): Promise<Partial<TBreedTrivia>> => {
  if (!imagePrompt) {
    return Promise.resolve({});
  }
  return analyze(imagePrompt) as Promise<Partial<TBreedTrivia>>;
};

interface IProps {
  params: {
    name: string;
  };
}

const Index: FC<IProps> = async ({ params }) => {
  const breeds = await fetchAllBreeds();
  if (params.name.startsWith('~')) {
    const filtered = filterBreeds(params.name, breeds.results || []);
    return (
      <StoreProvider breeds={filtered} error={breeds.error}>
        <BreedsGallery />
      </StoreProvider>
    );
  }
  const breed = getBreedByParam(params.name, breeds.results);
  const breedName = `${breed?.name} ${breed?.parentBreed || ''}`;
  const analysis = await getAnalysis(breed?.galleryImageUrl);
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold capitalize">{breedName}</h1>
      <DogPic url={breed?.galleryImageUrl} />
      <TriviaTable trivia={analysis} />
    </>
  );
}

export default Index;
