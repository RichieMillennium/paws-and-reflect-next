import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IBreedImageIndexChange } from '@paws-and-reflect-next/shared-types'

export const NAMESPACE = 'gallery';
const GALLERY_PAGE_SIZE = 12;

export interface IState {
  gallerySize: number;
  galleryImageIndexes: Record<string, number>;
}

const initialState: IState = {
  gallerySize: GALLERY_PAGE_SIZE,
  galleryImageIndexes: {},
};

export const breedsGallerySlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    fetchMoreGalleryImages(state: IState) {
      state.gallerySize += GALLERY_PAGE_SIZE;
    },
    changeGalleryImageIndex(state: IState, action: PayloadAction<IBreedImageIndexChange>) {
      const { breed, parentBreed, indexChange } = action.payload;
      const index = `${breed}/${parentBreed}`;
      state.galleryImageIndexes = {
        ...state.galleryImageIndexes,
        [index]: (state.galleryImageIndexes[index] || 0) + indexChange
      };
    },
    resetGallerySize(state: IState) {
      state.gallerySize = GALLERY_PAGE_SIZE;
    },
  }
});

export const actions = breedsGallerySlice.actions;
export default breedsGallerySlice.reducer;
