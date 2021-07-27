import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Consults.css';
import confLogo from '../images/badge-header.svg';
import ConsultList from '../components/ConsultList';
import PokemonList from '../components/PokemonList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
import api from '../api';

class Consults extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    consulta : undefined
  };

  componentDidMount() {
    this.fetchData();

    this.intervalId = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.consults.list()

      const userID = await api.usuarios.read(data[0].idUsuario);
      const pokeID = await api.pokemon.read(data[0].idMascotaPokemon);
      //console.log(pokeID)

      const datamorfis = data.map((consult) => {
        return [consult , userID , pokeID]
      })
      console.log(datamorfis)

      this.setState({ loading: false, data: data, consulta:datamorfis });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Consult
            </Link>
          </div>

          <ConsultList consults = {this.state.consulta} />
        </div>


{ /*       <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Consult
            </Link>
          </div>

          <ConsultList consults = {this.state.user} />
        </div>


        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Pokemon
            </Link>
          </div>

          <PokemonList pokemon = {this.state.poke} />
    </div>*/ }
        {this.state.loading && <MiniLoader />}
        
      </React.Fragment>
    );
  }
}

export default Consults;