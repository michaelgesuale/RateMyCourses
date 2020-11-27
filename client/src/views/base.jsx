import React from 'react';
import { HomePage } from './home';
import { CatalogPage } from './catalog';
import { CoursePage } from './course';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { LikesPage } from './likes';
import { RecommendationsPage } from './recommendations';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

export class Base extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    handleLogin(user_data) {
        const user = {
            email: user_data.email,
            name: user_data.username,
        }
        this.setState({ user });
    }

    handleLogout() {
        this.setState({ user: undefined });
    }
    
    render() {
        const customProps = {
            user: this.state.user,
            handleLogin: (user_data) => this.handleLogin(user_data),
            handleLogout: () => this.handleLogout()
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" render={(props) => (<LoginPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/register" render={(props) => (<RegisterPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/course/:id" render={(props) => (<CoursePage {...props} customProps={customProps} key={props.location.state.course_id}/>)}></Route>
                    <Route path="/catalog" render={(props) => (<CatalogPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/likes" render={(props) => (<LikesPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/recommendations" render={(props) => (<RecommendationsPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/" render={(props) => (<HomePage {...props} customProps={customProps} />)}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

