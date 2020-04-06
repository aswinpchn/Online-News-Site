import React, {Component} from 'react';
import Header from '../common/header';
import HeadlineCard from './headlineCard';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import { Redirect } from 'react-router';
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
        axios.get(`${Constants.BACKEND_SERVER.URL}/article/headlines?type=${this.props.match.params.category}`)
        .then((response) => {
            this.setState({
                allArticles: response.data
            })
        })
    }

    render(){
        let RedirectVar
        if (localStorage.getItem('226UserType') === "Editor") {
            RedirectVar = <Redirect to="/editor" />;
        }	

        let allHeadlines = [],
            index,
            articleObj
        if (this.state.allArticles.length === 0) {
            allHeadlines = [
                <div className="p-5">
                    <p className="display-4">Oops! Looks like there are no articles present for this category at the moment</p>
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
                { RedirectVar }
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