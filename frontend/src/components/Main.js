import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Root from './root/root';
import Landing from './landing/landing';
import Login from './root/login';
import CreateAccount from './root/createAccount';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={ Root }/>
                <Route path="/login" component={ Login }/>
                <Route path="/create-account" component={ CreateAccount }/>

                <Route path="/all" component={ Landing }/>
                <Route path="/politics" component={ Landing }/>
                <Route path="/science" component={ Landing }/>
                <Route path="/business" component={ Landing }/>
                <Route path="/food" component={ Landing }/>
                <Route path="/sports" component={ Landing }/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;