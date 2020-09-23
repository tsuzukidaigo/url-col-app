import React, { useState, useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClosableDrawer from './ClosableDrawer';
import Modal from 'react-modal';
import { Divider, TextField, Button } from '@material-ui/core';
import { fetchUrlInfo, saveUrl } from '../../reducks/users/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    width: '70%',
    marginLeft: '15%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  save: {
    marginTop: '5%',
  },
  space: {
    marginTop: '5%',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const directoryType = props.directoryType;

  const customStyles = {
    content: {
      top: '30%',
      left: '43%',
      right: 'auto',
      bottom: 'auto',
      width: '20%',
    },
  };
  const [open, setOpen] = useState(false),
    [modalIsOpen, setModalIsOpen] = useState(false),
    [modalTitle, setModalTitle] = useState(''),
    [modalUrlName, setModalUrlName] = useState('');

  const handleDrawerToggle = useCallback(
    (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );
  Modal.setAppElement('#root');

  const inputModalTitle = useCallback(
    (event) => {
      setModalTitle(event.target.value);
    },
    [setModalTitle]
  );

  const inputModalUrlName = useCallback(
    (event) => {
      setModalUrlName(event.target.value);
    },
    [setModalUrlName]
  );

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Owl
            </Typography>
            <IconButton color="inherit" onClick={() => setModalIsOpen(true)}>
              <AddCircleIcon />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="タイトル"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <div>
          <Typography className={classes.modalItem}>URL登録</Typography>
          <Divider />
          <Typography className={classes.space}>title</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="title"
            name="title"
            value={modalTitle}
            onChange={inputModalTitle}
          />
          <Typography>URL</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="URL"
            name="URL"
            value={modalUrlName}
            onChange={inputModalUrlName}
          />
          <Divider />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.save}
            onClick={() => {
              dispatch(saveUrl(directoryType, modalTitle, modalUrlName));
              dispatch(fetchUrlInfo(directoryType));
              setModalTitle('');
              setModalUrlName('');
              setModalIsOpen(!modalIsOpen);
            }}
          >
            保存
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Header;
