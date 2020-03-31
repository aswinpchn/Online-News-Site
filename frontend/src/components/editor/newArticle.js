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
        }
        this.selectedCategory = [];
    }
    
    componentDidMount() {
        axios.get(Constants.BACKEND_SERVER.URL + "/article/category/list")
        .then((response) => {
            this.setState({
                categories: response.data
            })
        })
        .catch(() => {
            console.log("ERROR")
        })
    }

    headlinesChangeHandler = (e) => {
        this.setState({
            headlines: e.target.value
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

    postArticle = (e) => {
        e.preventDefault();
		const articleData = {
			editor_id : localStorage.getItem('226UserId'),
			headlines : this.state.headlines,
			body : this.state.body,
			categories : this.selectedCategory
        }
        if (this.IsValueEmpty(articleData.headlines) || this.IsValueEmpty(articleData.body)) {
            this.setState({
                errMsg: "Headlines and body cannot be empty",
                successMsg: ""
            })
        } else if (this.selectedCategory.length === 0) {
            this.setState({
                errMsg: "Please select atleast one category this article belongs to",
                successMsg: ""
            })
        } else {
            axios.post(Constants.BACKEND_SERVER.URL + "/article/savearticle", articleData)
            this.setState({
                headlines: "",
                body: "",
                errMsg: "",
                successMsg: "Article posted successfully"
            })
        }
    }

    render(){

        let categories = []
        for (var index in this.state.categories) {
            
            categories.push(
                <div class="form-check form-check-inline">
                    <input class="form-check-input" onClick = { this.categoryChangeHandler } type="checkbox" id={ "category" + index } value={ this.state.categories[index].name } />
                    <label class="form-check-label" for={ "category" + index }>{ this.state.categories[index].name }</label>
                </div>
            );
        }
        
        return(
            <div>
                <IsEditorCheck />
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                        <div class="pt-3">
                            <h4 class="font-weight-light">Headline</h4>
                            <textarea class="form-control" style = {{ resize : 'none' }} value={ this.state.headlines } onChange={ this.headlinesChangeHandler }/>

                            <h4 class="font-weight-light">Body</h4>
                            <textarea class="form-control" rows="10" style = {{ resize : 'none' }} value={ this.state.body } onChange={ this.bodyChangeHandler }/>

                            <h4 class="font-weight-light">Categories</h4> { categories }

                            <p class="text-danger text-center">{ this.state.errMsg }</p>
                            <p class="text-success text-center">{ this.state.successMsg }</p>

                            <button class="btn btn-primary text-white w-100 mt-3 font-weight-bold" onClick={ this.postArticle }>Post article</button>
                        </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;