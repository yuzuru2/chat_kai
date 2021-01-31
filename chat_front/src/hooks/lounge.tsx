import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { Constant } from '../constant';
import { State } from '../recoil';
import {
  useLogoutMutation,
  useLoungeQuery,
  useCreate_RoomMutation,
  useJoin_RoomMutation,
} from '../types.d';

type FormState = {
  rname: string;
  limit: number;
};

export const useLoungeHooks = () => {
  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { rname: '', limit: 5 },
  });

  const [, setGlobalLoading] = useRecoilState(State.loading);

  const { data, loading } = useLoungeQuery();

  const [join_room] = useJoin_RoomMutation({
    onCompleted: () => {},
  });

  const [logout] = useLogoutMutation({
    onCompleted: () => {
      window.location.href = '/';
    },
  });

  const [create_room] = useCreate_RoomMutation({
    onCompleted: () => {
      window.location.href = `/${Constant.place.room}`;
    },
  });

  const on_submit = async (data: FormState) => {
    setGlobalLoading(true);
    const _rname = data.rname;
    methods.reset();
    create_room({ variables: { rname: _rname, limit: data.limit } });
  };

  return { logout, data, loading, methods, on_submit, join_room };
};
