import React from 'react';
import { Link } from 'react-router-dom';

import './styles/ConsultList.css';
import Gravatar from './Gravatar';

class ConsultListItem extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.consult.correo.valor}
        />

        <div>
          <strong>
            {this.props.consult.nombre.valor} {this.props.consult.apellido.valor}
          </strong>
          <br />{this.props.consult.telefono.valor}
          <br />
          {this.props.consult.profesion.valor}
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
      return `${consult.nombre} ${consult.apellido}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result);
  }, [consults, query]);

  return { query, setQuery, filteredBadges };
}

function ConsultsList(props) {
  const consults = props.consults;
  console.log(props.consults)

  const { query, setQuery, filteredBadges } = useSearchBadges(consults);

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

        <h3>No consults were found</h3>
        <Link className="btn btn-primary" to="/consult/new">
          Create new consult
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
                <ConsultListItem consult={consult} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ConsultsList;