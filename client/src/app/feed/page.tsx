"use client";
import React from 'react';
import PostForm from '@/app/components/PostForm';
import Post from '@/app/components/Post';
import { useGetPostsQuery } from '@/state/api';

const Feed: React.FC = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching posts:', error);
    return (
      <div>
        Error loading posts: {(error as any).status} - {(error as any).error}
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-2xl">
      <PostForm />
      <div className="space-y-6 mt-6">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;