import React, { useEffect } from 'react';
import { HomePage } from './home';
import { CatalogPage } from './catalog';
import { CoursePage } from './course';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

export class Base extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    handleLogin() {
        const user = {
            id: 0,
            name: 'newUser'
        }
        this.setState({ user });
    }

    handleRegister() {
        this.handleLogin();
    }

    handleLogout() {
        this.setState({ user: undefined });
    }
    
    render() {
        const customProps = {
            user: this.state.user,
            handleLogin: () => this.handleLogin(),
            handleLogout: () => this.handleLogout(),
            handleRegister: () => this.handleRegister()
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/course/:id"><CoursePage { ...customProps }/></Route>
                    <Route path="/catalog"><CatalogPage {...customProps }/></Route>
                    <Route path="/"><HomePage {...customProps }/></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

