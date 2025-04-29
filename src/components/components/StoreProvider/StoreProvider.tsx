/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Provider } from 'react-redux';
import { makeStore } from '@/components/app/store';

export function StoreProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState: any;
}) {
  const store = makeStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
}
