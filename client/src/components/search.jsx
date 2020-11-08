import React from 'react';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

export class Search extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            redirectToCatalog: false,
            query: ''
        }
        this.onKeyPressed = this.onKeyPressed.bind(this)
        this.setSearchQuery = this.setSearchQuery.bind(this)
    }

    onKeyPressed(e) {
        if (e.keyCode === 13) {
            this.setSearchQuery()
        }
    }

    setSearchQuery() {
        const query = document.getElementsByClassName('search-input')[0].value
        console.log(query)
        this.setState({
            redirectToCatalog: true,
            query,
        })
    }

    render() {
        const SearchIcon = () => (
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        )

        const searchBar = <div className="search-container">
            <SearchIcon/>
            <input type="text" className="search-input" onKeyDown={this.onKeyPressed}/>
        </div>

        const searchButton = <Button 
            className="home-search-button button" 
            variant="contained" 
            color="secondary"
            onClick={this.setSearchQuery}
        >
            Search for your course
        </Button>

        if (this.state.redirectToCatalog) {
            return <React.Fragment>
            <Redirect to={{ pathname: "/catalog", state: { courseName: this.state.query } }} />
            {searchBar}
            </React.Fragment>
        }

        return <React.Fragment>
            {searchBar}
            {this.props.isHomepage && searchButton}
        </React.Fragment>
    }

}