import React from 'react';
import Header from '../components/Header/Header';
import UrlList from './UrlList';
import SideMenu from '../components/UIKit/SideMenu';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  line: {
    flexFlow: 'row wrap',
    display: 'flex',
  },
  sideItems: {
    float: 'left',
  },
}));

const FavoriteUrls = () => {
  const classes = useStyles();
  const id = 'favorite';
  return (
    <div>
      <Header directoryType={id} />
      <div className={classes.line}>
        <SideMenu className={classes.sideItems} />
        <UrlList directoryType={id} />
      </div>
    </div>
  );
};

export default FavoriteUrls;
