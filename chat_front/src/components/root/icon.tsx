import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Constant } from '../../constant';

export const Icon = () => {
  const { register, setValue } = useFormContext();
  const [icon, setIcon] = React.useState(0);

  return (
    <>
      <input type="hidden" name="icon" ref={register({ required: true })} />
      {[...Array(Constant.icon_number)].map((_, i) => {
        return (
          <li style={{ margin: 3 }} key={i}>
            <img
              src={`/img/${i}.png`}
              alt=""
              width="52"
              style={{
                background: Constant.icon_colors[i],
                opacity: icon === i ? 1.0 : 0.3,
              }}
              onClick={() => {
                setIcon(i);
                setValue('icon', i);
              }}
            />
          </li>
        );
      })}
    </>
  );
};
