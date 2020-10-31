const React = require('react');
const Header = require('./../components/header');

const DefaultLayout = (props) => {
	return (
		<html>
			<head>
				<title>{ props.title }</title>
				<link rel="stylesheet" href="./css/global.css" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
				<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' />
			</head>
			<body>
				<Header
					user={ props.user }
					hideSearch={ props.hideSearch }
				/>
				{ props.content }
			</body>
		</html>
	);
}

module.exports = DefaultLayout;