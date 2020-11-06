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

	componentWillMount() { 
		fetch('http://localhost:3000/api/courses')
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data})
			}).catch(error => {console.error(error)});
	}

	render() {
		var courses = [
			{
				name: 'CSC490',
				campus: 'University of Toronto Mississauga',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tellus ac mi auctor dictum. Nunc nec ligula est. Morbi sollicitudin ipsum a turpis consequat consequat. Duis volutpat, urna a commodo imperdiet, libero libero lacinia lectus, quis scelerisque enim sapien non libero. Aliquam at lorem et tellus aliquet blandit. Suspendisse lacinia accumsan dui, eget convallis quam pulvinar id. Pellentesque convallis tempor imperdiet. Praesent imperdiet ultrices orci, quis imperdiet magna venenatis ac. Pellentesque sagittis mi orci, et varius mauris iaculis non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque at mauris ut risus sodales consectetur. Mauris dictum ultricies leo, hendrerit auctor erat auctor in. Ut ullamcorper pulvinar felis, et pulvinar ante laoreet ac.',
				overall_rating: 4
			},
			{
				name: 'MAT202',
				campus: 'University of Toronto Mississauga',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tellus ac mi auctor dictum. Nunc nec ligula est. Morbi sollicitudin ipsum a turpis consequat consequat. Duis volutpat, urna a commodo imperdiet, libero libero lacinia lectus, quis scelerisque enim sapien non libero. Aliquam at lorem et tellus aliquet blandit. Suspendisse lacinia accumsan dui, eget convallis quam pulvinar id. Pellentesque convallis tempor imperdiet. Praesent imperdiet ultrices orci, quis imperdiet magna venenatis ac. Pellentesque sagittis mi orci, et varius mauris iaculis non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque at mauris ut risus sodales consectetur. Mauris dictum ultricies leo, hendrerit auctor erat auctor in. Ut ullamcorper pulvinar felis, et pulvinar ante laoreet ac.',
				overall_rating: 1
			},
			{
				name: 'MAT232',
				campus: 'University of Toronto Mississauga',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tellus ac mi auctor dictum. Nunc nec ligula est. Morbi sollicitudin ipsum a turpis consequat consequat. Duis volutpat, urna a commodo imperdiet, libero libero lacinia lectus, quis scelerisque enim sapien non libero. Aliquam at lorem et tellus aliquet blandit. Suspendisse lacinia accumsan dui, eget convallis quam pulvinar id. Pellentesque convallis tempor imperdiet. Praesent imperdiet ultrices orci, quis imperdiet magna venenatis ac. Pellentesque sagittis mi orci, et varius mauris iaculis non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque at mauris ut risus sodales consectetur. Mauris dictum ultricies leo, hendrerit auctor erat auctor in. Ut ullamcorper pulvinar felis, et pulvinar ante laoreet ac.',
				overall_rating: 3
			},
			{
				name: 'CSC207',
				campus: 'University of Toronto Mississauga',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tellus ac mi auctor dictum. Nunc nec ligula est. Morbi sollicitudin ipsum a turpis consequat consequat. Duis volutpat, urna a commodo imperdiet, libero libero lacinia lectus, quis scelerisque enim sapien non libero. Aliquam at lorem et tellus aliquet blandit. Suspendisse lacinia accumsan dui, eget convallis quam pulvinar id. Pellentesque convallis tempor imperdiet. Praesent imperdiet ultrices orci, quis imperdiet magna venenatis ac. Pellentesque sagittis mi orci, et varius mauris iaculis non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque at mauris ut risus sodales consectetur. Mauris dictum ultricies leo, hendrerit auctor erat auctor in. Ut ullamcorper pulvinar felis, et pulvinar ante laoreet ac.',
				overall_rating: 5
			}
		]

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

		console.log(data);

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

