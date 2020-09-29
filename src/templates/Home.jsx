import React from 'react';
import Header from '../components/Header/Header';
import UrlList from './UrlList';
import SideMenu from '../components/UIKit/SideMenu';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  line: {
    flexFlow: 'row wrap',
    display: 'flex',
  },
  sideItems: {
    float: 'left',
  },
}));
const Home = () => {
  const classes = useStyles();

  const id = 'mylist';

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

export default Home;
