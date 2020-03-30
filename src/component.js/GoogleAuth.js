import React, { Component } from 'react';

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
				})
				.catch(error => {
					console.log(error, 'Error fetching gapi');
				});
		});
	}

	onAuthChange = () => {
		this.setState({
			isSignedIn : this.auth.isSignedIn.get()
		});
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton () {
		if (this.state.isSignedIn === null) {
			return <div className='ui active centered inline loader' />;
		}
		else if (this.state.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className='ui red google button'>
					<i className='google icon' />
					Sign Out
				</button>
			);
		}
		else {
			return (
				<button onClick={this.onSignInClick} className='ui red google button'>
					<i className='google icon' />
					Sign In with Google
				</button>
			);
		}
	}

	render () {
		return <div>{this.renderAuthButton()}</div>;
	}
}

export default GoogleAuth;
