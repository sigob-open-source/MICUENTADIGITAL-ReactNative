import { RootStackParamList } from './src/types/navigation';

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
