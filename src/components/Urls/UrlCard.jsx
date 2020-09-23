import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Divider, MenuItem, Menu } from '@material-ui/core';
import { ReactTinyLink } from 'react-tiny-link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useDispatch } from 'react-redux';
import { deleteUrlInfo } from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  space: {
    marginRight: '1%',
    marginTop: '1%',
  },
  url: {
    width: '100%',
  },
  menuIcon: {
    float: 'right',
  },
}));
const UrlCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const urlId = props.urlId;
  const directoryId = props.directoryId;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.space}>
      <ReactTinyLink
        cardSize="large"
        showGraphic={true}
        header={props.urllist.title}
        width="15vw"
        maxLine={2}
        minLine={1}
        url={props.urllist.url}
      />
      <IconButton>
        <StarBorderIcon />
      </IconButton>
      <IconButton onClick={handleClick} className={classes.menuIcon} color="inherit">
        <MoreVertIcon />
      </IconButton>
      <Divider />
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            dispatch(deleteUrlInfo(urlId, directoryId));
            handleClose();
          }}
        >
          削除する
        </MenuItem>
        <MenuItem>お気に入り</MenuItem>
      </Menu>
    </div>
  );
};

export default UrlCard;
