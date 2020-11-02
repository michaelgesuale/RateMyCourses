import React from 'react';
import Button from '@material-ui/core/Button';
import DefaultLayout from '../layouts/default';
import Search from './../components/search';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {

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

		var props = {
			user: {
				name: 'Sally'
			}
		}

		const courses = [
			{
				// course_id: 0,
				name: 'CSC490',
				campus: 'University of Toronto Mississauga',
				description: 'lorem ipsum',
				year: '2020',
				subject: 'CSC'
			}
		]

		const course = {
			// course_id: 0,
			name: 'CSC490',
			campus: 'University of Toronto Mississauga',
			description: 'lorem ipsum',
			year: '2020',
			subject: 'CSC'
		}

		const overallRating = {
			overall: 1,
			workload: 1,
			enjoyment: 1,
			difficulty: 1,
			usefulness: 1
		}

		const reviews = {
			// review_id SERIAL PRIMARY KEY,
			// course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
			// user_id text REFERENCES users(username) ON DELETE CASCADE,
			userComment: 'lorem ipsum',
			overall: 4,
			workload: 3,
			enjoyment: 5,
			difficulty: 3,
			usefulness: 5,
			likes: 2,
		}

		const {
			data
		} = this.state;

		return <DefaultLayout 
				user={ props.user }
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