import React from 'react';
import Cookies from 'js-cookie';
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
			showWhiteSpaceUsernameError: false,
			showUsernameTakenError: false,
			showEmailTakenError: false
		};
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/test')
			.then(response => response.json())
			.catch(error => {console.error(error)});
	}

	handleRegistrationResponse(data){
		if (data.status === 400){
			data.json().then(data => {
				if (data.detail.includes("email")){
					this.setState({ showEmailTakenError: true });
				} else if (data.detail.includes("username")){
					this.setState({ showUsernameTakenError: true });
				}
			});
		} else {
			data.json().then(data => {
				this.props.customProps.handleLogin(data);
			})
		}
	}

	handleRegister(event){
		event.preventDefault();
		this.setState({ showUsernameTakenError: false });
		this.setState({ showEmailTakenError: false });

		let isError = false;
		const whitespaceUsernameError = !/^\S+$/.test(this.state.username);
		this.setState({ showWhiteSpaceUsernameError: whitespaceUsernameError });
		isError = whitespaceUsernameError;
		
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
		}).then(data => {
			this.handleRegistrationResponse(data);
        }).catch(error => console.log(error));
	}

	render() {
		if (this.props.customProps.user) {
			return <Redirect to={{
                pathname: this.props.location.state.prevPage,
                state: {
					course_id: Cookies.get('course_id'), // For course page
					courseName: Cookies.get('courseName') // For course search in catalog
				}
            }}/>
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
							{ this.state.showUsernameTakenError && 
                                <Alert onClose={() => {this.setState({ showUsernameTakenError: false })}} severity="error">Username is taken</Alert>
                        	}
                            <TextField required id="email-field" type="email" label="University e-mail" onChange={(event) => this.setState({email: event.target.value})}/>
							{ this.state.showEmailTakenError && 
                                <Alert onClose={() => {this.setState({ showEmailTakenError: false })}} severity="error">E-mail is already registered</Alert>
                        	}
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