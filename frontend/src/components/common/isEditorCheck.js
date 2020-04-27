// SJSU CMPE 226 Fall 2019 TEAM1

import React, { Component } from 'react';
import { Redirect } from 'react-router';

class IsEditor extends Component {
	render() {
        let RedirectVar
        if (localStorage.getItem('226UserType') === "User") {
            RedirectVar = <Redirect to="/frontpage/all" />;
        } else if (!localStorage.getItem('226UserType')) {
            RedirectVar = <Redirect to={`/login?${window.location.pathname}`} />;
        }
        
		return (
			<div>
				{ RedirectVar }
			</div>
		);
	}
}
// export IsEditor Component
export default IsEditor;
