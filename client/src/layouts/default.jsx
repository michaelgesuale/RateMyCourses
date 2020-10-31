import React from 'react';
import Header from '../components/header.jsx';
import '../assets/css/global.css';


export default class DefaultLayout extends React.Component {

 
render() {
	return (
		<React.Fragment>
	
			
				<Header
					user={ this.props.user }
					hideSearch={ this.props.hideSearch }
				/>
				{ this.props.content }
		
		</React.Fragment>
	);
}
}

