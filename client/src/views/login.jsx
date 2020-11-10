import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DefaultLayout } from '../layouts/default';
import { Link } from 'react-router-dom';

export class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: null     
		};
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/test')
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data})
			}).catch(error => {console.error(error)});
	}

	render() {
		return <DefaultLayout 
				{ ...this.props }
				hideSearch={ true }
				content={
					<div className="login-container">
						<h2 className="login-header">Log into your account</h2>
                        <form className="login-form" noValidate autoComplete="off">
                            <TextField required id="email-field" label="University e-mail" />
                            <TextField required id="password-field" label="Password" />
                        </form>
						<Button className="login-button button" variant="contained" color="primary">Login</Button>

                        <Link to="/register">
							<span className="register-text">Don't have an account? Click here to register!</span>
						</Link>
					</div>
				}
		/>
	}
}