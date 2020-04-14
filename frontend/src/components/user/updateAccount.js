import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Constants from '../../utils/constants';
import axios from 'axios';
import Navigation from '../common/navigation';
import IsReaderCheck from '../common/isReaderCheck';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: null,
            sex: 'M',
            location: 'AL',
            errMsg: '',
            successMsg: '',
            month: 1,
            date: 1,
            year: 2006,
        };
        this.Months = {
            1: ['January', 31],
            2: ['February', 28],
            3: ['March', 31],
            4: ['April', 30],
            5: ['May', 31],
            6: ['June', 31],
            7: ['July', 30],
            8: ['August', 31],
            9: ['September', 30],
            10: ['October', 31],
            11: ['November', 30],
            12: ['December', 31]
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

    componentDidMount() {
        axios.get(Constants.BACKEND_SERVER.URL + `/users/profile/${localStorage.getItem('226UserId')}`)
        .then((response) => {
            console.log(response.data)

            let year = response.data.DOB.substr(0, 4);
            let month = response.data.DOB.substr(5, 2);
            let date = response.data.DOB.substr(8, 2);

            this.setState({
                name: response.data.name,
                email: response.data.email,
                sex: response.data.sex,
                location: response.data.location,
                year: Number(year) ,
                month: Number(month),
                date: Number(date)
            });
        });
    }

    IsValueEmpty = (Value) => {
        if (Value == null) {
            return false;
        }
        if (''.localeCompare(Value.replace(/\s/g, '')) === 0) return true;
        return false;
    }

    IsValidEmailID = (EmailID) => {
        if (EmailID == null) {
            return true;
        }
        if (EmailID.match(/^[a-z][a-z0-9._]*[@][a-z]+[.][a-z]+$/)) {
            return true;
        }
        return false;
    }

    IsValidName = (Name) => {
        if (Name.match(/^[a-zA-Z][a-zA-Z ]+$/)) {
            return true;
        }
        return false;
    }

    loginIdChangeHandler = (e) => {
        this.setState({
            loginId: e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value,
        });
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

    sexChangeHandler = (e) => {
        this.setState({
            sex: e.target.value,
        });
    }

    locationChangeHandler = (e) => {
        this.setState({
            location: e.target.value,
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

    updateAccount = (e) => {
        e.preventDefault();
        if (!this.IsValidName(this.state.name)) {
            this.setState({
                errMsg: "Name has to begin with a alphabet"
            })
            return;
        }
        if (!this.IsValidEmailID(this.state.email)) {
            this.setState({
                errMsg: "Not a valid email ID"
            })
            return;
        }
        if (this.IsValueEmpty(this.state.password)) {
            this.setState({
                errMsg: "Password cannot be empty"
            })
            return;
        }
        const usrData = {
            userId: localStorage.getItem('226UserId'),
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
        usrData.DOB = this.state.year + "-" + this.state.month + "-" + this.state.date;
        usrData.sex = this.state.sex;
        usrData.location = this.state.location;
        // return;
        axios.put(Constants.BACKEND_SERVER.URL + "/users/update", usrData)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        successMsg: 'Information updated successfully',
                        errMsg: '',
                    });
                } else if (response.status === 409) {
                    this.setState({
                        successMsg: '',
                        errMsg: 'Account with this email already exists',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    errMsg: 'Account with this email already exists',
                    successMsg: '',
                });
            });

    }

    render() {
        const MonthsOption = [];
        const DateOption = [];
        const YearsOption = [];
        const LocationsOption = [];
        for (const month in this.Months) {
            MonthsOption.push(<option value={month}>{this.Months[month][0]}</option>);
        }
        for (let date = 1; date <= this.Months[this.state.month][1]; date += 1) {
            DateOption.push(<option value={date}>{date}</option>);
        }
        for (let year = 2006; year >= 1899; year -= 1) {
            YearsOption.push(<option value={year}>{year}</option>);
        }
        for (const state in this.USAstates) {
            LocationsOption.push(<option value={state}>{state + " - " + this.USAstates[state]}</option>);
        }

        return (
            <div>
                <IsReaderCheck />

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />

                    <div className="row">
                        <div className="col-md-6 offset-md-3 p-5 shadow">
                            <h5 className="text-center font-weight-bolder">Update Account</h5>
                            <div className="mt-3">
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Name</label>
                                    <input type="text" id="userLoginID" onChange={this.nameChangeHandler} value={this.state.name} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userLoginID">Email</label>
                                    <input type="text" id="userLoginID" onChange={this.emailChangeHandler} value={this.state.email} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" id="userPassword" onChange={this.passwordChangeHandler} value={this.state.password} className="form-control" required />
                                </div>
                                <div>Date of birth</div>
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
                                </div>
                                <div>Sex</div>
                                <div className="form-group">
                                    <select className="form-control" onChange={this.sexChangeHandler} value={this.state.sex}>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                                <div>Location</div>
                                <div className="form-group">
                                    <select className="form-control" onChange={this.locationChangeHandler} value={this.state.location}>
                                        {LocationsOption}
                                    </select>
                                </div>
                                <div className="text-center">
                                    <p className="text-danger">
                                        {' '}
                                        {this.state.errMsg}
                                        {' '}
                                    </p>
                                    <p className="text-success">
                                        {' '}
                                        {this.state.successMsg}
                                        {' '}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="submit" id="userLogin" onClick={this.updateAccount} className="form-control bg-primary text-white" value="Update information" />
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