import React from 'react';
import { Icon } from './icon';
import { FormProvider } from 'react-hook-form';
import { useRootHooks } from '../../hooks/root';
import { Input } from './input';

export const Section = () => {
  const { methods, on_submit } = useRootHooks();

  return (
    <>
      <section>
        <p className="text-center">アイコンを選択してね</p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(on_submit)}>
            <div className="mx-auto" style={{ width: 300 }}>
              <div className="form-group">
                <ul
                  className="d-flex flex-wrap"
                  style={{ paddingLeft: 0, listStyle: 'none' }}
                >
                  <Icon />
                </ul>
              </div>

              <div className="form-group">
                <Input />
              </div>

              <br />
              <div className="text-center">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="チャットをはじめる"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
};
