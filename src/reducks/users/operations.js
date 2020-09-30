import { push } from 'connected-react-router';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';
import {
  deleteUrlInfoAction,
  deleteDirectoryAction,
  fetchDirectoryAction,
  fetchUrlInfoAction,
  signInAction,
  signOutAction,
} from './actions';
import { auth as snsAuth } from 'firebase';

//認証のリッスン
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push('/'));
          });
      } else {
        dispatch(push('/signIn'));
      }
    });
  };
};
//URLの登録
export const saveUrl = (directoryId, title, url) => {
  return async (dispatch, getState) => {
    if (directoryId === '' || title === '' || url === '') {
      alert('必要情報がかけています');
      return false;
    }
    const uid = getState().users.uid;
    const timestamp = FirebaseTimestamp.now();
    const urlRef = db
      .collection('users')
      .doc(uid)
      .collection('directory')
      .doc(directoryId)
      .collection('urls')
      .doc();
    //URLデータ作成
    const data = {
      title: title,
      url: url,
      created_at: timestamp,
      updated_at: timestamp,
    };
    // id作成
    let id = urlRef.id;
    data.id = id;

    await urlRef.set(data);
    if (directoryId === 'mylist') {
      dispatch(push('/'));
    } else if (directoryId === 'favorite') {
      dispatch(push('/favorite'));
    } else {
      dispatch(push('/create/' + directoryId));
    }
  };
};
//URL情報の取得
export const fetchUrlInfo = (directoryId) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const urlInfo = [];

    db.collection('users')
      .doc(uid)
      .collection('directory')
      .doc(directoryId)
      .collection('urls')
      .orderBy('updated_at', 'asc')
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          urlInfo.push(data);
        });
        dispatch(fetchUrlInfoAction(urlInfo));
      });
  };
};
//URL情報の削除
export const deleteUrlInfo = (urlId, directoryId) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const urlRef = db
      .collection('users')
      .doc(uid)
      .collection('directory')
      .doc(directoryId)
      .collection('urls')
      .doc(urlId);
    urlRef.delete().then(() => {
      const prevUrlInfo = getState().users.urlList;
      const nextUrlInfo = prevUrlInfo.filter((urlInfo) => urlInfo.id !== urlId);
      dispatch(deleteUrlInfoAction(nextUrlInfo));
    });
  };
};

//directoryの取得
export const fetchDirectory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const directoryList = [];

    db.collection('users')
      .doc(uid)
      .collection('directory')
      .orderBy('updated_at', 'asc')
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          directoryList.push(data);
        });
        dispatch(fetchDirectoryAction(directoryList));
      });
  };
};
//directoryの作成
export const saveDirectory = (directory) => {
  return async (dispatch, getState) => {
    if (directory === '') {
      alert('ディレクトリ名が未入力です');
      return false;
    }
    const uid = getState().users.uid;
    const timestamp = FirebaseTimestamp.now();
    const directoryRef = db.collection('users').doc(uid).collection('directory').doc();

    //directoryデータ作成
    const data = {
      directory: directory,
      created_at: timestamp,
      updated_at: timestamp,
    };
    // id作成
    let id = directoryRef.id;
    data.id = id;

    await directoryRef.set(data);
    dispatch(push('/'));
  };
};
//directoryの削除
export const deleteDirectory = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    await db
      .collection('users')
      .doc(uid)
      .collection('directory')
      .doc(id)
      .delete()
      .then(() => {
        const prevDirectorys = getState().users.directoryList;
        const nextDirectorys = prevDirectorys.filter((directory) => directory.id !== id);
        dispatch(deleteDirectoryAction(nextDirectorys));
      });
    dispatch(push('/'));
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // if (email === '') {
    //   const error = 'メールアドレスを入力してください。';
    //   dispatch(errorOutputAction(error));
    //   return false;
    // } else {
    //   const error = ''
    //   dispatch(errorOutputAction(error));
    // }
    // if (password === '') {
    //   const error = 'パスワードを入力してください。';
    //   dispatch(errorOutputAction(error));
    //   return false;
    // }
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    //Validation
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      return false;
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致していません');
      return false;
    }
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username,
        };
        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(
              signInAction({
                isSignedIn: true,
                role: userInitialData.role,
                uid: userInitialData.uid,
                username: userInitialData.username,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

//Google認証
export const onGoogleSignIn = () => {
  return async (dispatch) => {
    var provider = new snsAuth.GoogleAuthProvider();
    provider.addScope('email');
    console.log(provider);
    snsAuth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        const username = result.additionalUserInfo.profile.name;
        const user = result.user;
        const uid = user.uid;

        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username,
        };
        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(
              signInAction({
                isSignedIn: true,
                role: userInitialData.role,
                uid: userInitialData.uid,
                username: userInitialData.username,
              })
            );
            dispatch(push('/'));
          });

        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
      });
  };
};
//Twitter認証
export const onTwitterSignIn = () => {
  return async (dispatch) => {
    var provider = new snsAuth.TwitterAuthProvider();
    snsAuth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        const username = result.additionalUserInfo.profile.name;
        const user = result.user;
        const uid = user.uid;

        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username,
        };
        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(
              signInAction({
                isSignedIn: true,
                role: userInitialData.role,
                uid: userInitialData.uid,
                username: userInitialData.username,
              })
            );
            dispatch(push('/'));
          });

        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
      });
  };
};
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signIn'));
    });
  };
};
