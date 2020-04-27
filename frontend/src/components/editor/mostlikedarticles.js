// SJSU CMPE 226 Fall 2019 TEAM1

import React, { Component } from 'react';
import Constants from '../../utils/constants';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

class MostLikedArticles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: []
        };
    }

    componentDidMount() {
        axios.get(Constants.BACKEND_SERVER.URL + `/analytics/liked/${localStorage.getItem('226UserId')}`)
          .then((response) => {
              console.log(response)
              let labels = [];
              let data = [];
              for(let i = 0; i < response.data.length; i++) {
                  labels.push(response.data[i].headlines.substr(0, 25));
                  data.push(response.data[i].likeCount);
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
                label: "Most Liked Articles",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.state.data,
            }]
        };

        return (
            <div>
                <h2>Most Liked Articles</h2>
                < Bar data={data} />
            </div>
        );
    }
}

export default MostLikedArticles;