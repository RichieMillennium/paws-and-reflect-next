import { configureStore, } from '@reduxjs/toolkit';
import {IBreed} from '@paws-and-reflect-next/shared-types';
import { breedsState, rootReducer } from './slices';

export const createStore = ({ breeds, error }: { breeds?: IBreed[], error?: string }
) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  if (breeds) {
    store.dispatch(breedsState.actions.initBreeds(breeds));
  }
  if (error) {
    store.dispatch(breedsState.actions.initBreedsError(error));
  }
  return store;
};
export type TPawsStore = ReturnType<typeof createStore>;
export type TPawsState = ReturnType<TPawsStore['getState']>;
export type TPawsDispatch = TPawsStore['dispatch'];
