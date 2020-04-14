import React, { Component } from 'react';
import CanvasJSReact from '../common/libs/canvasjs.react';
import Constants from '../../utils/constants';
import axios from 'axios';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class FrequentCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryvalue: [],
            time: new Date().getTime(),
        };
        this.state.interval = setInterval(() => {
            this.getFrequentCategory();
        }, 10000)

    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentDidMount() {

        this.getFrequentCategory();

    }

    getFrequentCategory = () => {
        axios.get(Constants.BACKEND_SERVER.URL + `/analytics/read/category/${localStorage.getItem('226UserId')}`)
            .then((response) => {
                //console.log(response);
                this.setState({
                    categoryvalue: response.data.categoryvalue,
                    get: false
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps) {
        const counter = new Date().getTime() - this.state.time;
        if (counter >= 100) {
            this.getFrequentCategory();
            this.setState({ time: new Date().getTime() });
        }

    }

    render() {
        const graph = this.state.categoryvalue;
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
                        label: element.name,
                        y: element.Read_Count
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

export default FrequentCategory;