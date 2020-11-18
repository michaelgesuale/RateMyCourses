import React from 'react';
import { DefaultLayout } from '../layouts/default';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';

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
        const recommendedCourses = [
            {
                name: 'CSC490',
                campus: 'University of Toronto Mississauga',
                description: 'hello this is a description for 490',
            },
            {
                name: 'CSC207',
                campus: 'University of Toronto Mississauga',
                description: 'hello this is a description for 207',
            },
            {
                name: 'CSC108',
                campus: 'University of Toronto Mississauga',
                description: 'hello this is a description for 108',
            }
        ]

		return <DefaultLayout
				{ ...this.props }
				content={
					<div className="likes-container">
                        <h2 className="likes-header">Under construction!</h2>
					</div>
				}
		/>
	}
}

