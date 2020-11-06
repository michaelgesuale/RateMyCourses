import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export class LabelRating extends React.Component {

	constructor(props) {
        super(props);
    }

    render() {
        const {
            rating,
            label
        } = this.props;
        return (
            <div className="rating-container">
                {
                    label && (
                        <span className="rating-label">{ label }</span>
                    )
                }
                <Rating name={ this.props.label }value={ parseFloat( rating ) } readOnly={ this.props.onClick ? false : true }  precision={1}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        onChange={(event, newValue) => {
                            this.props.onClick(newValue)
                        }}
                />
            </div>
        )
    }

}
