import React from 'react';
import Button from '@material-ui/core/Button';
import { DefaultLayout } from '../layouts/default';
import { Search } from './../components/search';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {

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
					<div className="home-container">
						<h2 className="home-header">Hello!</h2>
						<Search/>
						<Link to="/catalog">
							<Button className="home-search-button button" variant="contained" color="secondary">Search for your course</Button>
						</Link>
						<Link to="/catalog">
							<Button className="home-catalog-button button" variant="contained" color="primary">Browse our catalog!</Button>
						</Link>
					</div>
				}
		/>
	}
}