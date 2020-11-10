import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DefaultLayout } from '../layouts/default';
import { Link } from 'react-router-dom';

export class RegisterPage extends React.Component {

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
					<div className="register-container">
						<h2 className="register-header">Create an account</h2>
                        <form className="register-form" noValidate autoComplete="off">
                            <TextField required id="username-field" label="Username" />
                            <TextField required id="email-field" label="University e-mail" />
                            <TextField required id="password-field" label="Password" />
                        </form>
						<Button className="register-button button" variant="contained" color="primary">Register</Button>

                        <Link to="/login">
							<span className="login-text">Already have an account? Click here to login!</span>
						</Link>
					</div>
				}
		/>
	}
}