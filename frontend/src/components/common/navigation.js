import React, {Component} from 'react';

class Home extends Component {

    render(){	 
        
        let Navbar = [];
        if (localStorage.getItem('226UserType') === "User") {
            Navbar = [
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/frontpage/all" class="text-white">All</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/politics" class="text-white">Politics</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/science" class="text-white">Science</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/business" class="text-white">Business</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/food" class="text-white">Food</a></div>
                    <div class="col-md-2 p-2"><a href="/frontpage/sports" class="text-white">Sports</a></div>
                </div>
            ]
        } else {
            Navbar = [
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/editor" class="text-white">My articles</a></div>
                    <div class="col-md-2 p-2"><a href="/create-article" class="text-white">Post new</a></div>
                    <div class="col-md-2 p-2"><a href="/analytics" class="text-white">Analytics</a></div>
                </div>
            ]
        }

        return(
            <div>
                { Navbar }
            </div>
        )
    }
}
//export Home Component
export default Home;