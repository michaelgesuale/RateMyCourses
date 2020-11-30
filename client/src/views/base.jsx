import React from 'react';
import Cookies from 'js-cookie';
import { HomePage } from './home';
import { CatalogPage } from './catalog';
import { CoursePage } from './course';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { LikesPage } from './likes';
import { RecommendationsPage } from './recommendations';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

export class Base extends React.Component {

    handleLogin(user_data) {
        const user = {
            email: user_data.email,
            name: user_data.username,
        }
        Cookies.set('user', user, { expires: 1 / 144 }); // Expires in 10 minutes
        this.forceUpdate();
    }

    handleLogout() {
        Cookies.remove('user');
        this.forceUpdate();
    }
    
    render() {
        const cookieUser = Cookies.get('user');
        const customProps = {
            user: cookieUser ? JSON.parse(cookieUser) : undefined,
            handleLogin: (user_data) => this.handleLogin(user_data),
            handleLogout: () => this.handleLogout()
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" render={(props) => (<LoginPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/register" render={(props) => (<RegisterPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/course/:name" render={(props) => (<CoursePage {...props} customProps={customProps} key={props.location.state.course_id}/>)}></Route>
                    <Route path="/catalog" render={(props) => (<CatalogPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/likes" render={(props) => (<LikesPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/recommendations" render={(props) => (<RecommendationsPage {...props} customProps={customProps} />)}></Route>
                    <Route path="/" render={(props) => (<HomePage {...props} customProps={customProps} />)}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

