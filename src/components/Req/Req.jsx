import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import Header from "../Header";
import AnimeCard from "../AnimeCard";

const convert = require("xml-js");
const animeReq = require("./response");

class Req extends Component {
  state = {
    anime: [],
    busca: "",
    isLoggedIn: null,
    type: "",
    erroBusca: "",
  };

  componentDidMount() {
    this.isAuthorized();
  }

  isAuthorized = () => {
    if (localStorage.getItem("api-token")) {
      this.setState({
        isLoggedIn: true,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  async requestAnime() {
    try{
      if (this.state.busca != ""){
        this.setState({erroBusca: ""});
        var results = null
        await axios.get(
            "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~" +
              this.state.busca
          )
          .then((response) => {
            results = JSON.parse(
              convert.xml2json(response.data, { compact: true, spaces: 2 })
            );
            console.log(results);
            var anime0 = animeReq.getAnime(results.ann.anime[0]);
            var anime1 = animeReq.getAnime(results.ann.anime[1]);
            var anime2 = animeReq.getAnime(results.ann.anime[2]);
            this.setState({ anime: [anime0, anime1, anime2] });
          }).catch((err)=> {
            this.setState({erroBusca: "Anime não encontrado. Tente: hunter ou dragon ou sakura"});
          });
      }
    }catch{
      this.setState({erroBusca: "Anime não encontrado. Tente: hunter ou dragon ou sakura"});
    }
  }

  handle_change(ev) {
    this.setState({ busca: ev.target.value });
  }

  render() {
    return (
      <div>
        <Header isAuthorized={this.isAuthorized.bind(this)} />
        <div
          className={this.state.isLoggedIn ? "display-block" : "display-none"}
        >
          <div className="box-busca">
            <label>
              Buscar Anime:
              <input
                type="text"
                value={this.state.busca}
                onChange={this.handle_change.bind(this)}
              />
            </label>
            <button onClick={this.requestAnime.bind(this)}>Pesquisar</button>
            <span>{this.state.erroBusca}</span>
          </div>

          <div className="cardlist">
            {this.state.anime.map((anime, index) => {
              return <AnimeCard
                key={index}
                img={anime.img}
                title={anime.title}
                creditos={anime.creditos}
                staff0={anime.staff0}
                staff1={anime.staff1}
                staff2={anime.staff2}
              />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Req;
