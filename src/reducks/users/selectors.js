import { createSelector } from 'reselect';
const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector([usersSelector], (state) => state.isSignedIn);
export const getUsername = createSelector([usersSelector], (state) => state.username);
export const getUserId = createSelector([usersSelector], (state) => state.uid);
export const getDirectoryList = createSelector([usersSelector], (state) => state.directoryList);
export const getUrlList = createSelector([usersSelector], (state) => state.urlList);
export const getError = createSelector([usersSelector], (state) => state.error);
