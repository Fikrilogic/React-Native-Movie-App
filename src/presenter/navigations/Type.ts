import { NavigatorScreenParams } from "@react-navigation/native";
import { Movie } from "../../domain/models/Movie";


type DashboardTabParamList = {
  HOME: undefined
  SEARCH: undefined,
  FAVORITE: undefined,
}

type RootStackParamList = {
  DASHBOARD: NavigatorScreenParams<DashboardTabParamList>;
  DETAIL: {movie: Movie};
};

export type {RootStackParamList,DashboardTabParamList};
