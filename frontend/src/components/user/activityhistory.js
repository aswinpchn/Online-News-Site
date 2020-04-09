import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Constants from '../../utils/constants';
import axios from 'axios';
import Navigation from '../common/navigation';
import IsReaderCheck from '../common/isReaderCheck';
class UserActivityHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [],
		};
	}

	componentDidMount() {
		axios
			.get(
				Constants.BACKEND_SERVER.URL +
				`/users/activity/${localStorage.getItem('226UserId')}`
			)
			.then((response) => {
				console.log(response.data);
				this.setState({ history: response.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}


	render() {
		const history = this.state.history;
		return (
			<div>
				<IsReaderCheck />

				<div class="bg-white pl-5 pr-5 pb-5">
					<Header />
					<Navigation />
					<div className="row">
						<div className="col-md-6 offset-md-3 p-5 shadow">
							<h5 className="text-center font-weight-bolder">History</h5>
							{history.map((activity) => {
								if (activity.type === 'commented') {
									return (
										<p>
											<i style={{fontSize : '24px'}} class='fas'>&#xf4ad;</i>
											{' '}
											You commented on <b>{activity.content}</b> at{' '}
											<b>{activity.time}</b>
										</p>
									);
								} else if (activity.type === 'liked') {
									return (
										<p>
											<i style={{fontSize : '24px'}} class='fas'>&#xf164;</i>
											{' '} You liked <b>{activity.content}</b> at{' '}
											<b>{activity.time}</b>
										</p>
									);
								} else if (activity.type === 'subscribed') {
									return (
										<p>
											<i style={{fontSize : '24px'}} class='fas'>&#xf02e;</i>
											{' '}
											You subscribed to <b>{activity.content}</b> at{' '}
											<b>{activity.time}</b>
										</p>
									);
								} else if (activity.type === 'viewed') {
									return (
										<p>
											<i style={{fontSize : '24px'}} class='fab'>&#xf4d5;</i>
											{' '}
											You viewed <b>{activity.content}</b> at{' '}
											<b>{activity.time}</b>
										</p>
									);
								}
								return <div></div>;
							})}
						</div>
					</div>
					<Footer />
				</div>

			</div>
		);
	}
}

export default UserActivityHistory;
