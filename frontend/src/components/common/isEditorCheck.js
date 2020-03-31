import React, { Component } from 'react';
import { Redirect } from 'react-router';

class IsEditor extends Component {
	render() {
        let RedirectVar
        if (localStorage.getItem('226UserType') === "User") {
            RedirectVar = <Redirect to="/frontpage/all" />;
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
