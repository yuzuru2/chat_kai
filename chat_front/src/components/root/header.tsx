import React from 'react';
import { Constant } from '../../constant';

export const Header = () => {
  return (
    <>
      <header>
        <div className="clearfix">
          <div className="float-start">
            <h1 style={{ fontSize: 25 }}>{Constant.title}</h1>
          </div>
        </div>
      </header>
    </>
  );
};
