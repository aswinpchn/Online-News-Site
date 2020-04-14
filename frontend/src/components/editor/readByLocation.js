import React, { Component } from 'react';
import Constants from '../../utils/constants';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

class ReadByLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            selectedCategory: "Sports",
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        // console.log(prevState);
        // console.log(this.state);
        if(prevState.selectedCategory !== this.state.selectedCategory) {
            this.getData();
        }
    }

    getData = () => {
        axios.get(Constants.BACKEND_SERVER.URL + `/analytics/read/location/${localStorage.getItem('226UserId')}/${this.state.selectedCategory}`)
            .then((response) => {
                console.log(response)
                let labels = [];
                let data = [];
                for(let i = 0; i < response.data.length; i++) {
                    labels.push(response.data[i].location);
                    data.push(response.data[i].viewCount);
                }
                this.setState({
                    labels: labels,
                    data: data
                });
            }).catch((err) => {
            console.log(err);
        });
    }


    onCategoryClick = (e) => {
        //console.log(e.target.value);

        this.setState({
            selectedCategory: e.target.value,
        });
    }

    render() {

        let data= {
            labels: this.state.labels,
            datasets: [{
                label: "Read By Location By Category",
                backgroundColor: 'rgb(99,208,255)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.state.data,
            }]
        };

        return (
            <div>
                <h2>Read By Location By Category</h2>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selectedCategory}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={this.onCategoryClick}>
                        <button className={this.state.selectedCategory === "Business" ? "dropdown-item active" : "dropdown-item"} value="Business">Business</button>
                        <button className={this.state.selectedCategory === "Food" ? "dropdown-item active" : "dropdown-item"} value="Food">Food</button>
                        <button className={this.state.selectedCategory === "Politics" ? "dropdown-item active" : "dropdown-item"} value={"Politics"}>Politics</button>
                        <button className={this.state.selectedCategory === "Science" ? "dropdown-item active" : "dropdown-item"} value={"Science"}>Science</button>
                        <button className={this.state.selectedCategory === "Sports" ? "dropdown-item active" : "dropdown-item"} value={"Sports"}>Sports</button>
                    </div>
                </div>
                < Bar data={data} />
            </div>
        );
    }
}

export default ReadByLocation;