import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';

export default class Courses extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sortAnchor: null     
		}
	}

    render() {
        const {
            courses
        } = this.props;
        const {
            sortAnchor
        } = this.state;

        const total = courses.length;
        const sortValues = [
            'Course code',
            'Overall rating'
        ]

        const handleClick = (event) => {
            this.setState({ sortAnchor: event.currentTarget });
        };

        const handleClose = () => {
            this.setState({ sortAnchor: null });
        };

        return (
            <div className="courses-container">
                <div className="courses-top-container">
                    <span className="courses-total-count">{ `${ total } result${ total !== 1 && 's'}` }</span>
                    <div className="courses-sort-container">
                        <div>
                            <Button className="courses-sort-button button" color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Sort by
                                <ArrowDropDownIcon/>
                            </Button>
                            <Menu
                                id="sort-menu"
                                anchorEl={sortAnchor}
                                keepMounted
                                open={Boolean(sortAnchor)}
                                onClose={handleClose}
                            >
                                { sortValues.map(sortValue => {
                                    return <MenuItem onClick={handleClose} key={ sortValue }>{ sortValue }</MenuItem>
                                })}
                            </Menu>
                        </div>
                    </div>
                </div>
                { courses.map(course => {
                    return (
                        <div className="courses-item" key={ course.name }>
                            <div className="courses-item-name-container">
                                <Link to="/course_page">
                                    <span className="courses-item-name">{ course.name }</span>
                                </Link>
                                <div className="courses-item-rating">
                                    <Rating name="half-rating-read" value={ parseFloat(course.overall_rating) } readOnly precision={0.1}
                                            emptyIcon={<StarBorderIcon fontSize="inherit" />}/>
                                </div>
                            </div>
                            <span className="courses-item-campus">{ course.campus }</span>
                            <span className="courses-item-description">{ course.description }</span>
                        </div>
                    )
                })}
            </div>
        )

    }

}
