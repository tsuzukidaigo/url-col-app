import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    //ボタンのラベルが大文字になるのを防ぐ
    button: {
      textTransform: 'none',
    },
  },
  html: {
    fontSize: '62.5%',
  },
});
