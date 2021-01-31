export class Constant {
  constructor() {
    throw new Error('');
  }

  static get firebase_databases() {
    return {
      broadcast: 'broadcast',
      rooms: 'rooms',
      users: 'users',
      talks: 'talks',
    };
  }

  static get origin() {
    return [`https://chat-front.vercel.app`];
  }

  static get firebase_database_url() {
    return 'https://chat-a6259-default-rtdb.firebaseio.com';
  }

  static get place() {
    return {
      root: 'root',
      lounge: 'lounge',
      room: 'room',
    };
  }
}
