import React from 'react';
import { Constant } from '../../constant';
import { useRecoilState } from 'recoil';
import { State } from '../../recoil';

export const Icon = () => {
  const [icon, setIcon] = useRecoilState(State.icon);

  return React.useMemo(() => {
    return (
      <>
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
                onClick={() => setIcon(i)}
              />
            </li>
          );
        })}
      </>
    );
  }, [icon, setIcon]);
};
