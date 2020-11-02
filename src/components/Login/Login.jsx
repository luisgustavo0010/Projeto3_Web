import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class Login extends Component {
  state = {
    inputError: "input-error display-none",
    loginError: "login-error display-none",
    inputType: "password",
  };

  changePasswordView() {
    this.state.inputType === "password"
      ? this.setState({ inputType: "text" })
      : this.setState({ inputType: "password" });
  }

  async login() {
    this.setState({ loginError: "login-error display-none" });
    this.setState({ inputError: "input-error display-none" });

    let name = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    
    if (name === "" || password === "") {
      this.setState({ inputError: "input-error display-block" });
    } else {
      this.setState({ inputError: "input-error display-none" });
      await axios
        .post("https://reqres.in/api/login", {
          email: name,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.clear();
            localStorage.setItem("api-email", name);
            localStorage.setItem("api-token", res.data.token);
            this.props.islogged();
            this.props.isAuthorized();
            this.props.hide();
          }
        }).catch((res) => {
            this.setState({ loginError: "login-error display-block" });
            console.log("login error");
            console.log(res);
        });
    }
  }

  render() {
    return (
      <div className={this.props.show}>
        <div className="login-container">
          <span onClick={this.props.hide} className="close-login">
            X
          </span>
          <form action="">
            <span className={this.state.inputError}>
              Preencha os campos de usuário e senha!
            </span>
            <span className={this.state.loginError}>
              Erro ao efetuar login, tente usuário e senha validos
            </span>
            <label className="form-item" htmlFor="user">
              Usuario:{" "}
            </label>
            <input className="form-item" type="text" name="user" id="user" />
            <label className="form-item" htmlFor="password">
              Senha:{" "}
            </label>
            <input
              className="form-item"
              type={this.state.inputType}
              name="password"
              id="password"
            />
            <div className="form-item">
              <input
                onChange={this.changePasswordView.bind(this)}
                type="checkbox"
                name="MostrarSenha"
              />
              <label className="login-show-password">Mostrar Senha</label>
            </div>
            <input
              className="form-item"
              type="button"
              value="Entrar"
              onClick={this.login.bind(this)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
