import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch,withRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css"
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import firebase from "./firebase";
import Login from './components/auth/Login';
import Register from "./components/auth/Register";
class Root extends React.Component{
    componentDidMount()
    {
    firebase.auth().onAuthStateChanged(user=>{
        if(user)
        {this.props.history.push("/");}
    })
    
    }
    render(){
    return(
    <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    </Switch>
   )
        }
}
const store=createStore(()=>{},composeWithDevTools())
const RootWithAuth=withRouter(Root);
ReactDOM.render(<Provider store={store}><Router><RootWithAuth/></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
