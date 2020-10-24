import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id || null,
});

// this block is to bind the cookies the the graphql req
const httpLink = new createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

// const middlewareLink = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     headers: {
//       authorization: localStorage.getItem('token') || null,
//     },
//   });
//   return forward(operation);
// });

// const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  cache,
  link: httpLink,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch>
          <Route path="/" component={App} exact></Route>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
