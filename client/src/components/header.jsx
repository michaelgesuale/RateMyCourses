import React from 'react';
import Button from '@material-ui/core/Button';
import { Search } from './search';
import { Link } from 'react-router-dom';

export class Header extends React.Component {

    render() {
        const CatalogIcon = () => (
            <svg className="header-catalog-icon" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M17.5,4.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65c0,0.65,0.73,0.45,0.75,0.45 C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5c1.65,0,3.35,0.3,4.75,1.05 C22.66,21.26,23,20.86,23,20.6V6C21.51,4.88,19.37,4.5,17.5,4.5z M21,18.5c-1.1-0.35-2.3-0.5-3.5-0.5c-1.7,0-4.15,0.65-5.5,1.5V8 c1.35-0.85,3.8-1.5,5.5-1.5c1.2,0,2.4,0.15,3.5,0.5V18.5z"/></g></g></g></svg>
        );

        const HeartIcon = () => (
            <svg className="header-heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        )

        const RecommendationIcon2 = () => (
            <svg className="header-user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>
        )

        const RecommendationIcon = () => (
            <svg className="header-user-icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g/><path d="M12,3c-0.46,0-0.93,0.04-1.4,0.14C7.84,3.67,5.64,5.9,5.12,8.66c-0.48,2.61,0.48,5.01,2.22,6.56C7.77,15.6,8,16.13,8,16.69 V19c0,1.1,0.9,2,2,2h0.28c0.35,0.6,0.98,1,1.72,1s1.38-0.4,1.72-1H14c1.1,0,2-0.9,2-2v-2.31c0-0.55,0.22-1.09,0.64-1.46 C18.09,13.95,19,12.08,19,10C19,6.13,15.87,3,12,3z M14,19h-4v-1h4V19z M14,17h-4v-1h4V17z M12.5,11.41V14h-1v-2.59L9.67,9.59 l0.71-0.71L12,10.5l1.62-1.62l0.71,0.71L12.5,11.41z"/></g></svg>
        )

        return (
            <div className='header-container'> 
                <Link to="/">
                    <div className='header-left-container'>
                        <span className="header-title">Rate My Courses</span>
                    </div>
                </Link>
                {
                    !this.props.hideSearch && (
                        <Search/>
                    )
                }
                <div className='header-right-container'>
                    <div className="header-icon-container">
                        <Link to="/catalog">
                            <CatalogIcon/>
                        </Link>
                        <span className="header-icon-text">Catalog</span>
                    </div>
                    { this.props.customProps.user ? (
                        <React.Fragment>
                            <div className="header-icon-container">
                                <Link to="/likes">
                                    <HeartIcon/>
                                </Link>
                                <span className="header-icon-text">Likes</span>
                            </div>
                            <div className="header-icon-container">
                                <Link to="/recommendations">
                                    <RecommendationIcon/>
                                </Link>
                                <span className="header-icon-text">Recommendations</span>
                            </div>
                            <Button className="header-button button" variant="contained" color="secondary" onClick={this.props.customProps.handleLogout}>Logout</Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="/login">
                                <Button className="header-button button" variant="contained" color="secondary">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="header-button button" variant="contained" color="secondary">Register</Button>
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }

}
