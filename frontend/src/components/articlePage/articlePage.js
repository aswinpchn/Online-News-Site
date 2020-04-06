import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import { Redirect } from 'react-router';
import axios from 'axios';
import * as Constants from "../../utils/constants";

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            headlines : "Default Headline",
            author: "John Doe",
            categories: ["Sports", "Politics"],
            likeCount: 2,
            commentCount: 3,
            readCount: 300,
            comments: null,
            lastModified: null,
            body: null,
            likeStatus: false
        }
    }

    componentDidMount() {
        axios.get(Constants.BACKEND_SERVER.URL + `/article/view/${this.props.match.params.editorId }/${this.props.match.params.articleId }`)
          .then((response) => {
              //console.log(response);

              axios.get(Constants.BACKEND_SERVER.URL + `/article/likes/${this.props.match.params.editorId}/${this.props.match.params.articleId}/${localStorage.getItem('226UserId')}`)
                .then((res) => {
                    this.setState({
                        headlines: response.data.headlines,
                        author: response.data.name,
                        categories: response.data.categories,
                        likeCount: response.data.likeCount,
                        commentCount: response.data.commentCount,
                        readCount: response.data.readCount,
                        comments: response.data.comments,
                        lastModified: response.data.lastModified,
                        body: response.data.body,
                        likeStatus: res.data.status,
                        alreadyLikedError: false
                    });
                 });
          }).catch((error) => {

          });
    }

    // https://reactjs.org/docs/react-component.html#componentdidupdate
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevProps);
        // console.log(prevState);
        // console.log(this.props);
        // console.log(this.state);
    }

    // https://stackoverflow.com/questions/29577977/unable-to-access-react-instance-this-inside-event-handler
    likeClickHandler = () => {
        //console.log(this.props);
        axios.post(Constants.BACKEND_SERVER.URL + '/users/like', {
            "article_id": this.props.match.params.articleId,
            "editor_id": this.props.match.params.editorId,
            "user_id" : localStorage.getItem('226UserId')
        }).then((response) => {
            this.setState({
                likeStatus: true,
                likeCount: this.state.likeCount + 1
            });
        }).catch((error) => {
            this.setState({
                alreadyLikedError: true
            });
        });
    }


    render(){

        let redirectVar
        if (!localStorage.getItem('226User')) {
            redirectVar = <Redirect to="/login" />
        }

        var headline = this.state.headlines;
        let categories = [];
        for (let index = 0; index < this.state.categories.length; index++) {
            categories.push(<span class="bg-secondary text-white ml-2 p-1 rounded">{ this.state.categories[index] }</span>)
        }

        let likeStatus = (this.state.likeStatus?<i className="fas fa-heart"></i>:<i className="far fa-heart"></i>);

        let alreadyLikedError = (this.state.alreadyLikedError? <div className="alert alert-danger" role="alert">
            You have already like this article!
        </div>:<div></div>);

        return(
            <div>
                { redirectVar }
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />

                    <div
                      className="text-dark text-decoration-none">
                        <div className="p-4 shadow">
                            <p className="display-4">{headline}</p>
                            <div>
                                {categories}
                            </div>
                            <div className="border">
                                {this.state.body}
                            </div>
                            <div className="row font-weight-lighter">
                                <div className="col-md-2">
                                    {this.state.likeCount} Likes
                                </div>
                                <div className="col-md-2">
                                    {this.state.commentCount} Comments
                                </div>
                                <div className="col-md-2">
                                    {this.state.readCount} Views
                                </div>
                            </div>
                            <div className="row font-weight-lighter">
                                <div className="col-md-2">
                                    <button onClick={this.likeClickHandler}>
                                        {likeStatus}
                                    </button>
                                </div>
                                <div className="col-md-10">
                                    {alreadyLikedError}
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;