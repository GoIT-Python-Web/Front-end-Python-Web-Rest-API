import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserPic = (state: RootState) => state.auth.userPic;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectError = (state: RootState) => state.auth.error;
