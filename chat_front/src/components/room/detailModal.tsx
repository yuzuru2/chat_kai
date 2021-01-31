import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { uid } from '../../';
import { useRecoilState } from 'recoil';
import { State } from '../../recoil';
import { useRoomHooks } from '../../hooks/room';
import { T_Room } from '../../types';

type RnameState = {
  rname: string;
};

type LimitState = {
  limit: string;
};

export const DetailModal = () => {
  const [room] = useRecoilState(State.room);

  const {
    update_host,
    update_limit,
    update_rname,
    create_blaclkist,
  } = useRoomHooks();

  const form_rname = {
    form: useForm<RnameState>({
      mode: 'onChange',
      defaultValues: { rname: String(room[0].rname) },
    }),
    submit: async (data: RnameState) => {
      update_rname({ variables: { rname: data.rname } });
    },
  };

  const form_limit = {
    form: useForm<LimitState>({
      mode: 'onChange',
      defaultValues: { limit: String(room[0].limit) },
    }),
    submit: async (data: LimitState) => {
      update_limit({ variables: { limit: Number(data.limit) } });
    },
  };

  const root_button = (data: T_Room, key: number) => {
    if (uid !== data.hostid) {
      return <></>;
    }

    if (data.uid !== uid) {
      return (
        <div key={key}>
          <li className="list-group-item">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('追放しますか?')) {
                  create_blaclkist({
                    variables: {
                      bid: data.uid == null ? '' : data.uid,
                    },
                  });
                }
              }}
            >
              追放する
            </button>
          </li>

          <li className="list-group-item">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                if (window.confirm('権限を渡しますか?')) {
                  update_host({
                    variables: {
                      transfer: data.uid == null ? '' : data.uid,
                    },
                  });
                }
              }}
            >
              権限を渡す
            </button>
          </li>
        </div>
      );
    }
  };

  const member = () => {
    return (
      <>
        {room.map((m, i) => {
          return (
            <div key={i}>
              <div className="card" style={{ background: '#88b3f7' }}>
                <ul className="list-group list-group-flush">
                  {m.hostid === m.uid ? (
                    <li className="list-group-item" style={{ color: 'tomato' }}>
                      ホスト
                    </li>
                  ) : (
                    ''
                  )}

                  <li className="list-group-item">
                    <div className="text-center">
                      <img src={`/img/${m.icon}.png`} alt="" width="50" />
                    </div>
                  </li>
                  <li className="list-group-item">{m.uname}</li>
                  <li className="list-group-item">{m.uid}</li>

                  {root_button(m, i)}
                </ul>
              </div>
              <br />
            </div>
          );
        })}
      </>
    );
  };

  const host = () => {
    return (
      <>
        <div
          className="modal fade"
          id="detailGroup"
          tabIndex={-1}
          aria-labelledby="detailGroup"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">グループ詳細</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">グループ名</label>

                  <FormProvider {...form_rname.form}>
                    <form
                      onSubmit={form_rname.form.handleSubmit(form_rname.submit)}
                    >
                      <div className="input-group">
                        <input
                          name="rname"
                          className="form-control"
                          placeholder=""
                          aria-label=""
                          aria-describedby="basic-addon1"
                          required
                          maxLength={20}
                          ref={form_rname.form.register({
                            required: true,
                            maxLength: 20,
                          })}
                        />

                        <div className="input-group-append">
                          <input
                            className="btn btn-success"
                            type="submit"
                            value=" 変更"
                          />
                        </div>
                      </div>
                    </form>
                  </FormProvider>
                </div>

                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">上限人数</label>

                  <FormProvider {...form_limit.form}>
                    <form
                      onSubmit={form_limit.form.handleSubmit(form_limit.submit)}
                    >
                      <div className="input-group">
                        <select
                          className="form-select"
                          name="limit"
                          ref={form_limit.form.register({
                            valueAsNumber: true,
                            required: '必須項目です',
                            pattern: {
                              value: /^[0-9]+$/,
                              message: '整数で入力してください',
                            },
                            min: {
                              value: 2,
                              message: '2以上の数字を入力してください',
                            },
                            max: {
                              value: 15,
                              message: '15以下の数字を入力してください',
                            },
                          })}
                        >
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                        </select>

                        <div className="input-group-append">
                          <input
                            className="btn btn-success"
                            type="submit"
                            value=" 変更"
                          />
                        </div>
                      </div>
                    </form>
                  </FormProvider>
                </div>

                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">現在数</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="現在数"
                    readOnly
                    value={room.length}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">メンバ</label>

                  {member()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const usually = () => {
    return (
      <div
        className="modal fade"
        id="detailGroup"
        tabIndex={-1}
        aria-labelledby="detailGroup"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">グループ詳細</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="formGroupExampleInput">グループ名</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                    readOnly
                    value={String(room[0].rname)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput">上限人数</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="上限数"
                    value={String(room[0].limit)}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput">現在数</label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="現在数"
                  readOnly
                  value={room.length}
                />
              </div>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput">メンバ</label>

                {member()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (uid === room[0].hostid) {
    return host();
  }

  return usually();
};
