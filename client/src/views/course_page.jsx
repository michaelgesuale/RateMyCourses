import React from 'react';
import DefaultLayout from '../layouts/default';

export default class CoursePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		fetch('http://localhost:3000/api/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(
				{
					course_id: this.props.course_id,
					user_id: this.props.user,
					user_comment: form.user_comment.value,
					workload: form.workload.value,
					enjoyment: form.enjoyment.value,
					difficulty: form.difficulty.value,
					usefulness: form.usefulness.value
				}
			),
		}).then(response => this.setState({ data: response }))
			.catch(error => console.log(error));
	}

	render() {
		return <DefaultLayout
			content={
				<form onSubmit={this.handleSubmit}>
					<label>Comment
						<input name="user_comment" type="text" />
					</label>
					<br/>
					<label>Workload
						<input name="workload" type="number" />
					</label>
					<br/>
					<label>Enjoyment
						<input name="enjoyment" type="number" />
					</label>
					<br/>
					<label>Difficulty
						<input name="difficulty" type="number" />
					</label>
					<br/>
					<label>Usefulness
						<input name="usefulness" type="number" />
					</label>
					<br/>
					<input type="submit" value="Post Review"/>
				</form>
			}
		/>
	}
}