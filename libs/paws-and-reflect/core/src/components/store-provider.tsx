'use client'

import { useRef, FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createStore, TPawsStore } from '@paws-and-reflect-next/shared-state';
import {IBreed} from '@paws-and-reflect-next/shared-types';

interface IProps {
  breeds?: IBreed[];
  error?: string;
}

export const StoreProvider: FC<PropsWithChildren<IProps>> = ({ children, breeds, error }) => {
  const storeRef = useRef<TPawsStore>();
  if (!storeRef.current) {
    storeRef.current = createStore({ breeds, error });
  }
  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
};
