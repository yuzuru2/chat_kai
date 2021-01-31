import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useLoungeHooks } from '../../hooks/lounge';

export const GroupModal = () => {
  const { methods, on_submit } = useLoungeHooks();

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(on_submit)}>
          <div
            className="modal fade"
            id="createGroup"
            tabIndex={-1}
            aria-labelledby="createGroup"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="createGroup">
                    グループ作成
                  </h5>
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
                    <input
                      name="rname"
                      maxLength={20}
                      required
                      ref={methods.register({
                        required: true,
                        maxLength: 20,
                      })}
                      className="form-control"
                      placeholder="グループ名"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">上限人数</label>
                    <select
                      className="form-select"
                      name="limit"
                      ref={methods.register({
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
                  </div>
                </div>

                <div className="modal-footer">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="作成"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
