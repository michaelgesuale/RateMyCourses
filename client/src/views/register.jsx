import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { DefaultLayout } from '../layouts/default';
import { Link, Redirect } from 'react-router-dom';

export class RegisterPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			showConfirmPasswordError: false,
			showWhiteSpaceUsernameError: false
		};
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/test')
			.then(response => response.json())
			.catch(error => {console.error(error)});
	}

	handleRegister(event){
		event.preventDefault();
		let isError = false;
		const whitespaceUsernameError = !/^\S+$/.test(this.state.username);
		this.setState({ showWhiteSpaceUsernameError: whitespaceUsernameError });
		isError = isError || whitespaceUsernameError;
		
		const confirmPasswordMismatch = this.state.password !== this.state.confirmPassword;
		this.setState({ showConfirmPasswordError: confirmPasswordMismatch });
		isError = isError || confirmPasswordMismatch;

		if (isError){
			return;
		}
		
		fetch('http://localhost:3000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(
				{
					username: this.state.username,
					email: this.state.email,
					password: this.state.password
				}
			),
		}).then(response => response.json())
		.then(data => {
			this.props.customProps.handleLogin(data.email, data.username);
        }).catch(error => console.log(error));
	}

	render() {
		if (this.props.customProps.user) {
			return <Redirect to="/"/>;
		}
		return <DefaultLayout 
				{ ...this.props }
				hideSearch={ true }
				content={
					<div className="register-container">
						<h2 className="register-header">Create an account</h2>
                        <form id="register-form" className="register-form" autoComplete="off" onSubmit={this.handleRegister}>
                            <TextField required id="username-field" label="Username"  pattern="[a-z]" onChange={(event) => this.setState({username: event.target.value})}/>
							{ this.state.showWhiteSpaceUsernameError && 
                                <Alert onClose={() => {this.setState({ showWhiteSpaceUsernameError: false })}} severity="error">Username must not contain spaces</Alert>
                        	}
                            <TextField required id="email-field" type="email" label="University e-mail" onChange={(event) => this.setState({email: event.target.value})}/>
                            <TextField required id="password-field" type="password" label="Password" onChange={(event) => this.setState({password: event.target.value})}/>
							<TextField required id="confirm-password-field" type="password" label="Confirm Password" onChange={(event) => this.setState({confirmPassword: event.target.value})}/>
							{ this.state.showConfirmPasswordError && 
                                <Alert onClose={() => {this.setState({ showConfirmPasswordError: false })}} severity="error">Confirm Password doesn't match Password</Alert>
                        	}
						</form>
						<Button type="submit" form="register-form" className="register-button button" variant="contained" color="primary">Register</Button>

                        <Link to="/login">
							<span className="login-text">Already have an account? Click here to login!</span>
						</Link>
					</div>
				}
		/>
	}
}