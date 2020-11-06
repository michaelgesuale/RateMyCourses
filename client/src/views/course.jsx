import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/default';
import { LabelRating } from './../components/labelRating';
import { SortButton } from './../components/sortButton';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import PersonIcon from '@material-ui/icons/Person';

export class CoursePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            course: null,
            reviews: null,
            prerequisites: null,
            loved: false,
            helpful: false,
            showReviewPopup: false,
            reviewEnjoyment: 0,
            reviewUsefulness: 0,
            reviewDifficulty: 0,
            reviewWorkload: 0,
            reviewComment: ''
		};
    }

	componentDidMount() {
		fetch(`http://localhost:3000/api/course/1`) //${this.props.course_id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({course: data.course, reviews: data.reviews, prerequisites: data.prereq})
            }).catch(error => console.log(error));
    }

    toggleReviewPopup() {
        const showReviewPopup = !this.state.showReviewPopup;
        this.setState({ showReviewPopup });
    }
    
    handleLovedClick() {
        const loved = !this.state.loved;
        this.setState({ loved });
    }

    handleHelpfulClick() {
        const helpful = !this.state.helpful;
        this.setState({ helpful });
    }

    updateCourseReviews() {
        fetch(`http://localhost:3000/api/course/1`) //${this.props.course_id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({reviews: data.reviews})
            }).catch(error => console.log(error));
    }

	handleReviewSubmit() {
		fetch('http://localhost:3000/api/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(
				{
					course_id: 1, //this.props.course_id,
					username: this.props.user.name,
					user_comment: this.state.reviewComment,
					workload: this.state.reviewWorkload,
					enjoyment: this.state.reviewEnjoyment,
					difficulty: this.state.reviewDifficulty,
					usefulness: this.state.reviewUsefulness
				}
			),
		}).then(response => {
            this.setState({ showReviewPopup: false });
            this.setState({ data: response });
            this.updateCourseReviews();
        }).catch(error => {
            console.log(error);
            this.setState({ showReviewPopup: false });
        });
    }

	render() {
        const {
            course,
            reviews,
            prerequisites
        } = this.state;

		const overallRating = {
			overall: 1,
			workload: 1,
			enjoyment: 1,
			difficulty: 1,
			usefulness: 1
		}

        const sortValues = [
            'Overall rating',
            'Helpfulness',
            'Most recent'
        ]

        if (this.state.course == null) {
            return <DefaultLayout
                    { ...this.props }
                    hideSearch={ true }
                    content={
                        <div className="catalog-container">
                            <h2>LOADING</h2>
                        </div>
                    }
            />
        }
		return <DefaultLayout 
				{ ...this.props }
				content={
					<div className="course-container">
                        <div className="course-name-container">
                            <span className="course-name">{ course.name }</span>
                            {
                                this.props.user && (
                                    <div className="course-icon-container" onClick={() => this.handleLovedClick()}>
                                        { this.state.loved ? (
                                                <FavoriteIcon className="course-icon"/>
                                            ) : (
                                                <FavoriteBorderIcon className="course-icon"/>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <span className="course-campus">{ course.campus }</span>
                        <div className="course-body-container">
                            <div className="course-rating-container">
                                <LabelRating label="Overall rating" rating={ overallRating.overall }></LabelRating>
                                <LabelRating label="Enjoyment rating" rating={ overallRating.enjoyment }></LabelRating>
                                <LabelRating label="Usefulness rating" rating={ overallRating.usefulness }></LabelRating>
                                <LabelRating label="Difficulty rating" rating={ overallRating.difficulty }></LabelRating>
                                <LabelRating label="Workload rating" rating={ overallRating.workload }></LabelRating>
                            </div>
                            <div className="course-description-container">
                                { <div className="course-prerequisites-container">
                                        <span className="course-prerequisites-title">Prerequisites:</span>
                                        {
                                            prerequisites.map((prerequisite, index) => {
                                                return <Link className="course-prerequisite" to={`/course/${ prerequisite }`} key={ prerequisite }>
                                                    {`${ prerequisite }${ index < prerequisites.length - 1 ? ',' : ''}`}
                                                </Link>
                                            })
                                        }
                                    </div>
                                }
                                <span className="course-description">{ course.description }</span>
                            </div>
                        </div>
                        <div className="course-reviews-container">
                            <div className="course-reviews-title-container">
                                <span className="course-reviews-title">Reviews</span>
                                <div className="course-reviews-sort-container">
                                    {
                                        this.props.user && (
                                            <Button className="course-reviews-button button" variant="contained" color="primary" onClick={() => this.toggleReviewPopup()}>Leave a review</Button>
                                        )
                                    }
                                    <SortButton sortValues={ sortValues }></SortButton>
                                </div>
                            </div>
                            {
                                reviews.length ? (
                                    reviews.map((review, index) => {
                                        return <div className="course-review-container" key={`course-review-${ index + 1 }`}>
                                            <div className="course-review-user-container">
                                                <div className="course-review-user">
                                                    <PersonIcon className="course-review-user-icon"/>
                                                    <span className="course-review-user-name">{ review.username }</span>
                                                </div>
                                                <div className="course-review-rating">
                                                    <LabelRating label="Overall rating" rating={ review.overall }></LabelRating>
                                                    <LabelRating label="Enjoyment rating" rating={ review.enjoyment }></LabelRating>
                                                    <LabelRating label="Usefulness rating" rating={ review.usefulness }></LabelRating>
                                                    <LabelRating label="Difficulty rating" rating={ review.difficulty }></LabelRating>
                                                    <LabelRating label="Workload rating" rating={ review.workload }></LabelRating>
                                                </div>
                                            </div>
                                            <div className="course-review-body-container">
                                                <span className="course-review-body">{ review.user_comment }</span>
                                                <div className="course-review-helpful-container">
                                                <span className="course-review-helpful-text">{`${ review.likes + (this.state.helpful ? 1 : 0) } user${ review.helpful !== 1 ? 's' : '' } found this helpful!` }</span>
                                                {
                                                    this.props.user && (
                                                        <div className="course-review-helpful-icon-container" onClick={() => this.handleHelpfulClick()}>
                                                            {
                                                                this.state.helpful ? (
                                                                    <ThumbUpAltIcon className="course-review-helpful-icon"/>
                                                                ) : (
                                                                    <ThumbUpAltOutlinedIcon className="course-review-helpful-icon"/>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    })
                                ) : (
                                    <div>No reviews</div>
                                )
                            }
                        </div>
                        <div className={`course-review-popup-container ${ !this.state.showReviewPopup || !this.props.user ? 'course-review-popup-container--hidden' : '' }`}> 
                            <span className="course-review-popup-title">Write a review</span>
                            <div className="course-review-popup">
                                <div className="course-review-popup-left">
                                    <LabelRating label="Enjoyment rating" rating={ this.state.reviewEnjoyment } onClick={(value) => this.setState({ reviewEnjoyment: value })}></LabelRating>
                                    <LabelRating label="Usefulness rating" rating={ this.state.reviewUsefulness } onClick={(value) => this.setState({ reviewUsefulness: value })}></LabelRating>
                                    <LabelRating label="Difficulty rating" rating={ this.state.reviewDifficulty } onClick={(value) => this.setState({ reviewDifficulty: value })}></LabelRating>
                                    <LabelRating label="Workload rating" rating={ this.state.reviewWorkload } onClick={(value) => this.setState({ reviewWorkload: value })}></LabelRating>
                                </div>
                                <div className="course-review-popup-right">
                                    <span className="course-review-popup-right-title">Comments</span>
                                    <textarea className="course-review-popup-textarea" placeholder="Type comments here... " value={ this.state.reviewComment } onChange={(event) => this.setState({ reviewComment: event.target.value }) }/>
                                    <div className="course-review-popup-button-container">
                                        <Button className="course-review-popup-close button" variant="contained" color="secondary" onClick={() => this.toggleReviewPopup()}>Cancel</Button>
                                        <Button className="course-review-popup-submit button" variant="contained" color="primary" onClick={() => this.handleReviewSubmit()}>Post</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
				}
		/>
	}
}