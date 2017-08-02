import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';

import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';

import { Home, Typed, Article, NotFound, Write } from './page';

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql' 
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result._id !== undefined) {
      return `${result.__typename}:${result._id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject,
  customResolvers: {
    Query: {
      article: (_, { _id }) => {
        return toIdValue(dataIdFromObject({
          __typename: 'Article',
          _id,
        }))
      }
    }
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/article/:articleId" component={Article}/>
              <Route path="/write" component={Write}/>
              <Route path="/:type" component={Typed}/>
              <Route path="/" component={Home}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
