// SJSU CMPE 226 Fall 2019 TEAM1

import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Root extends Component {
	render() {
		let RedirectVar = '';
		if (this.props.location.pathname === '/') {
			RedirectVar = <Redirect to="/frontpage/all" />;
		}
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Root Component
export default Root;
