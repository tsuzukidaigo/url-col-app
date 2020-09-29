export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState) => {
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};
export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      role: '',
      uid: '',
      username: '',
      directoryList: [],
      urlList: [],
      searchUrlList: [],
    },
  };
};
export const FETCH_DIRECTORY = 'FETCH_DIRECTORY';
export const fetchDirectoryAction = (directoryList) => {
  return {
    type: 'FETCH_DIRECTORY',
    payload: directoryList,
  };
};
export const DELETE_DIRECTORY = 'DELETE_DIRECTORY';
export const deleteDirectoryAction = (directoryList) => {
  return {
    type: 'DELETE_DIRECTORY',
    payload: directoryList,
  };
};
export const FETCH_URLINFO = 'FETCH_URLINFO';
export const fetchUrlInfoAction = (urlInfo) => {
  return {
    type: 'FETCH_URLINFO',
    payload: urlInfo,
  };
};
export const SAVE_URLINFO = 'SAVE_URLINFO';
export const saveUrlInfoAction = (urlInfo) => {
  return {
    type: 'SAVE_URLINFO',
    payload: urlInfo,
  };
};
export const DELETE_URLINFO = 'DELETE_URLINFO';
export const deleteUrlInfoAction = (urlInfo) => {
  return {
    type: 'DELETE_URLINFO',
    payload: urlInfo,
  };
};
