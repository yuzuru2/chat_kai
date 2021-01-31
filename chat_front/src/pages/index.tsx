import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Loading } from '../components/loading';
import { Header } from '../components/root/header';
import { Section } from '../components/root/section';
import { Constant } from '../constant';
import { useRootHooks } from '../hooks/root';
import { State } from '../recoil';

export const Root = () => {
  const [global_loading, setGlobalLoading] = useRecoilState(State.loading);
  const history = useHistory();
  const { data, loading } = useRootHooks();

  React.useEffect(() => {
    if (data?.get_place == null) {
      return;
    }

    if (data.get_place !== Constant.place.root) {
      history.push(`/${data?.get_place}`);
    }
  }, [data, history]);

  React.useEffect(() => {
    return () => {
      setGlobalLoading(false);
    };
  }, [setGlobalLoading]);

  if (loading) {
    return <Loading />;
  }

  if (data?.get_place !== Constant.place.root) {
    return <Loading />;
  }

  if (global_loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <hr />

      <main>
        <div className="row">
          <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
            <Section />
          </article>
          <aside className="col-xs-0 col-sm-0 col-md-0 col-lg-3 col-xl-3">
            <div className="card" style={{ width: '90%', height: 1000 }}>
              広告スペース
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};
