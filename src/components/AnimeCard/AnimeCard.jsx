import React, { Component } from "react";
import "./style.css";

class AnimeCard extends Component {
  render() {
    return (
      <div className="card-container">
        <div className="grid-item card-img">
          <img src={this.props.img} alt="" />
        </div>
        <div className="grid-item card-title">
          <h3>{this.props.title}</h3>
        </div>
        <div className="grid-item card-creditos">
          <p>
            {this.props.creditos != "null: null"
              ? this.props.creditos
              : "Informação - não disponivel"}
          </p>
        </div>
        <div className="grid-item foot">
          <p>
            {this.props.staff0 != null
              ? this.props.staff0
              : "info-desconhecida"}
          </p>
        </div>
        <div className="grid-item foot">
          <p>
            {this.props.staff1 != null
              ? this.props.staff1
              : "info-desconhecida"}
          </p>
        </div>
        <div className="grid-item foot">
          <p>
            {this.props.staff2 != null
              ? this.props.staff2
              : "info-desconhecida"}
          </p>
        </div>
      </div>
    );
  }
}

export default AnimeCard;
