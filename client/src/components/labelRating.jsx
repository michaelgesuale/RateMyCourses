import React from 'react';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

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
                        getLabelText={(value) => customIcons[value].label}
                        IconContainerComponent={IconContainer}
                        onChange={(event, newValue) => {
                            this.props.onClick(newValue)
                        }}
                />
            </div>
        )
    }

}
