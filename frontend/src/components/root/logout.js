import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Logout extends Component {
	render() {
        localStorage.removeItem('226User');
        localStorage.removeItem('226UserId');
        localStorage.removeItem('226UserType');
		let RedirectVar = <Redirect to="/all" />;
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Logout Component
export default Logout;
