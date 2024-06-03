import { TPawsState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllBreeds } from './breeds';
import { NAMESPACE } from '../slices/breeds.gallery';

export const selectGallerySize = (state: TPawsState) =>
  state[NAMESPACE].gallerySize;

export const selectGalleryImageIndexes = (state: TPawsState) =>
  state[NAMESPACE].galleryImageIndexes;

export const selectGalleryBreeds = createSelector(
  [selectAllBreeds, selectGallerySize, selectGalleryImageIndexes],
  (allBreeds, gallerySize, imageIndexes) => {
    return allBreeds
      .filter((breed, index) => index < gallerySize)
      .map(breed => ({
        ...breed,
        galleryImageUrl: breed.imageUrls?.[imageIndexes[`${breed.name}/${breed.parentBreed}`] || 0] || breed.galleryImageUrl,
      }));
  }
);
