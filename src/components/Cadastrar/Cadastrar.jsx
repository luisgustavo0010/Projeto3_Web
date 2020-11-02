import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class Cadastrar extends Component {
  state = {
    inputError: "input-error display-none",
    loginError: "login-error display-none",
    passwordError: "password-error display-none",
  };

  async register() {
    this.setState({ loginError: "login-error display-none" });
    this.setState({ inputError: "input-error display-none" });
    this.setState({ passwordError: "input-error display-none" });

    let name = document.getElementById("user-cad").value;
    let password = document.getElementById("password-cad").value;
    let confPassword = document.getElementById("confirm-password-cad").value;

    if (name === "" || password === "" || confPassword === "") {
      this.setState({ inputError: "input-error display-block" });
    } else if (password != confPassword) {
      this.setState({ passwordError: "password-error display-block" });
    } else {
      this.setState({ inputError: "input-error display-none" });
      await axios
        .post("https://reqres.in/api/register", {
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
        })
        .catch((res) => {
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
              Preencha os campos de usuário, senha e confirmar senha!
            </span>
            <span className={this.state.passwordError}>
              Os campos senha e confirma senha devem ser iguais
            </span>
            <span className={this.state.loginError}>
              Erro ao efetuar o cadastro, tente usuário e senha validos
            </span>
            <label className="form-item" htmlFor="user-cad">
              Usuario:{" "}
            </label>
            <input
              className="form-item"
              type="text"
              name="user-cad"
              id="user-cad"
            />
            <label className="form-item" htmlFor="password-cad">
              Senha:{" "}
            </label>
            <input
              className="form-item"
              type="password"
              name="password-cad"
              id="password-cad"
            />
            <label className="form-item" htmlFor="confirm-password-cad">
              Confirma Senha:{" "}
            </label>
            <input
              className="form-item"
              type="password"
              name="confirm-password-cad"
              id="confirm-password-cad"
            />
            <input
              className="form-item"
              type="button"
              value="Cadastrar"
              onClick={this.register.bind(this)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Cadastrar;
