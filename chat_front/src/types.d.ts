import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  lounge?: Maybe<Lounge>;
  talk?: Maybe<Talk>;
  get_place?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Scalars['String']>;
  logout?: Maybe<Scalars['String']>;
  create_room?: Maybe<Scalars['String']>;
  join_room?: Maybe<Scalars['String']>;
  exit_room?: Maybe<Scalars['String']>;
  create_talk?: Maybe<Scalars['String']>;
  create_blacklist?: Maybe<Scalars['String']>;
  update_host?: Maybe<Scalars['String']>;
  update_rname?: Maybe<Scalars['String']>;
  update_limit?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  uname: Scalars['String'];
  icon: Scalars['Int'];
};


export type MutationCreate_RoomArgs = {
  rname: Scalars['String'];
  limit: Scalars['Int'];
};


export type MutationJoin_RoomArgs = {
  rid: Scalars['String'];
};


export type MutationCreate_TalkArgs = {
  message: Scalars['String'];
  kind: Scalars['Int'];
};


export type MutationCreate_BlacklistArgs = {
  bid: Scalars['String'];
};


export type MutationUpdate_HostArgs = {
  transfer: Scalars['String'];
};


export type MutationUpdate_RnameArgs = {
  rname: Scalars['String'];
};


export type MutationUpdate_LimitArgs = {
  limit: Scalars['Int'];
};

export type T_Talk = {
  __typename?: 'T_Talk';
  createdAt?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['Int']>;
  uname?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['Int']>;
};

export type T_Room = {
  __typename?: 'T_Room';
  limit?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  hostid?: Maybe<Scalars['String']>;
  rname?: Maybe<Scalars['String']>;
  rid?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  uname?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Talk = {
  __typename?: 'Talk';
  url?: Maybe<Scalars['String']>;
  talk?: Maybe<Array<Maybe<T_Talk>>>;
  info?: Maybe<Array<Maybe<T_Room>>>;
};

export type T_Lounge = {
  __typename?: 'T_Lounge';
  rid?: Maybe<Scalars['String']>;
  rname?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
  uname?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
};

export type Lounge = {
  __typename?: 'Lounge';
  url?: Maybe<Scalars['String']>;
  lounge?: Maybe<Array<Maybe<T_Lounge>>>;
};

export type LoungeQueryVariables = Exact<{ [key: string]: never; }>;


export type LoungeQuery = (
  { __typename?: 'Query' }
  & { lounge?: Maybe<(
    { __typename?: 'Lounge' }
    & Pick<Lounge, 'url'>
    & { lounge?: Maybe<Array<Maybe<(
      { __typename?: 'T_Lounge' }
      & Pick<T_Lounge, 'rid' | 'rname' | 'limit' | 'uid' | 'uname' | 'icon' | 'createdAt'>
    )>>> }
  )> }
);

export type TalkQueryVariables = Exact<{ [key: string]: never; }>;


export type TalkQuery = (
  { __typename?: 'Query' }
  & { talk?: Maybe<(
    { __typename?: 'Talk' }
    & Pick<Talk, 'url'>
    & { talk?: Maybe<Array<Maybe<(
      { __typename?: 'T_Talk' }
      & Pick<T_Talk, 'createdAt' | 'uid' | 'icon' | 'uname' | 'message' | 'kind'>
    )>>>, info?: Maybe<Array<Maybe<(
      { __typename?: 'T_Room' }
      & Pick<T_Room, 'limit' | 'createdAt' | 'hostid' | 'rname' | 'rid' | 'uid' | 'uname' | 'icon' | 'updatedAt'>
    )>>> }
  )> }
);

export type Get_PlaceQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_PlaceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'get_place'>
);

export type LoginMutationVariables = Exact<{
  uname: Scalars['String'];
  icon: Scalars['Int'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type Create_RoomMutationVariables = Exact<{
  rname: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type Create_RoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'create_room'>
);

export type Join_RoomMutationVariables = Exact<{
  rid: Scalars['String'];
}>;


export type Join_RoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'join_room'>
);

export type Exit_RoomMutationVariables = Exact<{ [key: string]: never; }>;


export type Exit_RoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'exit_room'>
);

export type Create_TalkMutationVariables = Exact<{
  message: Scalars['String'];
  kind: Scalars['Int'];
}>;


export type Create_TalkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'create_talk'>
);

export type Create_BlacklistMutationVariables = Exact<{
  bid: Scalars['String'];
}>;


export type Create_BlacklistMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'create_blacklist'>
);

export type Update_HostMutationVariables = Exact<{
  transfer: Scalars['String'];
}>;


export type Update_HostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'update_host'>
);

export type Update_RnameMutationVariables = Exact<{
  rname: Scalars['String'];
}>;


export type Update_RnameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'update_rname'>
);

export type Update_LimitMutationVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type Update_LimitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'update_limit'>
);


export const LoungeDocument = gql`
    query lounge {
  lounge {
    url
    lounge {
      rid
      rname
      limit
      uid
      uname
      icon
      createdAt
    }
  }
}
    `;

/**
 * __useLoungeQuery__
 *
 * To run a query within a React component, call `useLoungeQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoungeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoungeQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoungeQuery(baseOptions?: Apollo.QueryHookOptions<LoungeQuery, LoungeQueryVariables>) {
        return Apollo.useQuery<LoungeQuery, LoungeQueryVariables>(LoungeDocument, baseOptions);
      }
export function useLoungeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoungeQuery, LoungeQueryVariables>) {
          return Apollo.useLazyQuery<LoungeQuery, LoungeQueryVariables>(LoungeDocument, baseOptions);
        }
export type LoungeQueryHookResult = ReturnType<typeof useLoungeQuery>;
export type LoungeLazyQueryHookResult = ReturnType<typeof useLoungeLazyQuery>;
export type LoungeQueryResult = Apollo.QueryResult<LoungeQuery, LoungeQueryVariables>;
export const TalkDocument = gql`
    query talk {
  talk {
    url
    talk {
      createdAt
      uid
      icon
      uname
      message
      kind
    }
    info {
      limit
      createdAt
      hostid
      rname
      rid
      uid
      uname
      icon
      updatedAt
    }
  }
}
    `;

/**
 * __useTalkQuery__
 *
 * To run a query within a React component, call `useTalkQuery` and pass it any options that fit your needs.
 * When your component renders, `useTalkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTalkQuery({
 *   variables: {
 *   },
 * });
 */
export function useTalkQuery(baseOptions?: Apollo.QueryHookOptions<TalkQuery, TalkQueryVariables>) {
        return Apollo.useQuery<TalkQuery, TalkQueryVariables>(TalkDocument, baseOptions);
      }
export function useTalkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TalkQuery, TalkQueryVariables>) {
          return Apollo.useLazyQuery<TalkQuery, TalkQueryVariables>(TalkDocument, baseOptions);
        }
export type TalkQueryHookResult = ReturnType<typeof useTalkQuery>;
export type TalkLazyQueryHookResult = ReturnType<typeof useTalkLazyQuery>;
export type TalkQueryResult = Apollo.QueryResult<TalkQuery, TalkQueryVariables>;
export const Get_PlaceDocument = gql`
    query get_place {
  get_place
}
    `;

/**
 * __useGet_PlaceQuery__
 *
 * To run a query within a React component, call `useGet_PlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_PlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_PlaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_PlaceQuery(baseOptions?: Apollo.QueryHookOptions<Get_PlaceQuery, Get_PlaceQueryVariables>) {
        return Apollo.useQuery<Get_PlaceQuery, Get_PlaceQueryVariables>(Get_PlaceDocument, baseOptions);
      }
export function useGet_PlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_PlaceQuery, Get_PlaceQueryVariables>) {
          return Apollo.useLazyQuery<Get_PlaceQuery, Get_PlaceQueryVariables>(Get_PlaceDocument, baseOptions);
        }
export type Get_PlaceQueryHookResult = ReturnType<typeof useGet_PlaceQuery>;
export type Get_PlaceLazyQueryHookResult = ReturnType<typeof useGet_PlaceLazyQuery>;
export type Get_PlaceQueryResult = Apollo.QueryResult<Get_PlaceQuery, Get_PlaceQueryVariables>;
export const LoginDocument = gql`
    mutation login($uname: String!, $icon: Int!) {
  login(uname: $uname, icon: $icon)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      uname: // value for 'uname'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const Create_RoomDocument = gql`
    mutation create_room($rname: String!, $limit: Int!) {
  create_room(rname: $rname, limit: $limit)
}
    `;
export type Create_RoomMutationFn = Apollo.MutationFunction<Create_RoomMutation, Create_RoomMutationVariables>;

/**
 * __useCreate_RoomMutation__
 *
 * To run a mutation, you first call `useCreate_RoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_RoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreate_RoomMutation({
 *   variables: {
 *      rname: // value for 'rname'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCreate_RoomMutation(baseOptions?: Apollo.MutationHookOptions<Create_RoomMutation, Create_RoomMutationVariables>) {
        return Apollo.useMutation<Create_RoomMutation, Create_RoomMutationVariables>(Create_RoomDocument, baseOptions);
      }
export type Create_RoomMutationHookResult = ReturnType<typeof useCreate_RoomMutation>;
export type Create_RoomMutationResult = Apollo.MutationResult<Create_RoomMutation>;
export type Create_RoomMutationOptions = Apollo.BaseMutationOptions<Create_RoomMutation, Create_RoomMutationVariables>;
export const Join_RoomDocument = gql`
    mutation join_room($rid: String!) {
  join_room(rid: $rid)
}
    `;
export type Join_RoomMutationFn = Apollo.MutationFunction<Join_RoomMutation, Join_RoomMutationVariables>;

/**
 * __useJoin_RoomMutation__
 *
 * To run a mutation, you first call `useJoin_RoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoin_RoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoin_RoomMutation({
 *   variables: {
 *      rid: // value for 'rid'
 *   },
 * });
 */
export function useJoin_RoomMutation(baseOptions?: Apollo.MutationHookOptions<Join_RoomMutation, Join_RoomMutationVariables>) {
        return Apollo.useMutation<Join_RoomMutation, Join_RoomMutationVariables>(Join_RoomDocument, baseOptions);
      }
export type Join_RoomMutationHookResult = ReturnType<typeof useJoin_RoomMutation>;
export type Join_RoomMutationResult = Apollo.MutationResult<Join_RoomMutation>;
export type Join_RoomMutationOptions = Apollo.BaseMutationOptions<Join_RoomMutation, Join_RoomMutationVariables>;
export const Exit_RoomDocument = gql`
    mutation exit_room {
  exit_room
}
    `;
export type Exit_RoomMutationFn = Apollo.MutationFunction<Exit_RoomMutation, Exit_RoomMutationVariables>;

/**
 * __useExit_RoomMutation__
 *
 * To run a mutation, you first call `useExit_RoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExit_RoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exitRoomMutation, { data, loading, error }] = useExit_RoomMutation({
 *   variables: {
 *   },
 * });
 */
export function useExit_RoomMutation(baseOptions?: Apollo.MutationHookOptions<Exit_RoomMutation, Exit_RoomMutationVariables>) {
        return Apollo.useMutation<Exit_RoomMutation, Exit_RoomMutationVariables>(Exit_RoomDocument, baseOptions);
      }
export type Exit_RoomMutationHookResult = ReturnType<typeof useExit_RoomMutation>;
export type Exit_RoomMutationResult = Apollo.MutationResult<Exit_RoomMutation>;
export type Exit_RoomMutationOptions = Apollo.BaseMutationOptions<Exit_RoomMutation, Exit_RoomMutationVariables>;
export const Create_TalkDocument = gql`
    mutation create_talk($message: String!, $kind: Int!) {
  create_talk(message: $message, kind: $kind)
}
    `;
export type Create_TalkMutationFn = Apollo.MutationFunction<Create_TalkMutation, Create_TalkMutationVariables>;

/**
 * __useCreate_TalkMutation__
 *
 * To run a mutation, you first call `useCreate_TalkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_TalkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTalkMutation, { data, loading, error }] = useCreate_TalkMutation({
 *   variables: {
 *      message: // value for 'message'
 *      kind: // value for 'kind'
 *   },
 * });
 */
export function useCreate_TalkMutation(baseOptions?: Apollo.MutationHookOptions<Create_TalkMutation, Create_TalkMutationVariables>) {
        return Apollo.useMutation<Create_TalkMutation, Create_TalkMutationVariables>(Create_TalkDocument, baseOptions);
      }
export type Create_TalkMutationHookResult = ReturnType<typeof useCreate_TalkMutation>;
export type Create_TalkMutationResult = Apollo.MutationResult<Create_TalkMutation>;
export type Create_TalkMutationOptions = Apollo.BaseMutationOptions<Create_TalkMutation, Create_TalkMutationVariables>;
export const Create_BlacklistDocument = gql`
    mutation create_blacklist($bid: String!) {
  create_blacklist(bid: $bid)
}
    `;
export type Create_BlacklistMutationFn = Apollo.MutationFunction<Create_BlacklistMutation, Create_BlacklistMutationVariables>;

/**
 * __useCreate_BlacklistMutation__
 *
 * To run a mutation, you first call `useCreate_BlacklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_BlacklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlacklistMutation, { data, loading, error }] = useCreate_BlacklistMutation({
 *   variables: {
 *      bid: // value for 'bid'
 *   },
 * });
 */
export function useCreate_BlacklistMutation(baseOptions?: Apollo.MutationHookOptions<Create_BlacklistMutation, Create_BlacklistMutationVariables>) {
        return Apollo.useMutation<Create_BlacklistMutation, Create_BlacklistMutationVariables>(Create_BlacklistDocument, baseOptions);
      }
export type Create_BlacklistMutationHookResult = ReturnType<typeof useCreate_BlacklistMutation>;
export type Create_BlacklistMutationResult = Apollo.MutationResult<Create_BlacklistMutation>;
export type Create_BlacklistMutationOptions = Apollo.BaseMutationOptions<Create_BlacklistMutation, Create_BlacklistMutationVariables>;
export const Update_HostDocument = gql`
    mutation update_host($transfer: String!) {
  update_host(transfer: $transfer)
}
    `;
export type Update_HostMutationFn = Apollo.MutationFunction<Update_HostMutation, Update_HostMutationVariables>;

/**
 * __useUpdate_HostMutation__
 *
 * To run a mutation, you first call `useUpdate_HostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_HostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHostMutation, { data, loading, error }] = useUpdate_HostMutation({
 *   variables: {
 *      transfer: // value for 'transfer'
 *   },
 * });
 */
export function useUpdate_HostMutation(baseOptions?: Apollo.MutationHookOptions<Update_HostMutation, Update_HostMutationVariables>) {
        return Apollo.useMutation<Update_HostMutation, Update_HostMutationVariables>(Update_HostDocument, baseOptions);
      }
export type Update_HostMutationHookResult = ReturnType<typeof useUpdate_HostMutation>;
export type Update_HostMutationResult = Apollo.MutationResult<Update_HostMutation>;
export type Update_HostMutationOptions = Apollo.BaseMutationOptions<Update_HostMutation, Update_HostMutationVariables>;
export const Update_RnameDocument = gql`
    mutation update_rname($rname: String!) {
  update_rname(rname: $rname)
}
    `;
export type Update_RnameMutationFn = Apollo.MutationFunction<Update_RnameMutation, Update_RnameMutationVariables>;

/**
 * __useUpdate_RnameMutation__
 *
 * To run a mutation, you first call `useUpdate_RnameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_RnameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRnameMutation, { data, loading, error }] = useUpdate_RnameMutation({
 *   variables: {
 *      rname: // value for 'rname'
 *   },
 * });
 */
export function useUpdate_RnameMutation(baseOptions?: Apollo.MutationHookOptions<Update_RnameMutation, Update_RnameMutationVariables>) {
        return Apollo.useMutation<Update_RnameMutation, Update_RnameMutationVariables>(Update_RnameDocument, baseOptions);
      }
export type Update_RnameMutationHookResult = ReturnType<typeof useUpdate_RnameMutation>;
export type Update_RnameMutationResult = Apollo.MutationResult<Update_RnameMutation>;
export type Update_RnameMutationOptions = Apollo.BaseMutationOptions<Update_RnameMutation, Update_RnameMutationVariables>;
export const Update_LimitDocument = gql`
    mutation update_limit($limit: Int!) {
  update_limit(limit: $limit)
}
    `;
export type Update_LimitMutationFn = Apollo.MutationFunction<Update_LimitMutation, Update_LimitMutationVariables>;

/**
 * __useUpdate_LimitMutation__
 *
 * To run a mutation, you first call `useUpdate_LimitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_LimitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLimitMutation, { data, loading, error }] = useUpdate_LimitMutation({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUpdate_LimitMutation(baseOptions?: Apollo.MutationHookOptions<Update_LimitMutation, Update_LimitMutationVariables>) {
        return Apollo.useMutation<Update_LimitMutation, Update_LimitMutationVariables>(Update_LimitDocument, baseOptions);
      }
export type Update_LimitMutationHookResult = ReturnType<typeof useUpdate_LimitMutation>;
export type Update_LimitMutationResult = Apollo.MutationResult<Update_LimitMutation>;
export type Update_LimitMutationOptions = Apollo.BaseMutationOptions<Update_LimitMutation, Update_LimitMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    