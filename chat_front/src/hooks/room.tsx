import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import {
  useExit_RoomMutation,
  useTalkQuery,
  useCreate_TalkMutation,
  useUpdate_HostMutation,
  useUpdate_LimitMutation,
  useUpdate_RnameMutation,
  useCreate_BlacklistMutation,
} from '../types.d';
import { firebase } from '../firebase';
import { State } from '../recoil';
import { uid } from '../';

type FormState = {
  message: string;
};

export const useRoomHooks = () => {
  const [, setGlobalLoading] = useRecoilState(State.loading);
  const [talk, setTalk] = useRecoilState(State.talk);
  const [room] = useRecoilState(State.room);

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { message: '' },
  });

  const { data, loading, refetch } = useTalkQuery();

  const [exit_room] = useExit_RoomMutation({
    onCompleted: () => {},
  });

  const [create_talk] = useCreate_TalkMutation({
    onCompleted: () => {},
  });

  const [update_host] = useUpdate_HostMutation({
    onCompleted: () => {
      alert('変更しました');
    },
  });

  const [update_limit] = useUpdate_LimitMutation({
    onCompleted: () => {
      alert('変更しました');
    },
  });

  const [update_rname] = useUpdate_RnameMutation({
    onCompleted: () => {
      alert('変更しました');
    },
  });

  const [create_blaclkist] = useCreate_BlacklistMutation({
    onCompleted: () => {
      alert('追放しました');
    },
  });

  // 画像アップロード
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) {
      return;
    }

    const _s = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const _fileName =
      [...Array(10)]
        .map(() => _s[Math.floor(Math.random() * _s.length)])
        .join('') + new Date().getTime();

    const _storageRef = firebase.storage().ref().child(_fileName);

    // 画像保存
    _storageRef
      .put(e.target.files[0])
      .then(() => {
        _storageRef.getDownloadURL().then(async (url: string) => {
          create_talk({ variables: { message: url, kind: 1 } });
          setGlobalLoading(false);
        });
      })
      .catch(() => {
        alert('画像のサイズは5MBまでです。');
        window.location.reload();
      });
  };

  const on_submit = async (data: FormState) => {
    const _message = data.message;
    methods.reset();

    document.getElementById('textarea')?.blur();

    const user = room.find(m => m.uid === uid);
    const _talk = JSON.parse(JSON.stringify(talk));

    _talk.unshift({
      kind: 0,
      message: data.message,
      createdAt: String(new Date().getTime()),
      uid: uid,
      uname: user?.uname,
      icon: user?.icon,
    });
    setTalk(_talk);

    create_talk({ variables: { message: _message, kind: 0 } });

    setTimeout(() => {
      document.getElementById('textarea')?.focus();
    }, 500);
  };

  return {
    data,
    loading,
    exit_room,
    methods,
    on_submit,
    update_host,
    update_limit,
    update_rname,
    create_blaclkist,
    refetch,
    uploadImage,
  };
};
