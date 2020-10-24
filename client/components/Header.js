import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router-dom';
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    /* pros.loading is part of graphql passed as props to this component */
    if (loading) return <div />;

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <React.Fragment>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">
              Home
            </Link>
            <ul className="right">{this.renderButtons()} </ul>
          </div>
        </nav>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
