import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import { Redirect } from 'react-router';

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            headline : "Tokyo Olympics Organizers Considering July 2021 for Opening Ceremony 2021 for Opening Opening Ceremony 2021 for Opening",
            author: "John Doe",
            catgories: ["Sports", "Politics"],
            likeCount: 2,
            commentCount: 3,
            viewCount: 300
        }
    }
    render(){

        let redirectVar
        if (!localStorage.getItem('226User')) {
            redirectVar = <Redirect to="/login" />
        }

        return(
            <div>
                { redirectVar }
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                        {/* Make design here */}

                        
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;