import React, { Component } from 'react';
import Constants from '../../utils/constants';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

class ReadByAgeGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            selectedAgeGroup: "0-18"
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        // console.log(prevState);
        // console.log(this.state);
        if(prevState.selectedAgeGroup !== this.state.selectedAgeGroup) {
            this.getData();
        }
    }

    getData = () => {
        axios.post(Constants.BACKEND_SERVER.URL + `/analytics/read/age/`, {
            editor_id: localStorage.getItem('226UserId'),
            age_bracket: this.state.selectedAgeGroup
        })
            .then((response) => {
                console.log(response)
                let labels = [];
                let data = [];

                labels.push(this.state.selectedAgeGroup);
                data.push(response.data.count);

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
            selectedAgeGroup: e.target.value,
        });
    }

    render() {

        let data= {
            labels: this.state.labels,
            datasets: [{
                label: "Read By Age Group",
                backgroundColor: 'rgb(99,208,255)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.state.data,
            }]
        };

        return (
            <div>
                <h2>Read By Age Group</h2>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selectedAgeGroup}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={this.onCategoryClick}>
                        <button className={this.state.selectedAgeGroup === "0-18" ? "dropdown-item active" : "dropdown-item"} value="0-18">0-18</button>
                        <button className={this.state.selectedAgeGroup === "18-40" ? "dropdown-item active" : "dropdown-item"} value="18-40">18-40</button>
                        <button className={this.state.selectedAgeGroup === "40-60" ? "dropdown-item active" : "dropdown-item"} value={"40-60"}>40-60</button>
                        <button className={this.state.selectedAgeGroup === "60+" ? "dropdown-item active" : "dropdown-item"} value={"60+"}>60+</button>
                    </div>
                </div>
                < Bar data={data} />
            </div>
        );
    }
}

export default ReadByAgeGroup;