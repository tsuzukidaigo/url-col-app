import React from 'react';
import { Switch, Route } from 'react-router';
import Auth from './Auth';
import { SignUp, SignIn, Home, FavoriteDirectory, MyDirectory } from './templates';
import Reset from './templates/Reset';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signUp'} component={SignUp} />
      <Route exact path={'/signIn'} component={SignIn} />
      <Route exact path={'/signIn/reset'} component={Reset} />

      <Auth>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/favorite'} component={FavoriteDirectory} />
        <Route path={'/create/:id'} component={MyDirectory} />
      </Auth>
    </Switch>
  );
};

export default Router;
