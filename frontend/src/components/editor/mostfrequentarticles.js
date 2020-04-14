import React, { Component } from 'react';
import CanvasJSReact from './../common/libs/canvasjs.react';
import Constants from '../../utils/constants';
import axios from 'axios';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





class FrequentArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: [],
            mostReadArticle: [],
        };
        this.state.interval = setInterval(() => {
            this.getFrequentArticles();
        }, 10000)
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentDidMount() {
        this.getFrequentArticles();
    }

    getFrequentArticles = () => {
        axios.get(Constants.BACKEND_SERVER.URL + `/analytics/read/articles/${localStorage.getItem('226UserId')}`)
            .then((response) => {
                //console.log(response);
                this.setState(response.data)
            }).catch((err) => {
                console.log(err);
            })
    }





    render() {
        const graph = this.state.graph;
        // const articles = this.state.mostReadArticle;
        const options = {
            title: {
                text: "Most Frequently Read Articles"
            },
            width: 600,
            height: 400,
            data: [{
                type: "column",
                dataPoints: graph.map((element) => {
                    return {
                        label: element.article_id,
                        y: element.read_count
                    }
                }),
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        )
    }

}

export default FrequentArticles;