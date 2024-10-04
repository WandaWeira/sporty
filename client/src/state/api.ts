import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  ninNumber: string;
  email: string;
  password: string;
  role: string;
}


// Define the API
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession(); // Get the session from NextAuth

      if (session?.token) {
        headers.set('Authorization', `Bearer ${session.token}`);
      }

      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  reducerPath: 'api',
  tagTypes: [
    'Users'
  ],
  endpoints: (build) => ({
    // Users endpoints
    getUsers: build.query<User[], void>({
      query: () => 'user/users',
      providesTags: ['Users'],
    }),

  }),
});

// Export hooks
export const { 
  useGetUsersQuery,
} = api;
