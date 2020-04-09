import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import IsEditorCheck from '../common/isEditorCheck';
import axios from 'axios';
import Constants from '../../utils/constants';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            headlines: "",
            body: "",
            errMsg: "",
            successMsg: ""
        };
        this.selectedCategory = [];
    }
    
    componentDidMount() {
        axios.get(Constants.BACKEND_SERVER.URL + `/article/view/${ this.props.match.params.editorId }/${ this.props.match.params.articleId }/Editor`)
        .then((response) => {
            this.setState({
                headlines: response.data.headlines,
                body: response.data.body,
                categories: response.data.categories
            });
        })
        .catch(() => {
            console.log("ERROR");
        })
    }

    bodyChangeHandler = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    categoryChangeHandler = (e) => {
        if (this.selectedCategory.includes(e.target.value)) {
            var index = this.selectedCategory.indexOf(e.target.value);
            this.selectedCategory.splice(index, index + 1);
        } else {
            this.selectedCategory.push(e.target.value);
        }
    }

    IsValueEmpty = (Value) => {
        if (Value == null) {
            return false;
        }
        if (''.localeCompare(Value.replace(/\s/g, '')) === 0) return true;
        return false;
    }

    updateArticle = (e) => {
        e.preventDefault();
		const articleData = {
            editor_id : localStorage.getItem('226UserId'),
            article_id : this.props.match.params.articleId,
			body : this.state.body
        }
        if (this.IsValueEmpty(articleData.body)) {
            this.setState({
                errMsg: "Body cannot be empty",
                successMsg: ""
            })
        } else {
            axios.put(Constants.BACKEND_SERVER.URL + "/article/modifyarticle", articleData)
            this.setState({
                errMsg: "",
                successMsg: "Article updated successfully"
            })
        }
    }

    render(){

        let categories = []
        for (var index in this.state.categories) {            
            categories.push(<span class="bg-secondary text-white ml-2 p-1 rounded">{ this.state.categories[index] }</span>);
        }
        
        return(
            <div>
                <IsEditorCheck />
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                        <div class="pt-3">
                            <h4 class="display-4">{ this.state.headlines }</h4>
                            <div>
                                <textarea class="form-control" rows="10" style = {{ resize : 'none' }} value={ this.state.body } onChange={ this.bodyChangeHandler }/>
                            </div>
                            <div class="mt-3">{ categories }</div> 
                            

                            <p class="text-danger text-center">{ this.state.errMsg }</p>
                            <p class="text-success text-center">{ this.state.successMsg }</p>

                            <button class="btn btn-primary text-white w-100 mt-3 font-weight-bold" onClick={ this.updateArticle }>Update article</button>
                        </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;