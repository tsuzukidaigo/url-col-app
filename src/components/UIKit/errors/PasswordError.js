import React from 'react';
import Alert from '@material-ui/lab/Alert';

const PasswordError = (props) => {
  const { password, clickCount } = props;
  return (
    <div>
      {!password && clickCount > 0 && (
        <Alert severity="error">パスワードを入力してください。</Alert>
      )}
      {password && password.length < 6 && clickCount > 0 && (
        <Alert severity="error">パスワードを6文字以上で入力してください。</Alert>
      )}
    </div>
  );
};

export default PasswordError;
