import React, { useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signUp } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          Sign Up
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={inputUsername}
          label="username"
          name="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={inputEmail}
          label="Email"
          name="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={inputPassword}
          name="password"
          label="Password"
          type="password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={confirmPassword}
          onChange={inputConfirmPassword}
          name="confirm password"
          label="Password（確認用）"
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        >
          Sign Up
        </Button>
        <p
          onClick={() => {
            dispatch(push('/signIn'));
          }}
        >
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
