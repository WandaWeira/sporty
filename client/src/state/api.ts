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

export interface Post {
  id: number;
  content: string;
  videoUrl?: string;
  isApproved: boolean;
  likesCount: number;
  sharesCount: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
}

// Define the API
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as any;
      const token = state.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'api',
  tagTypes: [
    'Users','Posts'
  ],
  endpoints: (build) => ({
    // Users endpoints
    getUsers: build.query<User[], void>({
      query: () => 'user/users',
      providesTags: ['Users'],
    }),
    login: build.mutation<{ user: User; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: build.mutation<{ user: User; token: string }, Partial<User>>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<Post, FormData>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    likePost: build.mutation<void, number>({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: build.mutation<void, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Posts'],
    }),
    sharePost: build.mutation<void, number>({
      query: (postId) => ({
        url: `posts/${postId}/share`,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),

  }),
});

// Export hooks
export const { 
  useGetUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
  useSharePostMutation,
} = api;
