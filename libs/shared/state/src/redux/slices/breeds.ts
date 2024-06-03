import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { EStatus, IBreed } from '@paws-and-reflect-next/shared-types';
import { breedMatchesSearchTerm, setBreedImages, findBreedIndex } from '@paws-and-reflect-next/shared-utils';

export const NAMESPACE = 'breeds';

export interface IState {
  status: EStatus,
  breedsCache: IBreed[];
  breeds: IBreed[];
  selectedBreed: IBreed | null;
  selectedBreedImageUrls?: string[];
  errorMessage: string | null;
  searchTerm: string;
}

const initialState: IState = {
  status: EStatus.idle,
  breedsCache: [],
  breeds: [],
  selectedBreed: null,
  errorMessage: null,
  searchTerm: '',
};

export const breedsSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    initBreeds(state: IState, action: PayloadAction<Array<IBreed>>) {
      state.breeds = [...action.payload];
      state.breedsCache = [...action.payload];
      state.selectedBreed = null;
      state.selectedBreedImageUrls = [];
      state.status = EStatus.success;
      state.errorMessage = null;
      state.searchTerm = '';
    },
    initBreedsError(state: IState, action: PayloadAction<string>) {
      state.status = EStatus.error;
      state.errorMessage = action.payload;
    },
    searchBreeds(state: IState, action: PayloadAction<string>) {
      state.searchTerm = action.payload.toLowerCase();
      state.breeds = state.breedsCache
        .filter(breed => breedMatchesSearchTerm(breed, state.searchTerm));
    },
    breedImagesFetchSuccess(state: IState, action: PayloadAction<{ breedName: string; parentBreed?: string; imageUrls: string[] }>) {
      const { breedName, parentBreed, imageUrls } = action.payload;
      state.breeds = setBreedImages(state.breeds, imageUrls, breedName, parentBreed);
      state.breedsCache = setBreedImages(state.breedsCache, imageUrls, breedName, parentBreed);
      if (state.selectedBreed?.name === breedName && state.selectedBreed?.parentBreed === parentBreed) {
        const selectedIndex = findBreedIndex(state.breeds, breedName, parentBreed);
        if (selectedIndex !== -1) {
          state.selectedBreedImageUrls = state.breeds[selectedIndex].imageUrls;
        }
      }
    },
    updateBreedsCache(state: IState) {
      state.breedsCache = [...state.breeds];
    },
    setSelectedBreed(state: IState, action: PayloadAction<IBreed | null>) {
      state.selectedBreed = action.payload;
      state.selectedBreedImageUrls = state.selectedBreed?.imageUrls;
    },
    unselectBreed(state: IState) {
      state.selectedBreed = null;
      state.selectedBreedImageUrls = [];
    },
  },
});

export const actions = breedsSlice.actions;
export default breedsSlice.reducer;
