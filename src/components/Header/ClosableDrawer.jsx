import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core';
import { signOut } from '../../reducks/users/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  drawerPaper: {
    width: 256,
  },
}));
const ClosableDrawer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const logoutToggle = (e) => {
    dispatch(signOut());
    props.onClose(e);
  };

  const menus = [
    {
      label: 'URL登録',
      icon: <AddCircleIcon />,
      id: 'register',
      value: '/product/edit',
    },
    {
      label: 'アーカイブ',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/order/history',
    },
    {
      label: 'プロフィール',
      icon: <PersonIcon />,
      id: 'profile',
      value: '/user/mypage',
    },
  ];
  return (
    <nav className={classes.drawer}>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={props.open}
        onClose={(e) => props.onClose(e)}
      >
        <List>
          {menus.map((menu) => (
            <ListItem button key={menu.id}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem button key="logout" onClick={(e) => logoutToggle(e)}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
