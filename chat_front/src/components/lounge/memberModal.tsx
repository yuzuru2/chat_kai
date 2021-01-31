import React from 'react';
import { T_Lounge } from '../../types';

interface A extends T_Lounge {
  createdAt: any;
}

interface I_Lounge extends A {
  createdAt: number;
}

export const MemberModal = ({
  data,
  num,
}: {
  data: I_Lounge[];
  num: number;
}) => {
  return (
    <div
      key={num}
      className="modal fade"
      id={`memberModal${num}`}
      tabIndex={-1}
      aria-labelledby={`memberModal${num}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">メンバ</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {data.map((member, j) => {
              return (
                <div key={j}>
                  <div className="card" style={{ background: '#88b3f7' }}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="text-center">
                          <img
                            src={`/img/${member.icon}.png`}
                            alt=""
                            width="50"
                          />
                        </div>
                      </li>
                      <li className="list-group-item">名前: {member.uname}</li>
                      <li className="list-group-item">uid: {member.uid}</li>
                    </ul>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
