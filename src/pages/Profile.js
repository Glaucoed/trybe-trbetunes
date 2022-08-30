import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
        </Switch>
      </div>
    );
  }
}

export default Profile;
