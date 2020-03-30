import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Root from './root/root';
import Frontpage from './frontpage/frontpage';
import Login from './root/login';
import Logout from './root/logout';
import CreateAccount from './root/createAccount';

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

                <Route path="/all" component={ Frontpage }/>
                <Route path="/politics" component={ Frontpage }/>
                <Route path="/science" component={ Frontpage }/>
                <Route path="/business" component={ Frontpage }/>
                <Route path="/food" component={ Frontpage }/>
                <Route path="/sports" component={ Frontpage }/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;