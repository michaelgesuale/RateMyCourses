import React from 'react';
import { DefaultLayout } from '../layouts/default';
import { Courses } from './../components/courses';
import { Filters } from './../components/filters';

export class CatalogPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: null     
		}
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/courses')
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data})
			}).catch(error => {console.error(error)});
	}

	render() {
		const filters = {
			'Subject': [
				'Biology',
				'Chemistry',
				'Physics',
				'Math',
				'Computer Science',
				'Art History',
				'Sociology'
			],
			'University': [
				'Learning U',
				'UTM',
				'WutUni',
				'University of Toronto'
			],
			'Year': [
				'1st year',
				'2nd year',
				'3rd year',
				'4th year'
			]
		}

		const subjects = [
			'Biology',
			'Chemistry',
			'Physics',
			'Math',
			'Computer Science',
			'Art History',
			'Sociology'
		]

		const universities = [
			'Learning U',
			'UTM',
			'WutUni',
			'University of Toronto'
		]

		const years = [
			'1st year',
			'2nd year',
			'3rd year',
			'4th year'
		]

		const {
			data
		} = this.state;

		
		
		var courses = [];

		if (data != null) {
			courses = data;
		}

		return <DefaultLayout
				{ ...this.props }
				content={
					<div className="catalog-container">
						<div className="catalog-left-container">
							<Filters filters={ filters }/>
						</div>
						<div className="catalog-right-container">
							<Courses courses={ courses }/>
						</div>
					</div>
				}
		/>
	}
}

