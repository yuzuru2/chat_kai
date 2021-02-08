import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { firebase } from './firebase';
import { Constant } from './constant';
import { State } from './recoil';

import { Root } from './pages';
import { Lounge } from './pages/lounge';
import { Room } from './pages/room';
import { Loading } from './components/loading';

import 'bootstrap/dist/css/bootstrap.min.css';
require('bootstrap/dist/js/bootstrap.js');

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <Link to="/">ホーム</Link>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [, setUid] = useRecoilState(State.uid);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        firebase
          .auth()
          .signInAnonymously()
          .then(() => '');
        return;
      }

      setUid((await firebase.auth().currentUser?.uid) as string);
      setLoading(false);
    });
  }, [setUid, setLoading]);

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

  if (loading) {
    return <Loading />;
  }

  return (
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
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
