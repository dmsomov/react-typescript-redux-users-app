import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, USERS_TAGS } from '../../constants';
import { User } from '../../types/user';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: USERS_TAGS,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: USERS_TAGS,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: USERS_TAGS,
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersAPI;
