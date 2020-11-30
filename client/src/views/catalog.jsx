import React from 'react';
import Cookies from 'js-cookie';
import { DefaultLayout } from '../layouts/default';
import { Courses } from './../components/courses';
import { Filters } from './../components/filters';

export class CatalogPage extends React.Component {

	constructor(props) {
		super(props);
		this.yearsMap = {
			'1st-year': 1,
			'2nd-year': 2,
			'3rd-year': 3,
			'4th-year': 4
		}

		this.sortCourses = this.sortCourses.bind(this);
		this.filterCourses = this.filterCourses.bind(this);

		this.state = {
			data: null,
			courses: [],
			sortBy: "Overall rating"
		}
	}

	componentDidMount() {
		const locationState = this.props.location.state
		let apiToFetch;
		if (locationState && locationState.courseName){
			Cookies.set('courseName', locationState.courseName)
			apiToFetch = `http://localhost:3000/api/search/${locationState.courseName}`;
		} else{
			Cookies.remove('courseName');
			apiToFetch = 'http://localhost:3000/api/courses';
		}
		fetch(apiToFetch)
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data, courses: data})
			}).catch(error => {console.error(error)});
	}

	componentDidUpdate(prevProps, prevState) {
		const locationState = this.props.location.state
		if (prevProps.location.state === locationState) {
			return
		}
		let apiToFetch;
		if (locationState && locationState.courseName){
			Cookies.set('courseName', locationState.courseName)
			apiToFetch = `http://localhost:3000/api/search/${locationState.courseName}`;
		} else {
			Cookies.remove('courseName');
			apiToFetch = 'http://localhost:3000/api/courses';
		}
		fetch(apiToFetch)
			.then(response => response.json())
			.then(data => {this.setState({ courses: data })
			}).catch(error => {console.error(error)});
	}

	filterCourses(selectedFilters) {
		var filters = {"university" : [], "subject": [], "year": []};
		
		selectedFilters.map(e => {  
			const keyValuePair = e.split(":");
			const key = keyValuePair[0];
			
			if (key == "year") {
				filters[keyValuePair[0]].push(this.yearsMap[keyValuePair[1]]);	
			} else {
				filters[keyValuePair[0]].push(keyValuePair[1]);
			}
		})

		var newCourses = this.state.data.filter(e => {
			return(
			(filters["university"].length == 0 || filters["university"].includes(e.university_name.replace(/ /g, '-').toLowerCase())) &&
			(filters["subject"].length == 0 || filters["subject"].includes(e.subject.replace(/ /g, '-').toLowerCase())) &&
			(filters["year"].length == 0 || filters["year"].includes(e.year)))
		})

		if (this.state.sortBy == "Overall rating") {
			newCourses.sort(this.ratingSortFunction);	
		} else if (this.state.sortBy == "Course code") {
			newCourses.sort(this.courseCodeSortFunction);
		}

		this.setState({courses: newCourses})
	}

	ratingSortFunction(a,b) {
		return a.overall_rating < b.overall_rating ? 1 : -1;
	}

	courseCodeSortFunction(a,b) {
		return a.name < b.name ? -1 : 1;
	}

	sortCourses(sortBy) {
		var courses = this.state.courses;

		if (sortBy == "Overall rating") {
			courses.sort(this.ratingSortFunction);	
		} else if (sortBy == "Course code") {
			courses.sort(this.courseCodeSortFunction);
		}
		
		this.setState({ courses: courses, sortBy: sortBy})
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
				'Ryerson University',
				'University of Toronto',
				'University of Waterloo',
			],
			'Year': [
				'1st year',
				'2nd year',
				'3rd year',
				'4th year'
			]
		}

		const {
			courses
		} = this.state;

		return <DefaultLayout
				{ ...this.props }
				content={
					<div className="catalog-container">
						<div className="catalog-left-container">
							<Filters filters={ filters } filterCourses={this.filterCourses}/>
						</div>
						<div className="catalog-right-container">
							<Courses courses={ courses } sortFunc={this.sortCourses}/>
						</div>
					</div>
				}
		/>
	}
}

