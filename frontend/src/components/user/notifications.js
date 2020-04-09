import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Constants from '../../utils/constants';
import axios from 'axios';
import Navigation from '../common/navigation';
import IsReaderCheck from '../common/isReaderCheck';

class UserNotifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		};
	}

	componentDidMount() {
		axios.get(Constants.BACKEND_SERVER.URL + `/users/notifications/${localStorage.getItem('226UserId')}`)
			.then((response) => {
				console.log(response.data);
				if(response.data !== ""){
					this.setState({ notifications: response.data });
				}	
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidUpdate(prevProps) { }

	render() {
		const notifications = this.state.notifications;
		return (
			<div class="bg-white pl-5 pr-5 pb-5">
				<IsReaderCheck />
				<Header />
				<Navigation />
				<div className="row">
					<div className="col-md-6 offset-md-3 p-5 shadow">
						<h5 className="text-center font-weight-bolder">Notifications</h5>
						{notifications.map((notification) => {
							if (notification.status === 'COMMENTS') {
								return (
									<p>	<i style={{fontSize : '24px'}} class='fas'>&#xf4ad;</i>
										{' '}
										
										<b>{notification.name}</b> commented on article{' '}
										<b>{notification.headlines}</b> at{' '}
										<b>{notification.time}</b>
									</p>
								);
							} else if (notification.status === 'MODIFIED') {
								return (
									<p>
										
										<span class="fa-stack fa-sm">
  											<i class="fas fa-sync-alt fa-pulse" style={{color: '#33FF33', fontSize : '10px'}}></i>
  											<i class='far fa-newspaper fa-stack-2x' style={{fontSize:'28px'}}></i>
										</span>
										{' '}
										An article <b>{notification.headlines}</b>
                      					has been modified under the <b>
											{notification.name}
										</b>{' '}
                      					category at<b>{notification.time}</b>
									</p>
								);
							} else if (notification.status === 'NEW') {
								return (
									<p>
										<i style={{fontSize : '24px'}} class='fas'>&#xf1ea;</i>
										{' '}
                      					A new article <b>{notification.headlines}</b> has been
                      					posted under
										<b>{notification.name}</b> at <b>{notification.time}</b>
									</p>
								);
							}
							return <div></div>;
						})}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserNotifications;
