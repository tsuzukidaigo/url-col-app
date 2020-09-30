import React from 'react';
import Alert from '@material-ui/lab/Alert';

const ConfirmPasswordError = (props) => {
  const { password, confirmPassword, clickCount } = props;
  return (
    <div>
      {password !== confirmPassword && clickCount > 0 && (
        <Alert severity="error">同一のパスワードを入力してください。</Alert>
      )}
    </div>
  );
};

export default ConfirmPasswordError;
