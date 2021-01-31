import React from 'react';
import { GroupModal } from './groupModal';
import { Info } from './info';

export const Section = () => {
  return (
    <>
      <section>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createGroup"
          >
            グループ作成
          </button>
        </div>
      </section>
      <GroupModal />

      <hr />

      <Info />
    </>
  );
};
