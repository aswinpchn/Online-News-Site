import React, {Component} from 'react';
import Header from '../common/header';
import HeadlineCard from './headlineCard';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import IsEditorCheck from '../common/isEditorCheck';

class Landing extends Component {

    render(){

        var article1 = {
            headline : "Tokyo Olympics Organizers Considering July 2021 for Opening Ceremony 2021 for Opening Opening Ceremony 2021 for Opening",
            author: "John Doe",
            catgories: ["Sports", "Politics"],
            likeCount: 2,
            commentCount: 3,
            viewCount: 300
        }
        var article2 = {
            headline : "April Bills Loom. The Economy Hangs on How Many Are Left Unpaid.",
            author: "Jayda Sloan",
            catgories: ["Sports", "Politics", "Business"],
            likeCount: 2,
            commentCount: 9,
            viewCount: 120
        }
        var article3 = {
            headline : "Surging Traffic Is Slowing Down Our Internet",
            author: "Dotty Mclean",
            catgories: ["Food"],
            likeCount: 2,
            commentCount: 10,
            viewCount: 30
        }
        var article4 = {
            headline : "For Drive-In Theaters, an Unexpected Revival",
            author: "Clifford Hodgson",
            catgories: ["Science", "Politics"],
            likeCount: 20,
            commentCount: 3,
            viewCount: 28
        }

        return(
            <div>
                <IsEditorCheck />
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    <HeadlineCard articleInfo = { article1 } />
                    <HeadlineCard articleInfo = { article2 } />
                    <HeadlineCard articleInfo = { article3 } />
                    <HeadlineCard articleInfo = { article4 } />

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;