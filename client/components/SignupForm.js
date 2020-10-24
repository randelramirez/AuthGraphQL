import React, { Component } from 'react';
import Header from './Header';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data.user && this.props.data.user) {
      // previously there was no user
      // the component re-rendered with a user props
      // redirect to dashboard
      this.props.history.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((response) => {
        console.log('response', response);
        const errors = response.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="container">
        <Header>
          <div>
            <h3>Sign Up</h3>
            <AuthForm
              errors={this.state.errors}
              onSubmit={this.onSubmit.bind(this)}
            />
          </div>
        </Header>
      </div>
    );
  }
}

/*
  We associate the LoginForm with the CurrentUser query, so that if the query updates this component will re-render as well
  components associated with a query, if that query updates/refetched associated components will re-render
*/
export default graphql(query)(graphql(mutation)(SignupForm));

// same effect export default graphql(mutation)(graphql(query)(LoginForm));
