import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DefaultLayout } from '../layouts/default';
import { Link, Redirect } from 'react-router-dom';

export class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/test')
			.then(response => response.json())
			.catch(error => {console.error(error)});
	}

	authenticate() {
		fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(
				{
					email: this.state.email,
					password: this.state.password
				}
			),
		}).then(response => response.json())
		.then(data => {
			this.props.customProps.handleLogin(data);
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
					<div className="login-container">
						<h2 className="login-header">Log into your account</h2>
                        <form className="login-form" noValidate autoComplete="off">
                            <TextField required id="email-field" label="University e-mail" onChange={(event) => this.setState({ email: event.target.value })}/>
                            <TextField required id="password-field" type="password" label="Password" onChange={(event) => this.setState({ password: event.target.value })}/>
                        </form>
						<Button className="login-button button" variant="contained" color="primary" onClick={() => this.authenticate()}>Login</Button>

                        <Link to="/register">
							<span className="register-text">Don't have an account? Click here to register!</span>
						</Link>
					</div>
				}
		/>
	}
}
