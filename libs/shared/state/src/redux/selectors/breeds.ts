import { TPawsState } from '../store';
import { NAMESPACE } from '../slices/breeds';

export const selectAllBreeds = (state: TPawsState) =>
  state[NAMESPACE].breeds;

export const selectBreedsCache = (state: TPawsState) =>
  state[NAMESPACE].breedsCache;

export const selectSelectedBreed = (state: TPawsState) =>
  state[NAMESPACE].selectedBreed;

export const selectSelectedBreedImageUrls = (state: TPawsState) =>
  state[NAMESPACE].selectedBreedImageUrls;

export const selectBreedsStatus = (state: TPawsState) =>
  state[NAMESPACE].status;

export const selectBreedsErrorMessage = (state: TPawsState) =>
  state[NAMESPACE].errorMessage;

export const selectSearchTerm = (state: TPawsState) =>
  state[NAMESPACE].searchTerm;
