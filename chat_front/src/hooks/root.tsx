import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { Constant } from '../constant';
import { State } from '../recoil';
import { useLoginMutation, useGet_PlaceQuery } from '../types.d';

export const useRootHooks = () => {
  const methods = useForm();

  const [, setGlobalLoading] = useRecoilState(State.loading);
  const [icon] = useRecoilState(State.icon);

  const [login] = useLoginMutation({
    onCompleted: () => {
      window.location.href = `/${Constant.place.lounge}`;
    },
  });

  const { data, loading } = useGet_PlaceQuery();

  const on_submit = async (data: { name: string }) => {
    setGlobalLoading(true);
    const _name = data.name;
    methods.reset();

    login({
      variables: {
        icon: icon,
        uname: _name,
      },
    });
  };

  return { methods, on_submit, data, loading };
};
