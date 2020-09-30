import React from 'react';
import Alert from '@material-ui/lab/Alert';

const EmailError = (props) => {
  const { email, clickCount } = props;
  const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  return (
    <div>
      {!email && clickCount > 0 && (
        <Alert severity="error">メールアドレスを入力してください。</Alert>
      )}
      {email && !reg.test(email) && clickCount > 0 && (
        <Alert severity="error">正しいメールアドレスを入力してください。</Alert>
      )}
    </div>
  );
};

export default EmailError;
