import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { useLikePostMutation, useAddCommentMutation, useSharePostMutation } from '@/state/api';

interface PostProps {
  post: {
    id: number;
    author: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [likePost] = useLikePostMutation();
  const [addComment] = useAddCommentMutation();
  const [sharePost] = useSharePostMutation();

  const handleLike = async () => {
    try {
      await likePost(post.id);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment({ postId: post.id, content: commentContent });
      setCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleShare = async () => {
    try {
      await sharePost(post.id);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${post.author}&background=random`}
          alt={post.author}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">{post.author}</h3>
          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      {post.imageUrl && (
        <img src={`http://localhost:3001${post.imageUrl}`} alt="Post image" className="mb-4 rounded-lg max-w-full h-auto" />
      )}
      {post.videoUrl && (
        <video src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${post.videoUrl}`} controls className="mb-4 rounded-lg max-w-full h-auto" />
      )}
      <div className="flex justify-between items-center text-gray-500">
        <button onClick={handleLike} className="flex items-center space-x-2 hover:text-indigo-600">
          <FaThumbsUp />
          <span>{post.likes}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-indigo-600">
          <FaComment />
          <span>{post.comments}</span>
        </button>
        <button onClick={handleShare} className="flex items-center space-x-2 hover:text-indigo-600">
          <FaShare />
          <span>{post.shares}</span>
        </button>
      </div>
      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleAddComment} className="mb-2">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Comment
            </button>
          </form>
          {/* Add a list of comments here */}
        </div>
      )}
    </div>
  );
};


export default Post;