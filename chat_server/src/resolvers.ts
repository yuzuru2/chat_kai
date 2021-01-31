import { Constant } from './constant';
import { custom_request } from './interface';
import {
  create_user,
  get_lounge,
  delete_user,
  create_room,
  get_place,
  join_room,
  exit_room,
  update_rid,
  create_talk,
  find_talk,
  update_limit,
  update_rname,
  update_host,
  create_blacklist,
  get_room_info,
  to_blacklist,
  send,
  send_members,
} from './firebase';

export const resolvers = {
  get_place: (args: null, req: custom_request) => {
    return req.query.place;
  },

  create_blacklist: async (args: { bid: string }, req: custom_request) => {
    if (req.query.place !== Constant.place.room) {
      return req.query.place;
    }

    await create_blacklist(req.query.uid, req.query.rid, args.bid);

    await to_blacklist(args.bid);
    await send_members(req.query.rid);

    return req.query.place;
  },

  update_host: async (args: { transfer: string }, req: custom_request) => {
    if (req.query.place !== Constant.place.room) {
      return req.query.place;
    }

    await update_host(req.query.uid, req.query.rid, args.transfer);

    await send_members(req.query.rid);
    return req.query.place;
  },

  update_rname: async (args: { rname: string }, req: custom_request) => {
    if (args.rname.length > 20 || args.rname.length === 0) {
      return req.query.place;
    }

    if (req.query.place !== Constant.place.room) {
      return req.query.place;
    }

    await update_rname(req.query.uid, req.query.rid, args.rname);

    await send_members(req.query.rid);

    return req.query.place;
  },

  update_limit: async (args: { limit: number }, req: custom_request) => {
    if (args.limit < 2 || args.limit > 15) {
      return req.query.place;
    }

    if (req.query.place !== Constant.place.room) {
      return req.query.place;
    }

    await update_limit(req.query.uid, req.query.rid, args.limit);

    await send_members(req.query.rid);
    return req.query.place;
  },

  talk: async (args: null, req: custom_request) => {
    if (req.query.place !== Constant.place.room) {
      return { url: req.query.place };
    }

    return {
      url: req.query.place,
      talk: await find_talk({ uid: req.query.uid, rid: req.query.rid }),
      info: await get_room_info(req.query.uid, req.query.rid),
    };
  },

  create_talk: async (
    args: { message: string; kind: number },
    req: custom_request
  ) => {
    if (args.message.length > 150 || args.message.length === 0) {
      return req.query.place;
    }

    if (args.kind < 0 || args.kind > 1) {
      return req.query.place;
    }

    if (req.query.place !== Constant.place.room) {
      return req.query.place;
    }

    await create_talk({
      uid: req.query.uid,
      uname: req.query.uname,
      icon: Number(req.query.icon),
      rid: req.query.rid,
      message: args.message,
      kind: args.kind,
    });

    await send_members(req.query.rid);
    return req.query.place;
  },

  create_room: async (
    args: { rname: string; limit: number },
    req: custom_request
  ) => {
    if (args.rname.length > 20 || args.rname.length === 0) {
      return req.query.place;
    }

    if (args.limit < 2 || args.limit > 15) {
      return req.query.place;
    }

    if (req.query.place !== Constant.place.lounge) {
      return req.query.place;
    }

    const rid = String(
      [...Array(15)]
        .map(
          () =>
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[
              Math.floor(Math.random() * 62)
            ]
        )
        .join('') + new Date().getTime()
    );

    await create_room({
      user: {
        uid: req.query.uid,
        uname: req.query.uname,
        icon: Number(req.query.icon),
      },
      room: {
        rname: args.rname,
        limit: args.limit,
        rid: rid,
      },
    });

    await update_rid(req.query.uid, rid);

    return await get_place(req.query.uid);
  },

  join_room: async (args: { rid: string }, req: custom_request) => {
    if (req.query.place !== Constant.place.lounge) {
      return req.query.place;
    }

    await join_room({
      user: {
        uid: req.query.uid,
        uname: req.query.uname,
        icon: Number(req.query.icon),
      },
      room: {
        rid: args.rid,
      },
    });

    await update_rid(req.query.uid, args.rid);

    await send(req.query.uid, 'join');
    await send_members(args.rid);

    return await get_place(req.query.uid);
  },

  exit_room: async (args: null, req: custom_request) => {
    if (req.query.place !== Constant.place.room) {
      return req.query.place;
    }

    await exit_room(req.query.uid, req.query.rid);

    await send(req.query.uid, 'exit');
    await send_members(req.query.rid);

    return await get_place(req.query.uid);
  },

  login: async (args: { uname: string; icon: number }, req: custom_request) => {
    if (args.uname.length > 15 || args.uname.length === 0) {
      return req.query.place;
    }

    if (args.icon < 0 || args.icon > 25) {
      return req.query.place;
    }

    if (req.query.place !== Constant.place.root) {
      return req.query.place;
    }

    await create_user({
      uid: req.query.uid,
      icon: args.icon,
      uname: args.uname,
      rid: 'null',
    });

    return Constant.place.lounge;
  },

  logout: async (_: null, req: custom_request) => {
    if (req.query.place !== Constant.place.lounge) {
      return req.query.place;
    }

    await delete_user(req.query.uid);
    return Constant.place.root;
  },

  lounge: async (_: null, req: custom_request) => {
    if (req.query.place !== Constant.place.lounge) {
      return { url: req.query.place };
    }

    return { url: Constant.place.lounge, lounge: await get_lounge() };
  },
};
