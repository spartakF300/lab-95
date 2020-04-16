import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AppToolbar from "./components/UI/Toolbar/Toolbar";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import AddCocktail from "./containers/AddCocktail/AddCocktail";
import Main from "./containers/Main/Main";
import Details from "./containers/Deteils/Details";
import {NotificationContainer} from 'react-notifications';
const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div>
            <NotificationContainer/>
            <AppToolbar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/my_cocktails/:id" component={Main}/>
                <ProtectedRoute isAllowed={user} path="/new_cocktail" component={AddCocktail}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/details/:id" component={Details}/>
            </Switch>
        </div>
    );
}


export default App;
