import { NavigatorScreenParams } from "@react-navigation/native";


type DashboardTabParamList = {
  HOME: undefined
  SEARCH: undefined,
  FAVORITE: undefined,
}

type RootStackParamList = {
  DASHBOARD: NavigatorScreenParams<DashboardTabParamList>;
  DETAIL: {id: string};
};

export type {RootStackParamList,DashboardTabParamList};
