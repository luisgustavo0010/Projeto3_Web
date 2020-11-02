import React, { Component } from "react";
import "./header.css";
import Login from "../Login";
import logo from "../../assets/docker-logo.jpg";
import Cadastrar from "../Cadastrar";

class Header extends Component {
  state = {
    showLogin: "login display-none",
    showCadastro: "login display-none",
    user: "",
    textLoginBtt: "",
    isLoggedIn: null,
  };

  componentDidMount() {
    this.isLoggedIns();
  }

  showLogin = () => {
    this.setState({ showLogin: "login display-block" });
  };

  showCadastro = () => {
    this.setState({ showCadastro: "login display-block" });
  };

  hideLogin = () => {
    this.setState({ showLogin: "login display-none" });
  };

  hideCadastro = () => {
    this.setState({ showCadastro: "login display-none" });
  };

  isLoggedIns = () => {
    if (localStorage.getItem("api-token")) {
      this.setState({
        user: localStorage.getItem("api-email"),
        textLoginBtt: "Sign out",
        isLoggedIn: true,
      });
    } else {
      this.setState({ textLoginBtt: "Sign In", isLoggedIn: false, user: "" });
    }
  };

  logout = () => {
    localStorage.clear();
    this.isLoggedIns();
    this.props.isAuthorized();
  };

  render() {
    return (
      <header className="navigation">
        <div className="container">
          <img
            src={logo}
            className="header-item"
            alt="Logo Docker"
            height="50px"
          ></img>
          <ul className="nav-bar header-item">
            <li className="header-item">Why Docker?</li>
            <li className="header-item">Products</li>
            <li className="header-item">Use Cases</li>
            <li className="header-item">Developers</li>
            <li className="header-item">Pricing</li>
            <li className="header-item">Company</li>
          </ul>
          <div className="action-bar header-item">
            <span className="username-logged">{this.state.user}</span>
            <button
              onClick={
                this.state.isLoggedIn
                  ? this.logout.bind(this)
                  : this.showLogin.bind(this)
              }
              className="header-item signin"
            >
              {this.state.textLoginBtt}
            </button>
            {this.state.isLoggedIn == false ? (
              <button
                onClick={this.showCadastro.bind(this)}
                className="header-item signup"
              >
                Cadastrar
              </button>
            ) : null}
            <Login
              show={this.state.showLogin}
              hide={this.hideLogin.bind(this)}
              islogged={this.isLoggedIns.bind(this)}
              isAuthorized={this.props.isAuthorized.bind(this)}
            />
            <Cadastrar
              show={this.state.showCadastro}
              islogged={this.isLoggedIns.bind(this)}
              isAuthorized={this.props.isAuthorized.bind(this)}
              hide={this.hideCadastro.bind(this)}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
