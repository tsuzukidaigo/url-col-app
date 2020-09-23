import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDirectoryList, getUrlList } from '../reducks/users/selectors';
import UrlCard from '../components/Urls/UrlCard';
import { makeStyles, Typography } from '@material-ui/core';
import { fetchUrlInfo } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  items: {
    marginLeft: '5%',
    marginTop: '2%',
    width: '70%',
  },
  mylist: {
    marginBottom: '2%',
  },
  urlCard: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
}));

const UrlList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const urlList = getUrlList(selector);
  const directoryId = props.directoryType;
  if (directoryId === 'mylist') {
    var pageTitle = 'マイリスト';
  } else if (directoryId === 'favorite') {
    var pageTitle = 'お気に入り';
  } else {
    var directoryList = getDirectoryList(selector);
    var nowDirectoryInfo = directoryList.filter((directory) => directory.id === directoryId);
    var pageTitle = nowDirectoryInfo.directory;
  }
  const nowURL = window.location.pathname;
  useEffect(() => {
    dispatch(fetchUrlInfo(directoryId));
  }, [nowURL]);

  return (
    <div className={classes.items}>
      <Typography component="h5" variant="h5" className={classes.mylist}>
        {pageTitle}
      </Typography>
      <div className={classes.urlCard}>
        {urlList.map((urlInfo) => (
          <UrlCard urllist={urlInfo} urlId={urlInfo.id} directoryId={directoryId} />
        ))}
      </div>
    </div>
  );
};

export default UrlList;
