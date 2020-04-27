// SJSU CMPE 226 Fall 2019 TEAM1

import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            isSubscribed: false
        }
    }

    componentDidMount() {
        
        if (localStorage.getItem('226UserType') === "User") {
            
            var path = window.location.pathname.split("/")

            if (path[2] === "all") {
                this.setState({
                    isSubscribed: true
                })
                return
            }

            axios.get(`${Constants.BACKEND_SERVER.URL}/users/subscribedCategories/${localStorage.getItem('226UserId')}`)
                .then((response) => {
                    // console.log(response.data)
                    
                    if (path[1] !== "frontpage") {
                        this.setState({
                            isSubscribed: true
                        })
                        return
                    }
                    if (path.length > 1 && response.data.includes(path[2])) {
                        this.setState({
                            isSubscribed: true
                        })
                    }
                })
        }
    }

    subscribeToCategory = () => {
        if (this.state.isSubscribed === false) {
            const reqBody = {
                user_id: localStorage.getItem('226UserId'),
                category_name: window.location.pathname.split("/")[2]
            }
            axios.post(`${Constants.BACKEND_SERVER.URL}/users/subscribe`, reqBody)
                .then(() => {
                    this.setState({
                        isSubscribed: true
                    })
                })
        }
    }

    render() {

        let Navbar = [];
        if (localStorage.getItem('226UserType') === "Editor") {
            Navbar.push(
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/editor" class="text-white">My articles</a></div>
                    <div class="col-md-2 p-2"><a href="/create-article" class="text-white">Post new</a></div>
                    <div class="col-md-2 p-2"><a href="/analytics" class="text-white">Analytics</a></div>
                </div>
            );
        } else {
            let subscribe = []
            if (this.state.isSubscribed === false) {
                subscribe = <div class="col-md-2 p-2 text-white" onClick={this.subscribeToCategory}>Subscribe to category</div>
            } else {
                subscribe = <div class="col-md-2 p-2 bg-white text-white"></div>
            }
            if (localStorage.getItem('226UserType') === "User") {

                Navbar.push(
                    <div class="row bg-dark mb-1 text-center font-weight-bold">
                        <div class="col-md-6 p-2 bg-white text-white"></div>
                        {subscribe}
                        <div class="col-md-2 p-2"><a href="/view/history" class="text-white">View my activity</a></div>
                        <div class="col-md-2 p-2"><a href="/view/notifications" class="text-white">Notifications</a></div>
                    </div>
                )
            }
            Navbar.push(
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/frontpage/all" class="text-white">All</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/politics" class="text-white">Politics</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/science" class="text-white">Science</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/business" class="text-white">Business</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/food" class="text-white">Food</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/sports" class="text-white">Sports</a></div>
                </div>
            )
        }

        return (
            <div>
                {Navbar}
            </div>
        )
    }
}
//export Home Component
export default Home;