'use client'

import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import {NextUIProvider} from '@nextui-org/react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  );
};
