export class Constant {
  constructor() {
    throw new Error('');
  }

  static get title() {
    return 'グループチャット';
  }

  static get place() {
    return {
      root: 'root',
      lounge: 'lounge',
      room: 'room',
    };
  }

  static get icon_number() {
    return 26;
  }

  static get icon_colors() {
    return [
      '#3366cc', // 0
      '#ff66cc', // 1
      '#996666', // 2
      '#ffcc66', // 3
      '#ccffff', // 4
      '#ffccff', // 5
      '#336699', // 6
      '#9933cc', // 7
      '#996633', // 8
      '#339900', // 9
      '#ff9999', // 10
      '#cccc66', // 11
      '#3366ff', // 12
      '#66ff00', // 13
      '#ff6666', // 14
      '#993333', // 15
      '#9999cc', // 16
      '#ffcc33', // 17
      '#ff66ff', // 18
      '#666633', // 19
      'lightgreen', // 20
      'lightblue', // 21
      'lightpink', // 22
      '#ccccff', // 23
      '#ff9872', // 24
      'rgb(235, 170, 213)', // 25
    ];
  }

  static get firebase_databases() {
    return { broadcast: 'broadcast' };
  }

  static get graphql_url() {
    return {
      development: `http://192.168.0.4:4000/graphql`,
      production: 'https://chat-server-ebon.vercel.app/graphql',
      test: '',
    };
  }
}
