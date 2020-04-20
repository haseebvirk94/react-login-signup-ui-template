import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/login.component";
import Home from "./components/Home";
import SignUp from "./components/signup.component";
import * as actions from "./store/actions/auth";
class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              DashBoard
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={"/sign-in"}
                      Authentication={this.props.isAuthenticated}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return { isAuthenticated: state.token !== null };
};
const mapDispatchToProps = (dispatch) => {
  return;
  {
    onTryAutoSignUp: dispatch(actions.authCheckState());
  }
};

export default connect(mapStateToProps)(App);
