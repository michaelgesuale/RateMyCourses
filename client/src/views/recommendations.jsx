import React from 'react';
import { DefaultLayout } from '../layouts/default';
import { LabelRating } from './../components/labelRating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link, Redirect } from 'react-router-dom';

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
                                recommendedCourses.map((course) => {
                                    return <React.Fragment>
                                    <div className="recommendations-course-name-container" key={ course.name }>
                                        <Link className="recommendations-course-item-name"
                                            to={{
                                                pathname: `/course/${ course.name }`,
                                                state: {
                                                        course_id: course.course_id
                                                }
                                            }}>{ course.name }</Link>
                                        <div className="courses-item-rating"><LabelRating rating={ course.overall_rating }></LabelRating></div>
                                    </div>
                                    <span className="recommendations-course-item-campus">{ course.campus }</span>
                                    <span className="courses-item-description">{ course.description }</span>
                                </React.Fragment>
                                })
                            ) : (
                                <div className="recommendations-course-item-campus"><br></br>No recommended courses yet!</div>
                            )
                        }
                </div>
            }
        />  
	}
}

