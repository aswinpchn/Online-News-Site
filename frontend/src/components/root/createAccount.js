import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            location: '',
            errMsg: '',
            successMsg: '',
            month: 'January',
            date: 1,
            year: 2019,
            readerAccount: true
        };
        this.Months = {
            January: 31,
            February: 28,
            March: 31,
            April: 30,
            May: 31,
            June: 31,
            July: 30,
            August: 31,
            September: 30,
            October: 31,
            November: 30,
            December: 31,
        };
        this.USAstates = {
            "AL": "Alabama",
            "AK": "Alaska",
            "AS": "American Samoa",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FM": "Federated States Of Micronesia",
            "FL": "Florida",
            "GA": "Georgia",
            "GU": "Guam",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MH": "Marshall Islands",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "MP": "Northern Mariana Islands",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PW": "Palau",
            "PA": "Pennsylvania",
            "PR": "Puerto Rico",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VI": "Virgin Islands",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        }
    }

    loginIdChangeHandler = (e) => {
        this.setState({
            loginId: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    monthChangeHandler = (e) => {
        this.setState({
            month: e.target.value,
        });
    }

    dateChangeHandler = (e) => {
        this.setState({
            date: e.target.value,
        });
    }

    toggleToReaderUserType = () => {
        this.setState({
            readerAccount: true
        });
    }

    toggleToEditorUserType = () => {
        this.setState({
            readerAccount: false
        });
    }

    isLeapYear = (year) => ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0))

    yearChangeHandler = (e) => {
        this.setState({
            year: e.target.value,
        });
        if (this.isLeapYear(e.target.value)) {
            this.Months.February = 29;
        } else {
            this.Months.February = 28;
        }
    }

    submitLogin = (e) => {

    }

    render() {
        const MonthsOption = [];
        const DateOption = [];
        const YearsOption = [];
        const LocationsOption = [];

        for (const month in this.Months) {
            MonthsOption.push(<option value={month}>{month}</option>);
        }
        for (let date = 1; date <= this.Months[this.state.month]; date += 1) {
            DateOption.push(<option value={date}>{date}</option>);
        }
        for (let year = 2006; year >= 1899; year -= 1) {
            YearsOption.push(<option value={year}>{year}</option>);
        }
        for (const state in this.USAstates) {
            LocationsOption.push(<option value={state}>{state + " - " + this.USAstates[state]}</option>);
        }

        if (this.state.readerAccount) {
            var userInformation = [
                <div>Date of birth</div>,
                <div className="row form-group">
                    <div className="col-md-5">
                        <select className="form-control" onChange={this.monthChangeHandler} value={this.state.month}>
                            {MonthsOption}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" onChange={this.dateChangeHandler} value={this.state.date}>
                            {DateOption}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-control" onChange={this.yearChangeHandler} value={this.state.year}>
                            {YearsOption}
                        </select>
                    </div>
                </div>,
                <div>Sex</div>,
                <div className="form-group">
                    <select className="form-control" onChange={this.monthChangeHandler} value={this.state.month}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>,
                <div>Location</div>,
                <div className="form-group">
                    <select className="form-control" onChange={this.monthChangeHandler} value={this.state.month}>
                        {LocationsOption}
                    </select>
                </div>
            ]
        }

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />

                    <div className="row">
                        <div className="col-md-4 offset-md-4 p-5 shadow">
                            <h5 className="text-center font-weight-bolder">Create Account</h5>
                            <div class="row">
                                <div class="col-md-6 p-2 bg-secondary text-white text-center" onClick={this.toggleToReaderUserType}>Reader account</div>
                                <div class="col-md-6 p-2 bg-secondary text-white text-center" onClick={this.toggleToEditorUserType}>Editor account</div>
                            </div>
                            <div className="mt-3">
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Name</label>
                                    <input type="text" id="userLoginID" onChange={this.loginIdChangeHandler} value={this.state.loginId} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Email</label>
                                    <input type="text" id="userLoginID" onChange={this.loginIdChangeHandler} value={this.state.loginId} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" id="userPassword" onChange={this.passwordChangeHandler} value={this.state.password} className="form-control" required />
                                </div>
                                {userInformation}
                                <div className="text-center">
                                    <p className="text-danger">
                                        {' '}
                                        {this.state.errMsg}
                                        {' '}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="submit" id="userLogin" onClick={this.submitLogin} className="form-control bg-primary text-white" value="Create account" />
                                </div>
                                <div className="panel text-center">
                                    <p>or</p>
                                    <p>
                                        Already have an account? <Link to="/login">Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;