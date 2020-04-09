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
				if (response.data !== "") {
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
				<div className="p-5 shadow">
					<h5 className="text-center font-weight-bolder">Notifications</h5>
					{notifications.map((notification) => {
						console.log(notification)
						if (notification.status === 'COMMENTS') {
							return (
								<p>
									<span className="font-italic"> {notification.name} </span> commented on article
									<a className="font-weight-bold text-dark" href={`/article/${notification.editor_id}/${notification.article_id}`}>
										<span> {notification.headlines} </span>
									</a>
									at
									<span className="font-italic"> {notification.time} </span>
								</p>
							);
						} else if (notification.status === 'MODIFIED') {
							return (
								<p>
									An article
									<a className="font-weight-bold text-dark" href={`/article/${notification.editor_id}/${notification.article_id}`}>
										<span> {notification.headlines} </span>
									</a>
									has been modified at
									<span className="font-italic"> {notification.time} </span>
								</p>
							);
						} else if (notification.status === 'NEW') {
							return (
								<p>
									A new article
									<a className="font-weight-bold text-dark" href={`/article/${notification.editor_id}/${notification.article_id}`}>
										<span> {notification.headlines} </span>
									</a>
									has been posted at
									<span className="font-italic"> {notification.time} </span>
								</p>
							);
						}
						return <div></div>;
					})}
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserNotifications;
