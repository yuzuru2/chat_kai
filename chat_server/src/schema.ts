export const graphql = `
type Query {
  lounge: Lounge
  talk: Talk
  get_place: String
}

type Mutation {
  login(uname: String!, icon: Int!): String
  logout: String
  create_room(rname: String!, limit: Int!): String
  join_room(rid: String!): String
  exit_room: String
  create_talk(message: String!, kind: Int!): String
  create_blacklist(bid: String!): String
  update_host(transfer: String!): String
  update_rname(rname: String!): String
  update_limit(limit: Int!): String
}

type T_Talk {
  createdAt: String
  uid: String
  icon: Int
  uname: String
  message: String
  kind: Int
}

type T_Room {
  limit: Int
  createdAt: String
  hostid: String
  rname: String
  rid: String
  uid: String
  uname: String
  icon: Int
  updatedAt: String
}

type Talk {
  url: String
  talk: [T_Talk]
  info: [T_Room]
}

type T_Lounge {
  rid: String
  rname: String
  limit: Int
  uid: String
  uname: String
  icon: Int
  createdAt: String
}

type Lounge {
  url: String
  lounge: [T_Lounge]
}
`;
