import { RootStackParamList } from "./src/types/navigation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}