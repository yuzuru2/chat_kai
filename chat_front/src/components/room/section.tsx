import React from 'react';
import { useRecoilState } from 'recoil';
import { FormProvider } from 'react-hook-form';
import { useRoomHooks } from '../../hooks/room';
import { State } from '../../recoil';

import { Talk } from './talk';
export const Section = () => {
  const [talk] = useRecoilState(State.talk);
  const { methods, on_submit, uploadImage } = useRoomHooks();

  return (
    <>
      <section>
        <label>
          <span className="btn btn-info">
            画像アップロード
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={e => uploadImage(e)}
            />
          </span>
        </label>

        <hr />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(on_submit)}
            onKeyDown={e =>
              e.key === 'Enter' && document.getElementById('submit')?.click()
            }
          >
            <div className="form-group">
              <textarea
                style={{ maxWidth: 400, margin: '0 auto' }}
                className="form-control"
                id="textarea"
                placeholder="メッセージ 150文字以内"
                rows={3}
                name="message"
                maxLength={150}
                required
                ref={methods.register({
                  required: true,
                  maxLength: 150,
                })}
              ></textarea>
            </div>

            <div className="text-center">
              <input
                type="submit"
                className="btn btn-primary"
                value="投稿"
                id="submit"
              />
            </div>
          </form>
        </FormProvider>

        <hr />

        <p>最新30件</p>

        <div className="line-bc">
          <Talk talk={talk} />
        </div>
      </section>
    </>
  );
};
