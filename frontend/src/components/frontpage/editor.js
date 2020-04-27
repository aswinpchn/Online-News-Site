// SJSU CMPE 226 Fall 2019 TEAM1

import React, {Component} from 'react';
import Header from '../common/header';
import HeadlineCard from './headlineCard';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import IsEditorCheck from '../common/isEditorCheck';
import Constants from '../../utils/constants';
import axios from 'axios';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            allArticles: []
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/article/headlines/editor/${localStorage.getItem('226UserId')}`)
        .then((response) => {
            this.setState({
                allArticles: response.data
            })
        })
    }

    render(){

        let allHeadlines = [],
            index,
            articleObj
        if (this.state.allArticles.length === 0) {
            allHeadlines = [
                <div className="p-5">
                    <p className="display-4">Oops! Looks like you have not posted any articles at the moment</p>
                </div>
            ]
        } else {
            for (index in this.state.allArticles) {
                articleObj = this.state.allArticles[index]
                allHeadlines.push(<HeadlineCard articleInfo = { articleObj } />)
            }
        }

        return(
            <div>
                <IsEditorCheck />
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    { allHeadlines }

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;