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
import { onGoogleSignIn, onTwitterSignIn, signUp } from '../reducks/users/operations';
import UsernameError from '../components/UIKit/errors/UsernameError';
import EmailError from '../components/UIKit/errors/EmailError';
import PasswordError from '../components/UIKit/errors/PasswordError';
import ConfirmPasswordError from '../components/UIKit/errors/ConfirmPasswordError';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      border: '1px solid',
      borderRadius: '8px',
      borderColor: '#CCCCCC',
      marginTop: '3%',
      boxShadow: '0 0 8px gray',
    },
  },
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
  snsDesign: {
    border: '1px solid',
    margin: theme.spacing(1, 0, 1),
  },
  snsImage: {
    marginRight: '5%',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState(''),
    [clickCount, setClickCount] = useState(0);

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
    <Container component="main" maxWidth="xs" className={classes.container}>
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
        <UsernameError username={username} clickCount={clickCount} />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={inputEmail}
          label="Email"
          name="email"
        />
        <EmailError email={email} clickCount={clickCount} />
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
        <PasswordError password={password} clickCount={clickCount} />
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
        <ConfirmPasswordError
          password={password}
          confirmPassword={confirmPassword}
          clickCount={clickCount}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            setClickCount(clickCount + 1);
            dispatch(signUp(username, email, password, confirmPassword));
          }}
        >
          Sign Up
        </Button>
        <Button
          fullWidth
          className={classes.snsDesign}
          onClick={() => {
            dispatch(onGoogleSignIn());
          }}
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            width="8%"
            height="8%"
            className={classes.snsImage}
          />
          <Typography component="h6" variant="h6">
            Googleでログイン
          </Typography>
        </Button>
        <Button
          fullWidth
          className={classes.snsDesign}
          onClick={() => {
            dispatch(onTwitterSignIn());
          }}
        >
          <img
            src="https://img.icons8.com/cute-clipart/64/000000/twitter.png"
            width="8%"
            height="8%"
            className={classes.snsImage}
          />

          <Typography component="h6" variant="h6">
            Twitterでログイン
          </Typography>
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
