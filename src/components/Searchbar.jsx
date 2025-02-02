import { Component } from "react";
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class Searchbar extends Component {
    state = {
        query: '',
    };

    handleChange = (event) => {
        const { value } = event.target;

        this.setState({ query: value });
        // this.setState({ query: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }

    render() {
        return (
          <header className={styles.searchbar}>
            <form className={styles.searchForm} onSubmit={this.handleSubmit}>
              <button type="submit" className={styles.searchButton}>
                <span className={styles.buttonLabel}>Search</span>
                <FontAwesomeIcon icon={faSearch} />
              </button>

              <input
                className={styles.searchInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </form>
          </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}