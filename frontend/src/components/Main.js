import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={ Root }/>
                <Route path="/login" component={ Login }/>
                <Route path="/logout" component={ Logout }/>
                <Route path="/create-account" component={ CreateAccount }/>

                <Route path="/frontpage/:category" component={ ReaderFrontpage }/>
                
                <Route path="/editor" component={ EditorFrontpage }/>
                <Route path="/create-article" component={ CreateArticle }/>
                <Route path="/analytics" component={ Analytics }/>
                <Route path="/edit-article/:articleId" component={ EditArticle }/>
                
                <Route path="/article/:articleId" component={ Article }/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;