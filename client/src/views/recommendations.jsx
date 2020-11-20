import React from 'react';
import { DefaultLayout } from '../layouts/default';
import { Courses } from './../components/courses';
import { Redirect } from 'react-router-dom';

export class RecommendationsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            recommendedCourses: [],
            loved: true, 
		}
	}

	componentDidMount() { 
		fetch(`http://localhost:3000/api/recommendations/${this.props.customProps.user.email}`)
			.then(response => response.json())
			.then(courses => {
				this.setState({ recommendedCourses: courses })
			}).catch(error => {console.error(error)});
    }

    handleLovedClick() {
        const loved = !this.state.loved;
        this.setState({ loved });
    }
    
	render() {
        if (!this.props.customProps.user) {
            return <Redirect to="/"/>;
        }
        const {
			recommendedCourses
		} = this.state;

        return <DefaultLayout
            { ...this.props }
            content={
                <div className="recommendations-container">
                    <h2 className="recommendations-header">Recommended Courses Based On Your Likes</h2>
                        {
                            recommendedCourses.length ? (
                                <Courses courses={ recommendedCourses }/>
                            ) : (
                                <div className="recommendations-course-item-campus"><br></br>No recommended courses yet!</div>
                            )
                        }
                </div>
            }
        />  
	}
}

