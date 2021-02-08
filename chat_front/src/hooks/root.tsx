import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { Constant } from '../constant';
import { State } from '../recoil';
import { useLoginMutation, useGet_PlaceQuery } from '../types.d';

type FormState = {
  name: string;
  icon: number;
};

export const useRootHooks = () => {
  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { name: '', icon: 0 },
  });

  const [, setGlobalLoading] = useRecoilState(State.loading);

  const [login] = useLoginMutation({
    onCompleted: () => {
      window.location.href = `/${Constant.place.lounge}`;
    },
  });

  const { data, loading } = useGet_PlaceQuery();

  const on_submit = async (data: FormState) => {
    setGlobalLoading(true);
    const _name = data.name;
    methods.reset();

    login({
      variables: {
        icon: Number(data.icon),
        uname: _name,
      },
    });
  };

  return { methods, on_submit, data, loading };
};
