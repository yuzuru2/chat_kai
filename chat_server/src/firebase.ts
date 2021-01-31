import * as admin from 'firebase-admin';
import { Constant } from './constant';

require('dotenv').config();

type T_Room = {
  info: {
    limit: number;
    rname: string;
    hostid: string;
    createdAt: number;
  };
  member: {
    [key: string]: {
      uname: string;
      icon: number;
      updatedAt: number;
    } | null;
  };
  blacklist?: {
    [key: string]: {
      createdAt: number;
    };
  };
};

type T_User = {
  [key: string]: {
    rid: string;
    uname: string;
    icon: number;
    createdAt: number;
  };
};

type T_Talk = {
  [key: string]: {
    [key: string]: {
      uid: string;
      icon: number;
      uname: string;
      message: string;
      kind: number;
      createdAt: number;
    };
  };
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE as string) as any
    ),
    databaseURL: Constant.firebase_database_url,
  });
}

const create_system_message = async (rid: string, message: string) => {
  admin.database().ref(Constant.firebase_databases.talks).child(rid).push({
    uid: 'system',
    icon: 0,
    uname: 'system',
    message: message,
    kind: 2,
    createdAt: new Date().getTime(),
  });
};

export const check_user = async (uid: string, rid: string) => {
  const ret = await admin
    .database()
    .ref(Constant.firebase_databases.rooms)
    .child(rid)
    .child('member')
    .child(uid)
    .once('value');

  const value: T_Room['member']['key'] = ret.val();

  if (value == null) {
    return null;
  }

  return value;
};

export const get_uid = async (token: string) => {
  return await (await admin.auth().verifyIdToken(token)).uid;
};

export const create_room = async (params: {
  user: {
    uid: string;
    uname: string;
    icon: number;
  };
  room: {
    rname: string;
    rid: string;
    limit: number;
  };
}) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + params.room.rid);
  await upvotesRef.transaction((value: T_Room) => {
    if (value !== null) {
      return value;
    }

    return {
      info: {
        limit: params.room.limit,
        rname: params.room.rname,
        hostid: params.user.uid,
        createdAt: new Date().getTime(),
      },
      member: {
        [params.user.uid]: {
          uname: params.user.uname,
          icon: params.user.icon,
          updatedAt: new Date().getTime(),
        },
      },
    };
  });
};

export const join_room = async (params: {
  user: {
    uid: string;
    uname: string;
    icon: number;
  };
  room: {
    rid: string;
  };
}) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + params.room.rid);

  await upvotesRef.transaction((value: T_Room) => {
    if (value == null) {
      return value;
    }

    // メンバなら
    if (value['member'][params.user.uid] != null) {
      return value;
    }

    // ブラックリストか
    if (value['blacklist'] != null) {
      if (
        Object.keys(value['blacklist']).find(m => m === params.user.uid) != null
      ) {
        return value;
      }
    }

    if (value['info']['limit'] > Object.keys(value['member']).length) {
      value['member'][params.user.uid] = {
        uname: params.user.uname,
        icon: params.user.icon,
        updatedAt: new Date().getTime(),
      };

      create_system_message(
        params.room.rid,
        `--${params.user.uname}さんが入室しました`
      );

      return value;
    }

    return value;
  });
};

export const exit_room = async (uid: string, rid: string) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);

  await upvotesRef.transaction((value: T_Room) => {
    if (value == null) {
      return value;
    }

    // メンバでないなら
    if (value['member'][uid] == null) {
      return value;
    }

    // 一人なら部屋つぶす
    if (Object.keys(value['member']).length === 1) {
      create_system_message(
        rid,
        `--${value['member'][uid]?.uname}さんが退室しました`
      );

      return null;
    }

    // hostでないなら退室
    if (value['info']['hostid'] !== uid) {
      create_system_message(
        rid,
        `--${value['member'][uid]?.uname}さんが退室しました`
      );

      value['member'][uid] = null;

      return value;
    }

    // 権限移譲して退室
    const transfer = Object.keys(value['member']).find(
      m => m !== uid
    ) as string;

    const _uname = value['member'][uid]?.uname;

    value['info']['hostid'] = transfer;
    value['member'][uid] = null;

    create_system_message(
      rid,
      `--${value['member'][transfer]?.uname}さんに権限を移譲しました`
    );

    create_system_message(rid, `--${_uname}さんが退室しました`);

    return value;
  });
};

export const create_blacklist = async (
  hostid: string,
  rid: string,
  bid: string
) => {
  if (hostid === bid) {
    return;
  }

  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);

  await upvotesRef.transaction((value: T_Room) => {
    if (value == null) {
      return value;
    }

    // ホストでないなら
    if (hostid !== value['info']['hostid']) {
      return value;
    }

    // メンバでないなら
    if (value['member'][bid] == null) {
      return value;
    }

    // ブラックリスト入り
    value['blacklist'] = {
      [bid]: {
        createdAt: new Date().getTime(),
      },
    };

    create_system_message(
      rid,
      `--${value['member'][bid]?.uname}さんが追放されました`
    );

    // 退室させる
    value['member'][bid] = null;

    return value;
  });
};

export const update_limit = async (uid: string, rid: string, limit: number) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);
  await upvotesRef.transaction((value: T_Room) => {
    if (value == null) {
      return value;
    }

    // ホストでないなら
    if (uid !== value['info']['hostid']) {
      return value;
    }

    value['info']['limit'] = limit;
    return value;
  });
};

export const update_rname = async (uid: string, rid: string, rname: string) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);
  await upvotesRef.transaction((value: T_Room) => {
    if (value == null) {
      return value;
    }

    // ホストでないなら
    if (uid !== value['info']['hostid']) {
      return value;
    }

    value['info']['rname'] = rname;
    return value;
  });
};

export const update_host = async (
  hostid: string,
  rid: string,
  transfer: string
) => {
  if (hostid === transfer) {
    return;
  }

  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);
  await upvotesRef.transaction((value: T_Room) => {
    if (value == null) {
      return value;
    }

    if (hostid === transfer) {
      return value;
    }

    // ホストでないなら
    if (hostid !== value['info']['hostid']) {
      return value;
    }

    // メンバでないなら
    if (value['member'][transfer] == null) {
      return value;
    }

    value['info']['hostid'] = transfer;

    create_system_message(
      rid,
      `--${value['member'][transfer]?.uname}さんに権限を移譲しました`
    );

    return value;
  });
};

export const get_lounge = async () => {
  const result = await admin
    .database()
    .ref(Constant.firebase_databases.rooms)
    .once('value');

  const value: { [key: string]: T_Room } = result.val();

  if (value == null) {
    return [];
  }

  return Object.keys(value).reduce((accumulator, rid) => {
    Object.keys(value[rid]['member']).map(uid => {
      accumulator.push({
        uname: value[rid]['member'][uid]?.uname,
        icon: value[rid]['member'][uid]?.icon,
        rid: rid,
        uid: uid,
        rname: value[rid]['info']['rname'],
        limit: value[rid]['info']['limit'],
        createdAt: String(value[rid]['info']['createdAt']),
      });
    });
    return accumulator;
  }, [] as any[]);
};

export const get_room_info = async (uid: string, rid: string) => {
  const ret = await check_user(uid, rid);
  if (ret == null) {
    return [] as {
      rname: string;
      limit: number;
      createdAt: string;
      uid: string;
      uname: string;
      icon: number;
      updatedAt: string;
    }[];
  }

  const room = await admin
    .database()
    .ref(Constant.firebase_databases.rooms)
    .child(rid)
    .once('value');

  const value: T_Room = room.val();

  if (value == null) {
    return [] as {
      rname: string;
      limit: number;
      createdAt: string;
      uid: string;
      uname: string;
      icon: number;
      updatedAt: string;
    }[];
  }

  return Object.keys(value['member']).map(m => {
    return {
      uname: value['member'][m]?.uname as string,
      uid: m,
      icon: value['member'][m]?.icon as number,
      updatedAt: String(value['member'][m]?.updatedAt) as string,
      hostid: value['info']['hostid'],
      rname: value['info']['rname'],
      rid: rid,
      limit: value['info']['limit'],
      createdAt: String(value['info']['createdAt']),
    };
  });
};

export const create_user = async (params: {
  uid: string;
  icon: number;
  uname: string;
  rid: string;
}) => {
  await admin
    .database()
    .ref(Constant.firebase_databases.users)
    .child(params.uid)
    .update({
      ...params,
      createdAt: new Date().getTime(),
    });
};

export const find_user = async (uid: string) => {
  const ret = await admin
    .database()
    .ref(Constant.firebase_databases.users)
    .child(uid)
    .once('value');

  const value: T_User['key'] = ret.val();

  if (value == null) {
    return null;
  }

  return value;
};

export const create_talk = async (params: {
  uid: string;
  uname: string;
  icon: number;
  rid: string;
  message: string;
  kind: number;
}) => {
  const gimmick = (str: string) => {
    const omikuji_arr = [
      '大吉',
      '中吉',
      '小吉',
      '吉',
      '半吉',
      '末吉',
      '末小吉',
    ];

    const dice_arr = [1, 2, 3, 4, 5, 6];

    switch (str) {
      case 'サイコロ':
        return `サイコロを振って${
          dice_arr[Math.floor(Math.random() * dice_arr.length)]
        }が出ました`;
      case 'おみくじ':
        return `おみくじの結果: ${
          omikuji_arr[Math.floor(Math.random() * omikuji_arr.length)]
        }`;
      default:
        return null;
    }
  };

  const ret = await check_user(params.uid, params.rid);
  if (ret == null) {
    return null;
  }

  await admin
    .database()
    .ref(Constant.firebase_databases.talks)
    .child(params.rid)
    .push({
      ...params,
      createdAt: new Date().getTime(),
    });

  // ギミック
  const _ret = gimmick(params.message);
  if (_ret !== null) {
    await admin
      .database()
      .ref(Constant.firebase_databases.talks)
      .child(params.rid)
      .push({
        ...params,
        createdAt: new Date().getTime(),
        message: _ret,
        kind: 2,
      });
  }
};

export const find_talk = async (params: { uid: string; rid: string }) => {
  const ret = await check_user(params.uid, params.rid);
  if (ret == null) {
    return [] as {
      createdAt: string;
      uid: string;
      icon: number;
      uname: string;
      message: string;
      kind: number;
    }[];
  }

  const talks = await admin
    .database()
    .ref(Constant.firebase_databases.talks)
    .child(params.rid)
    .orderByChild('createdAt')
    .limitToLast(30)
    .once('value');

  const value: T_Talk['key'] = talks.val();
  if (value == null) {
    return [] as {
      createdAt: string;
      uid: string;
      icon: number;
      uname: string;
      message: string;
      kind: number;
    }[];
  }

  return Object.keys(value).map(key => {
    return {
      uid: value[key].uid,
      icon: value[key].icon,
      uname: value[key].uname,
      message: value[key].message,
      kind: value[key].kind,
      createdAt: String(value[key].createdAt),
    };
  });
};

export const delete_user = async (uid: string) => {
  await admin
    .database()
    .ref(Constant.firebase_databases.users)
    .child(uid)
    .remove();
};

export const get_place = async (uid: string) => {
  const user = await find_user(uid);

  if (user == null) {
    return Constant.place.root;
  }

  const rid = user.rid;

  const ret = await check_user(uid, rid);
  if (ret == null) {
    return Constant.place.lounge;
  }

  return Constant.place.room;
};

export const update_rid = async (uid: string, rid: string) => {
  const user = await find_user(uid);
  await admin
    .database()
    .ref(Constant.firebase_databases.users)
    .child(uid)
    .update({
      ...user,
      rid: rid,
    });
};

export const to_blacklist = async (bid: string) => {
  const res = await admin
    .database()
    .ref(Constant.firebase_databases.broadcast)
    .child(bid)
    .push({
      b: 't',
    });

  res.key !== null &&
    (await admin
      .database()
      .ref(Constant.firebase_databases.broadcast)
      .child(res.parent?.key as string)
      .child(res.key as string)
      .remove());
};

export const send = async (bid: string, message: string) => {
  const res = await admin
    .database()
    .ref(Constant.firebase_databases.broadcast)
    .child(bid)
    .push({
      b: message,
    });

  res.key !== null &&
    (await admin
      .database()
      .ref(Constant.firebase_databases.broadcast)
      .child(res.parent?.key as string)
      .child(res.key as string)
      .remove());
};

export const send_members = async (rid: string) => {
  const res = await admin
    .database()
    .ref(Constant.firebase_databases.broadcast)
    .child(rid)
    .push({
      b: 'b',
    });

  res.key !== null &&
    (await admin
      .database()
      .ref(Constant.firebase_databases.broadcast)
      .child(res.parent?.key as string)
      .child(res.key as string)
      .remove());
};
