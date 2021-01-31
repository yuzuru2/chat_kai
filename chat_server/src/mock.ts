import { create_user, create_room, join_room, update_rid } from './firebase';

const main = async () => {
  const su = 150;

  let roomid = '';
  for (let i = 0; i < su; i++) {
    const icon = Math.floor(Math.random() * 25);
    // ユーザ作成
    await create_user({
      uid: `uid${i}`,
      uname: `uname${i}`,
      icon: icon,
      rid: 'null',
    });

    if (i % 14 === 0) {
      // 部屋作成
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
          uid: `uid${i}`,
          uname: `uname${i}`,
          icon: icon,
        },
        room: {
          rid: rid,
          rname: `rname:${i}`,
          limit: 15,
        },
      });
      await update_rid(`uid${i}`, rid);
      roomid = rid;
    } else {
      // 入室
      await join_room({
        user: {
          uid: `uid${i}`,
          uname: `uname${i}`,
          icon: icon,
        },
        room: {
          rid: roomid,
        },
      });
      await update_rid(`uid${i}`, roomid);
    }

    console.log(i);
  }
};

main();
