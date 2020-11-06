import React from 'react';
import { Header } from '../components/header';
import '../assets/css/global.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#747ce0",
		},
		secondary: {
			main: "#fffff",
		},
	}
});


export class DefaultLayout extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Header {...this.props}/>
				{ this.props.content }
			</ThemeProvider>
		);
	}
}

