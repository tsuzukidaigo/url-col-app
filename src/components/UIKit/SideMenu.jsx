import React, { useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import CreateDirectory from './CreateDirectory';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import { deleteDirectory, fetchDirectory } from '../../reducks/users/operations';
import { getDirectoryList } from '../../reducks/users/selectors';

const useStyles = makeStyles(() => ({
  space: {
    marginBottom: '5%',
  },
}));

const SideMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const directoryList = getDirectoryList(selector);

  const sideMenuItems = [
    { id: 'mylist', label: 'マイリスト', value: '/', icon: <HomeIcon /> },
    {
      id: 'favorite',
      label: 'お気に入り',
      value: '/favorite',
      icon: <StarBorderIcon />,
    },
  ];
  useEffect(() => {
    dispatch(fetchDirectory());
  }, []);
  return (
    <div>
      <List>
        {sideMenuItems.map((sideMenuItem) => (
          <ListItem key={sideMenuItem.id} onClick={() => dispatch(push(sideMenuItem.value))}>
            <ListItemIcon>{sideMenuItem.icon}</ListItemIcon>
            <ListItemText primary={sideMenuItem.label} />
          </ListItem>
        ))}
        {directoryList.map((directory) => (
          <ListItem key={directory.id}>
            <ListItemIcon onClick={() => dispatch(deleteDirectory(directory.id))}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary={directory.directory}
              onClick={() => dispatch(push('/create/' + directory.id))}
            />
          </ListItem>
        ))}
        <Divider className={classes.space} />
        <CreateDirectory />
      </List>
    </div>
  );
};

export default SideMenu;
