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
			<div class="bg-white pl-5 pr-5 pb-5">
				<IsReaderCheck />
				<Header />
				<Navigation />
				<div className="p-5 shadow">
					<h5 className="text-center font-weight-bolder">History</h5>
					{history.map((activity) => {
						let text = "",
							icon = [],
							tag = []
						if (activity.type === 'commented') {
							text = "You commented on"
							icon = <i style={{ fontSize: '24px' }} class='fas'>&#xf4ad;</i>
							tag = <a className="font-weight-bold text-dark" href={`/article/${activity.editor_id}/${activity.article_id}`}>{activity.content}</a>
						} else if (activity.type === 'liked') {
							text = "You liked"
							icon = <i style={{ fontSize: '24px' }} class='fas'>&#xf164;</i>
							tag = <a className="font-weight-bold text-dark" href={`/article/${activity.editor_id}/${activity.article_id}`}>{activity.content}</a>
						} else if (activity.type === 'subscribed') {
							text = "You subscribed to"
							icon = <i style={{fontSize : '24px'}} class='fas'>&#xf02e;</i>
							tag = <a className="font-weight-bold text-dark" href={`/frontpage/${activity.content.toLowerCase()}`}>{activity.content}</a>
						} else if (activity.type === 'viewed') {
							text = "You Read"
							icon = <i style={{ fontSize: '24px' }} class='fab'>&#xf4d5;</i>
							tag = <a className="font-weight-bold text-dark" href={`/article/${activity.editor_id}/${activity.article_id}`}>{activity.content}</a>
						}
						return [
							<p>
								{ icon } {' '} { text } {' '} 
								{ tag }
								{' '} at {' '}
								<span className="font-italic">{activity.time}</span>
							</p>
						];
					})}
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserActivityHistory;
