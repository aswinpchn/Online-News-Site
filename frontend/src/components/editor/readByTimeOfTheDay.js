import React, { Component } from 'react';
import Constants from '../../utils/constants';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

class ReadByTimeOfTheDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: [],
            selectedTimeOfTheDay: "6AM-2PM"
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        // console.log(prevState);
        // console.log(this.state);
        if(prevState.selectedTimeOfTheDay !== this.state.selectedTimeOfTheDay) {
            this.getData();
        }
    }

    getData = () => {
        axios.post(Constants.BACKEND_SERVER.URL + `/analytics/read/time/`, {
            editor_id: localStorage.getItem('226UserId'),
            time_of_the_day: this.state.selectedTimeOfTheDay
        })
            .then((response) => {
                console.log(response)
                let labels = [];
                let data = [];

                labels.push(this.state.selectedTimeOfTheDay);
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
            selectedTimeOfTheDay: e.target.value,
        });
    }

    render() {

        let data= {
            labels: this.state.labels,
            datasets: [{
                label: "Read By Time Of The Day",
                backgroundColor: 'rgb(99,208,255)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.state.data,
            }]
        };

        return (
            <div>
                <h2>Read By Time of the day</h2>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selectedTimeOfTheDay}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={this.onCategoryClick}>
                        <button className={this.state.selectedTimeOfTheDay === "6AM-2PM" ? "dropdown-item active" : "dropdown-item"} value="6AM-2PM">6AM-2PM</button>
                        <button className={this.state.selectedTimeOfTheDay === "2PM-10PM" ? "dropdown-item active" : "dropdown-item"} value="2PM-10PM">2PM-10PM</button>
                        <button className={this.state.selectedTimeOfTheDay === "10PM-6AM" ? "dropdown-item active" : "dropdown-item"} value={"10PM-6AM"}>10PM-6AM</button>
                    </div>
                </div>
                < Bar data={data} />
            </div>
        );
    }
}

export default ReadByTimeOfTheDay;