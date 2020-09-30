import React from 'react';
import Alert from '@material-ui/lab/Alert';

const UsernameError = (props) => {
  const { username, clickCount } = props;
  return (
    <div>
      {!username && clickCount > 0 && (
        <Alert severity="error">ユーザー名を入力してください。</Alert>
      )}
    </div>
  );
};

export default UsernameError;
