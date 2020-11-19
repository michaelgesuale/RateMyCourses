import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DefaultLayout } from '../layouts/default';
import { Link, Redirect } from 'react-router-dom';

export class RegisterPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: ''    
		};
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/test')
			.then(response => response.json())
			.catch(error => {console.error(error)});
	}

	handleRegister(){
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
			return <Redirect to="/recommendations"/>;
		}
		return <DefaultLayout 
				{ ...this.props }
				hideSearch={ true }
				content={
					<div className="register-container">
						<h2 className="register-header">Create an account</h2>
                        <form className="register-form" noValidate autoComplete="off">
                            <TextField required id="username-field" label="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                            <TextField required id="email-field" label="University e-mail" onChange={(event) => this.setState({email: event.target.value})}/>
                            <TextField required id="password-field" label="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                        </form>
						<Button className="register-button button" variant="contained" color="primary" onClick={() => this.handleRegister()}>Register</Button>

                        <Link to="/login">
							<span className="login-text">Already have an account? Click here to login!</span>
						</Link>
					</div>
				}
		/>
	}
}