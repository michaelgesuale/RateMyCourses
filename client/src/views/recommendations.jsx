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
            data: null,
            loved: true, 
		}
	}

	componentDidMount() { 
		fetch('http://localhost:3000/api/test')
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data})
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
        const recommendedCourses1 = []
        const recommendedCourses = [
            {
                name: 'CSC490',
                campus: 'University of Toronto Mississauga',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed fermentum purus. Cras quam metus, dictum quis dolor quis, sagittis consectetur libero. Suspendisse lacinia vehicula dictum. Vivamus molestie consectetur libero at ultrices. Morbi tempus odio turpis, ac aliquet risus vehicula a. Quisque eu lacus eget turpis interdum interdum. Phasellus ac laoreet nibh. Sed et risus dictum, consectetur elit eu, commodo lacus. Praesent auctor at mauris sit amet finibus. Nullam bibendum, risus eget lobortis congue, magna nisl finibus justo, ornare aliquet orci nisi non augue. In blandit mollis ex, at sodales neque blandit non. Vivamus quis tellus sed dui faucibus sodales eu sit amet felis. In dignissim semper commodo.',
                overall_rating: 2,
            },
            {
                name: 'CSC207',
                campus: 'University of Toronto Mississauga',
                description: 'hello this is a description for 207',
                overall_rating: 3,
            },
            {
                name: 'CSC108',
                campus: 'University of Toronto Mississauga',
                description: 'hello this is a description for 108',
                overall_rating: 4,
            }
        ]

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

