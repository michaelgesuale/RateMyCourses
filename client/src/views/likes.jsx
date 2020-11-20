import React from 'react';
import { DefaultLayout } from '../layouts/default';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link, Redirect } from 'react-router-dom';

export class LikesPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            data: null,
            loved: true, 
		}
	}

	componentDidMount() { 
        fetch('http://localhost:3000/api/getLikes', {
            method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(
				{
					username: this.props.customProps.user.name,
				}
			),
        })
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

        const likedCourses = this.state.data

		return <DefaultLayout
				{ ...this.props }
				content={
					<div className="likes-container">
                        <h2 className="likes-header">Liked Courses</h2>
                        {
                            likedCourses ? (
                                likedCourses.map((course) => {
                                    return <React.Fragment>
                                    <div className="likes-course-name-container" key={ course.name }>
                                        <Link className="liked-course-item-name"
                                            to={{
                                                pathname: `/course/${ course.name }`,
                                                state: {
                                                        course_id: course.course_id
                                                }
                                            }}>{ course.name }</Link>
                                        <div className="liked-course-icon-container" onClick={() => this.handleLovedClick()}>
                                            { this.state.loved ? (
                                                    <FavoriteIcon className="course-icon"/>
                                                ) : (
                                                    <FavoriteBorderIcon className="course-icon"/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <span className="liked-course-item-campus">{ course.campus }</span>
                                </React.Fragment>
                                })
                            ) : (
                                <div className="liked-course-item-campus"><br></br>You haven't liked any courses yet!</div>
                            )
                        }
					</div>
				}
		/>
	}
}

