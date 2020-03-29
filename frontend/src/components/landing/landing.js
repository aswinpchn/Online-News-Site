import React, {Component} from 'react';
import Header from '../common/header';
import HeadlineCard from '../common/headlineCard';
import Footer from '../common/footer';
import Navigation from '../common/navigation';

class Landing extends Component {

    render(){

        var headline1 = "Tokyo Olympics Organizers Considering July 2021 for Opening Ceremony 2021 for Opening ...";
        var headline2 = "Surging Traffic Is Slowing Down Our Internet";
        var headline3 = "April Bills Loom. The Economy Hangs on How Many Are Left Unpaid.";
        var headline4 = "For Drive-In Theaters, an Unexpected Revival";

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    <HeadlineCard headline={ headline1 } author = "John Doe" />
                    <HeadlineCard headline={ headline2 } author = "Kady Gordon" />
                    <HeadlineCard headline={ headline3 } author = "Alesha Sharpe" />
                    <HeadlineCard headline={ headline4 } author = "Cody Lozano" />

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;