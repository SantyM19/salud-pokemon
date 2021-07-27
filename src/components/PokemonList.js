import React from 'react';
import { Link } from 'react-router-dom';

import './styles/ConsultList.css';
import Gravatar from './Gravatar';

class ConsultListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">

        <div>
          <strong>
            {this.props.pokemon.raza.valor}
          </strong>
          <br/>
          Nombre: {this.props.pokemon.nombre.valor} 
          <br />Tipo: {this.props.pokemon.tipo[0].valor}
          <br />
          Habilidad: {this.props.pokemon.habilidad.valor}
        </div>
      </div>
    );
  }
}

function useSearchBadges(consults) {
  const [query, setQuery] = React.useState('');
  const [filteredBadges, setFilteredBadges] = React.useState(consults);

  React.useMemo(() => {
    const result = consults.filter(consult => {
      return `${consult.nombre.valor} ${consult.raza.valor}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result);
  }, [consults, query]);

  return { query, setQuery, filteredBadges };
}

function ConsultsList(props) {
  const pokemons = props.pokemon;

  const { query, setQuery, filteredBadges } = useSearchBadges(pokemons);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Consults</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <h3>No pokemons were found</h3>
        <Link className="btn btn-primary" to="/consult/new">
          Create new pokemon
        </Link>
      </div>
    );
  }

  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Consults</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <ul className="list-unstyled">
        {filteredBadges.map(consult => {
          return (
            <li key={consult.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/consults/${consult.id}`}
              >
                <ConsultListItem pokemon={consult} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ConsultsList;