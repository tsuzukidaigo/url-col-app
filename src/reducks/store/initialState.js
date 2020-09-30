const initialState = {
  users: {
    isSignedIn: false,
    username: '',
    role: '',
    uid: '',
    directoryList: [],
    urlList: [],
    searchUrlList: [],
  },
  errors: {
    errorUserName: '',
    errorEmail: '',
    errorPassword: '',
    errorComfirmPassword: '',
  },
};

export default initialState;
