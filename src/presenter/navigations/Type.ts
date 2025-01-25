import { NavigatorScreenParams } from "@react-navigation/native";


type DashboardTabParamList = {
  HOME: undefined
  SEARCH: undefined,
  FAVORITE: undefined,
}

type RootStackParamList = {
  DASHBOARD: NavigatorScreenParams<DashboardTabParamList>;
  DETAIL: undefined;
};

export type {RootStackParamList,DashboardTabParamList};
