import React from 'react';
import { LabelRating } from './labelRating';
import { Link } from 'react-router-dom';
import { SortButton } from './sortButton';

export class Courses extends React.Component {
    
    render() {
        const {
            courses
        } = this.props;

        const total = courses.length;
        const sortValues = [
            'Course code',
            'Overall rating'
        ]

        return (
            <div className="courses-container">
                <div className="courses-top-container">
                    <span className="courses-total-count">{ `${ total } result${ total !== 1 ? 's' : ''}` }</span>
                    <div className="courses-sort-container">
                        <div>
                            <SortButton sortValues={sortValues} sortFunc={this.props.sortFunc}></SortButton>
                        </div>
                    </div>
                </div>
                { courses.map(course => {
                    return (
                        <div className="courses-item" key={ course.name }>
                            <div className="courses-item-name-container">
                                <Link className="courses-item-name"
					to={{
  						pathname: `/course/${ course.name }`,
						state: {
    							course_id: course.course_id
  						}
					    }}>{ course.name }</Link>
                                <div className="courses-item-rating"><LabelRating rating={ course.overall_rating }></LabelRating></div>
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
