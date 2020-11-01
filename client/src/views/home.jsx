import React from 'react';
import DefaultLayout from '../layouts/default.jsx';
import Button from '@material-ui/core/Button';


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
      .then(data => 
{
this.setState({ data: data})
})
      .catch(error => {console.error(error)});
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


		return (<>
{this.state.data ?
		<DefaultLayout 
			user={props.user}
			hideSearch={true}
			content={
				<React.Fragment>
					<div>Hello{props.user ? ' ' + props.user.name : ''}</div>
				<p>{this.state.data.name}</p>
<Button variant="contained" color="primary">    Primary</Button>
<Button variant="contained">Default</Button>			
	</React.Fragment>}/>

 :<DefaultLayout 
			user={props.user}
			hideSearch={true}
			content={
				<React.Fragment>
					<div>Hello{props.user ? ' ' + props.user.name : ''}</div>
<Button variant="contained" color="primary">    Primary</Button>
<Button variant="contained">Default</Button>			
	</React.Fragment>}/>
}</ >
			);

}
}


