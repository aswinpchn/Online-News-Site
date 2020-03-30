import React, {Component} from 'react';

class HeadlineCard extends Component {

    render(){

        var headline = this.props.articleInfo['headline'];
        if (headline.length > 85) {
            headline = headline.slice(0, 85) + "...";
        }
        let categories = [],
            index
        for (index = 0; index < this.props.articleInfo['catgories'].length; index++) {
            categories.push(<span class="bg-secondary text-white ml-2 p-1 rounded">{ this.props.articleInfo['catgories'][index] }</span>)
        }
        console.log(this.props.articleInfo['catgories'].length)
        return(
            <div class="p-4 shadow">
                <p class="display-4">{ headline }</p>
                <div>
                    <span class="font-weight-bold">- { this.props.articleInfo['author'] }</span>
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
        )
    }
}
//export HeadlineCard Component
export default HeadlineCard;