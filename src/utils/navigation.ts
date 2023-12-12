// External dependencies
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

import { RootStackParamList } from '../types/navigation';

// Types & Interfaces
type TNavigationProps = NavigationContainerRef<RootStackParamList>;

export const navigationRef = React.createRef<TNavigationProps>();

export const navigate = <K extends keyof RootStackParamList, P extends RootStackParamList[K]>(
  name: K,
  params: P,
) => navigationRef.current?.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );

export const navigateWithReset = <
K extends keyof RootStackParamList,
P extends RootStackParamList[K],
>(
    name: K,
    params: P,
  ) => navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: (params as unknown as [string])[0],
          params: (params as unknown as [string, object?])[1] ?? {},
        },
      ],
    }),
  );
