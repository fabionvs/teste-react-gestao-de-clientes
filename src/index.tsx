import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect,
    useLocation
} from "react-router-dom";
import Login from "./views/Login";

import authService from "./services/auth.service";
import Logout from "./views/Logout";

const PrivateRoute = (props : any) => {
    const location = useLocation();
    const authLogin  = authService.getToken();
    return authLogin ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />
    );
};

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/" exact={true} component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
        </Switch>
    </ BrowserRouter>, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
