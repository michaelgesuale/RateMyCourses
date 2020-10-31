const React = require('react');
const DefaultLayout = require('./layouts/default');

const HomePage = (props) => {
	props = {
		title: 'Rate My Courses :)',
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

	return (
		<DefaultLayout 
			title={props.title}
			user={props.user}
			hideSearch={true}
			content={
				<React.Fragment>
					<div>Hello{props.user ? ' ' + props.user.name : ''}</div>
				</React.Fragment>
			}
		/>
	);
}
  
module.exports = HomePage;