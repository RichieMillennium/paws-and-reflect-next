import { combineReducers } from '@reduxjs/toolkit';
import breedsReducer, { NAMESPACE as BREEDS_NAME } from './breeds';
import galleryReducer, { NAMESPACE as GALLERY_NAME } from './breeds.gallery';

export * as breedsState from './breeds';
export * as galleryState from './breeds.gallery';

export const rootReducer = combineReducers({
  [BREEDS_NAME]: breedsReducer,
  [GALLERY_NAME]: galleryReducer,
});
