import React, { Component } from 'react';
import { getAllByTestId } from '@testing-library/react';

class GoogleAuth extends Component {
	state = { isSignedIn: null };

	componentDidMount () {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId : '72382736363-t4ap5duop7rist08chg5tr6j98bnff4j.apps.googleusercontent.com',
					scope    : 'email'
					// Note - https://developers.google.com/identity/sign-in/web/reference
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = () => {
		this.setState({
			isSignedIn : this.auth.isSignedIn.get()
		});
	};

	renderAuthButton () {
		if (this.state.isSignedIn === null) {
			return <div>I don't know if I am signed In</div>;
		}
		else if (this.state.isSignedIn) {
			return <div>I am currently signed In</div>;
		}
		else {
			return <div>I am not signed In</div>;
		}
	}

	render () {
		return <div>{this.renderAuthButton()}</div>;
	}
}

export default GoogleAuth;
