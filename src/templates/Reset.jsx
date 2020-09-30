import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import EmailError from '../components/UIKit/errors/EmailError';
import { resetPassword } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      border: '1px solid',
      borderRadius: '8px',
      borderColor: '#CCCCCC',
      marginTop: '5%',
      boxShadow: '0 0 8px gray',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Reset = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''),
    [clickCount, setClickCount] = useState(0);
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  return (
    <div>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={inputEmail}
          label="Email"
          name="email"
        />
        <EmailError email={email} clickCount={clickCount} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            setClickCount(clickCount + 1);
            dispatch(resetPassword(email));
          }}
        >
          パスワードのリセット
        </Button>
        <p
          onClick={() => {
            dispatch(push('/signIn'));
          }}
        >
          ログイン画面に戻る
        </p>
      </Container>
    </div>
  );
};

export default Reset;
