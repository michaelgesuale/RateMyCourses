import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/default';
import { LabelRating } from './../components/labelRating';
import { SortButton } from './../components/sortButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import PersonIcon from '@material-ui/icons/Person';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

export class CoursePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            course: null,
            reviews: null,
            prerequisites: null,
            loved: false,
            helpful: false,
            showLoginToReview: false,
	   		showDomainError: false,
            showReviewPopup: false,
            sortBy: 'Most recent',
            reviewEnjoyment: 0,
            reviewUsefulness: 0,
            reviewDifficulty: 0,
            reviewWorkload: 0,
            reviewComment: ''
		};
    }
    
    updateCourseInfo() {
        fetch(`http://localhost:3000/api/course/${this.props.location.state.course_id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({course: data.course, reviews: data.reviews, prerequisites: data.prereq})
            }).catch(error => console.log(error));
    }

    displayLiked() {
        if (this.props.customProps.user) {
            fetch('http://localhost:3000/api/hasUserLikedCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(
                    {
                        username: this.props.customProps.user.name,
                        course_id: this.props.location.state.course_id,
                    }
                )
                }).then(data => {
                    this.setState({ loved: data.case });
                }).catch(error => {
                    console.log(error);
                    this.setState({ showReviewPopup: false });
            	});
        }
    }

	componentDidMount() {
        this.updateCourseInfo();
        this.displayLiked();
    }

    sortReviews(event) {
        const sortBy = event.target.id
        if (sortBy) {
            this.setState({sortBy})
        }
    }

    toggleLoginToReview() {
        const showLoginToReview = !this.state.showLoginToReview;
        this.setState({ showLoginToReview });
        console.log(showLoginToReview)
    }

    toggleShowDomainError() {
        const showDomainError = !this.state.showDomainError;
        this.setState({ showDomainError });
    }

    toggleReviewPopup() {
        const showReviewPopup = !this.state.showReviewPopup;
        this.setState({ showReviewPopup });
    }
    
    handleLovedClick() {
        const loved = !this.state.loved;
        this.setState({ loved });
        const path = loved ? 'like' : 'unlike'
        fetch(`http://localhost:3000/api/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(
                {
                    username: this.props.customProps.user.name,
                    course_id: this.props.location.state.course_id,
                }
            ),
        }).catch(error => {
            console.log(error);
            this.setState({ loved: false });
        });
    }

    handleHelpfulClick() {
        const helpful = !this.state.helpful;
        this.setState({ helpful });
    }

	handleReviewSubmit() {
		fetch('http://localhost:3000/api/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(
				{
					course_id: this.props.location.state.course_id,
					username: this.props.customProps.user.name,
					user_comment: this.state.reviewComment,
					workload: this.state.reviewWorkload,
					enjoyment: this.state.reviewEnjoyment,
					difficulty: this.state.reviewDifficulty,
					usefulness: this.state.reviewUsefulness
				}
			),
		}).then(data => {
			this.setState({ showReviewPopup: false });

			if (data.status == 400) {
				this.toggleShowDomainError();
			} else {
          			this.updateCourseInfo();
			}
        }).catch(error => {
            console.log(error);
            this.setState({ showReviewPopup: false });
        });
    }

    compareHelpful(a, b) {
        if (a.helpful < b.helpful){
            return 1;
        }
        if (a.helpful > b.helpful){
            return -1;
        }
        return 0;
    }

    compareOverall(a, b) {
        if (a.overall < b.overall){
            return 1;
        }
        if (a.overall > b.overall){
            return -1;
        }
        return 0;
    }

	render() {
        const {
            course,
            reviews,
            prerequisites
        } = this.state;

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
                        <div className="load-container">
                            <CircularProgress color="primary" />
                        </div>
                    }
            />
        }

        let sortedReviews
        if (this.state.sortBy === 'Most recent') {
            sortedReviews = reviews
        } else if (this.state.sortBy === 'Helpfulness') {
            sortedReviews = [...reviews].sort(this.compareHelpful);
        } else if (this.state.sortBy === 'Overall rating') {
            sortedReviews = [...reviews].sort(this.compareOverall); 
        }
        
		return <DefaultLayout 
				{ ...this.props }
				content={
					<div className="course-container">
                        <div className="course-name-container">
                            <span className="course-name">{ course.name }</span>
                            {
                                this.props.customProps.user && (
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
                        <span className="course-campus">{ course.campus_name }</span>
                        <div className="course-body-container">
                            <div className="course-rating-container">
                                <LabelRating label="Overall rating" rating={ course.overall_rating }></LabelRating>
                                <LabelRating label="Enjoyment rating" rating={ course.overall_enjoyment }></LabelRating>
                                <LabelRating label="Usefulness rating" rating={ course.overall_usefulness }></LabelRating>
                                <LabelRating label="Difficulty rating" rating={ course.overall_difficulty }></LabelRating>
                                <LabelRating label="Workload rating" rating={ course.overall_workload }></LabelRating>
                            </div>
                            <div className="course-description-container">
                                { <div className="course-prerequisites-container">
                                        <span className="course-prerequisites-title">Prerequisites:</span>
                                        {
                                            prerequisites.map((prerequisite, index) => {
                                                return <Link className="course-prerequisite" to={{
  						pathname: `/course/${ prerequisite.name }`,
						state: {
    							course_id: prerequisite.course_id
  						}
					    }} key={ prerequisite.course_id }>
                                                    {`${ prerequisite.name }${ index < prerequisites.length - 1 ? ',' : ''}`}
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
			                        { this.state.showDomainError && 
                                        <Snackbar anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } } open={this.state.showDomainError}>
                                            <Alert onClose={() => {this.toggleShowDomainError()}} severity="error">You can only only leave a review if your e-mail domain matches this campus domain.</Alert>
                                        </Snackbar>
                                    }
                                <div className="course-reviews-sort-container" onClick={e => this.sortReviews(e)}>
                                    { this.props.customProps.user ? (
                                            <Button className="course-reviews-button button" variant="contained" color="primary" onClick={() => this.toggleReviewPopup()}>Leave a review</Button>
                                        ) : (
                                            <React.Fragment>
                                                <Button className="course-reviews-button button" variant="contained" color="primary" onClick={() => this.toggleLoginToReview()}>Leave a review</Button>
                                                <Snackbar anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } } open={this.state.showLoginToReview} message="Please login to leave a review." action={
                                                    <React.Fragment>
                                                        <IconButton size="small" color="inherit" onClick={() => this.toggleLoginToReview()}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </React.Fragment>
                                                } />
                                            </React.Fragment>
                                        )
                                    }
                                    <SortButton sortValues={ sortValues }></SortButton>
                                </div>
                            </div>
                            {
                                sortedReviews.length ? (
                                    sortedReviews.map((review, index) => {
                                        return <div className="course-review-container" key={`course-review-${ index + 1 }`}>
                                            <div className="course-review-user-container">
                                                <div className="course-review-user">
                                                    <PersonIcon className="course-review-user-icon"/>
                                                    <span className="course-review-user-name">{ review.user_name }</span>
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
                                                <span className="course-review-helpful-text">{`${ review.helpful + (this.state.helpful ? 1 : 0) } user${ review.helpful !== 1 ? 's' : '' } found this helpful!` }</span>
                                                {
                                                    this.props.customProps.user && (
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
                                    <div className="course-review-user-name"><br></br>No reviews yet!</div>
                                )
                            }
                        </div>
                        <div className={`course-review-popup-container ${ !this.state.showReviewPopup || !this.props.customProps.user ? 'course-review-popup-container--hidden' : '' }`}> 
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
