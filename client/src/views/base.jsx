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
            name: 'Sally'
        }
        this.setState({ user });
    }

    handleRegister() {
        this.handleLogin();
    }

    handleLogout() {
        this.setState({ user: undefined });
    }
    
    render(props) {
        const customProps = {
            user: this.state.user,
            handleLogin: () => this.handleLogin(),
            handleLogout: () => this.handleLogout(),
            handleRegister: () => this.handleRegister()
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/course/:id" render={(props) => (<CoursePage {...props} customProps={customProps} key={props.location.state.course_id}/>)}></Route>
                    <Route path="/catalog" render={(props) => (<CatalogPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/" render={(props) => (<HomePage {...props} customProps={customProps} />)}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

