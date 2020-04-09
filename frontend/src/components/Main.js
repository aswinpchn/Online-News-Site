import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Root from './root/root';
import ReaderFrontpage from './frontpage/reader';
import EditorFrontpage from './frontpage/editor';
import Login from './root/login';
import Logout from './root/logout';
import CreateAccount from './root/createAccount';
import Article from './articlePage/articlePage';
import CreateArticle from './editor/newArticle';
import Analytics from './editor/analytics';
import EditArticle from './editor/editArticle';
import UpdateUserAccount from './user/updateAccount';
import UpdateEditorAccount from './editor/updateAccount';
import UserActivityHistory from './user/activityhistory';
import UserNotifications from './user/notifications';

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Root} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/update-account/editor" component={UpdateEditorAccount} />
        <Route path="/update-account/user" component={UpdateUserAccount} />
        <Route path="/view/history" component={UserActivityHistory} />
        <Route path="/view/notifications" component={UserNotifications} />
        <Route path="/frontpage/:category" component={ReaderFrontpage} />

        <Route path="/editor" component={EditorFrontpage} />
        <Route path="/create-article" component={CreateArticle} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/edit-article/:editorId/:articleId" component={EditArticle} />

        <Route path="/article/:editorId/:articleId" component={Article} />
      </div>
    )
  }
}
//Export The Main Component
export default Main;