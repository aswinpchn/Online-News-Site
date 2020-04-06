import React, {Component} from 'react';

class HeadlineCard extends Component {

    render(){

        var headline = this.props.articleInfo['headline'];
        if (headline.length > 85) {
            headline = headline.slice(0, 85) + "...";
        }
        let categories = [],
            index
        for (index = 0; index < this.props.articleInfo['categories'].length; index++) {
            categories.push(<span class="bg-secondary text-white ml-2 p-1 rounded">{ this.props.articleInfo['categories'][index] }</span>)
        }
        let authorOrEdit = [<span class="font-weight-bold">- { this.props.articleInfo['editorName'] }</span>]
        if (localStorage.getItem('226UserType') === "Editor") {
            authorOrEdit = [<a href={ "/edit-article/" + this.props.articleInfo['editorId'] +"/" + this.props.articleInfo['articleId'] } class="text-decoration-none"><span class="bg-primary p-1 mr-2 text-white rounded">Edit this article</span></a>]
        }
        return(
            <a href={ "/article/" + this.props.articleInfo['editorId'] +"/" + this.props.articleInfo['articleId'] } class="text-dark text-decoration-none">
                <div class="p-4 shadow">
                    <p class="display-4">{ headline }</p>
                    <div>
                        { authorOrEdit }
                        { categories }
                    </div>
                    <div class="row font-weight-lighter">
                        <div class="col-md-2">
                            { this.props.articleInfo['likeCount'] } Likes
                        </div>
                        <div class="col-md-2">
                            { this.props.articleInfo['commentCount'] } Comments                        
                        </div>
                        <div class="col-md-2">
                            { this.props.articleInfo['viewCount'] } Views                     
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}
//export HeadlineCard Component
export default HeadlineCard;