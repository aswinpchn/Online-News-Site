// SJSU CMPE 226 Fall 2019 TEAM1

import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Logout extends Component {
	render() {
        localStorage.removeItem('226User');
        localStorage.removeItem('226UserId');
        localStorage.removeItem('226UserType');
		let RedirectVar = <Redirect to="/frontpage/all" />;
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Logout Component
export default Logout;
