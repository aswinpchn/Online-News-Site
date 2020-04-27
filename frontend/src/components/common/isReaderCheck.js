// SJSU CMPE 226 Fall 2019 TEAM1

import React, { Component } from 'react';
import { Redirect } from 'react-router';

class IsReader extends Component {
	render() {
        let RedirectVar
        if (localStorage.getItem('226UserType') === "Editor") {
            RedirectVar = <Redirect to="/editor" />;
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
// export IsReader Component
export default IsReader;
