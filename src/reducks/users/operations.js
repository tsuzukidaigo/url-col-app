import { push } from 'connected-react-router';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';
import { signInAction } from './actions';

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です');
      return false;
    }
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
