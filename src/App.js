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

import Login from './Login';

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql',
  opts: {
    credentials: 'include',
  }
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

// const store = createStore(
//   combineReducers({
//     // todos: todoReducer,
//     user: userReducer,
//     apollo: client.reducer(),
//   }),
//   {}, // initial state
//   compose(
//       applyMiddleware(client.middleware(), thunk),
//       // If you are using the devToolsExtension, you can add it here also
//       (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
//   )
// );

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <BrowserRouter>
          <div className="App">
            <Login />
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
