import React from 'react';
import { useSelector } from 'react-redux';
import { getUserId, getUsername } from '../reducks/users/selectors';

const UrlList = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  return (
    <div>
      <h1>{uid}</h1>
      <h1>{username}</h1>
    </div>
  );
};

export default UrlList;
