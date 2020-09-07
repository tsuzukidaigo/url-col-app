import React from 'react';
import { Switch, Route } from 'react-router';
import { SignUp, SignIn, UrlList } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signUp'} component={SignUp} />
      <Route exact path={'/signIn'} component={SignIn} />
      <Route exact path={'/'} component={UrlList} />
    </Switch>
  );
};

export default Router;
