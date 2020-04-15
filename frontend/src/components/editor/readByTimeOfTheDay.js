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

    getData = () => {
        axios.post(Constants.BACKEND_SERVER.URL + `/analytics/read/time/`, {
            editor_id: localStorage.getItem('226UserId')
        })
            .then((response) => {
                console.log(response)
                let labels = [];
                let data = [];

                for(let i = 0; i < response.data.length; i++) {
                    labels.push(response.data[i].time);
                    data.push(response.data[i].count);
                }

                this.setState({
                    labels: labels,
                    data: data
                });
            }).catch((err) => {
            console.log(err);
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
                < Bar data={data} />
            </div>
        );
    }
}

export default ReadByTimeOfTheDay;