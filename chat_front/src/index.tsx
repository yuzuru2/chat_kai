import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { firebase } from './firebase';
import { Constant } from './constant';

import { Root } from './pages';
import { Lounge } from './pages/lounge';
import { Room } from './pages/room';

import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap/dist/js/bootstrap.js');

export let uid = '';

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <Link to="/">to home</Link>
    </>
  );
};

firebase.auth().onAuthStateChanged(async data => {
  if (data === null) {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => '');
    return;
  }

  const authLink = setContext(async () => {
    return {
      headers: {
        authorization: await firebase.auth().currentUser?.getIdToken(true),
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(
      createHttpLink({
        uri: Constant.graphql_url[process.env.NODE_ENV],
      })
    ),
    cache: new InMemoryCache(),
  });

  uid = (await firebase.auth().currentUser?.uid) as string;

  ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Root}></Route>
              <Route path="/lounge" component={Lounge}></Route>
              <Route path="/room" component={Room}></Route>
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
