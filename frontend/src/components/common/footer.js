// SJSU CMPE 226 Fall 2019 TEAM1

import React, {Component} from 'react';

class Home extends Component {

    render(){
        let logoutUser
        if (localStorage.getItem('226User')) {
            logoutUser = <p>Not { localStorage.getItem('226User') }? <a href="/logout">Logout</a></p>
        }
        return(               
            <div class="row mt-5 border-top">
                <div class="col-8">
                    <h1><a href="https://github.com/aswinpchn/NewsPaper" target="_blank" rel="noopener noreferrer" class="text-dark">226 Project 2</a></h1>
                    { logoutUser }
                </div>
                <div class="col-4">
                    <div class="row">
                        <div class="col-md-6">© Jayasurya Pinaki</div>
                        <div class="col-md-6">014491854</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">© Aswin Prasad</div>
                        <div class="col-md-6">014344512</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">© Rajeev Sebastian</div>
                        <div class="col-md-6">014554904</div>
                    </div> 
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;