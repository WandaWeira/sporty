import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import {
  useLikePostMutation,
  useAddCommentMutation,
  useSharePostMutation,
  useGetCommentsQuery,
} from "@/state/api";

interface PostProps {
  post: {
    id: number;
    author: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [likePost] = useLikePostMutation();
  const [addComment] = useAddCommentMutation();
  const [sharePost] = useSharePostMutation();
  const { data: comments, refetch: refetchComments } = useGetCommentsQuery(
    post.id,
    { skip: !showComments }
  );
  const [localPost, setLocalPost] = useState(post);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(localPost.id).unwrap();
      setLocalPost(updatedPost);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addComment({ postId: post.id, content: commentContent });
      setCommentContent("");
      refetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShare = async () => {
    try {
      await sharePost(post.id);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Post content */}
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
        <img
          src={`http://localhost:3001${post.imageUrl}`}
          alt="Post image"
          className="mb-4 rounded-lg max-w-full h-auto"
        />
      )}
      {post.videoUrl && (
        <video
          src={`http://localhost:3001${post.videoUrl}`}
          controls
          className="mb-4 rounded-lg max-w-full h-auto"
        />
      )}
      <div className="flex justify-between items-center text-gray-500">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 hover:text-indigo-600"
        >
          <FaThumbsUp />
          <span>{localPost.likesCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-indigo-600"
        >
          <FaComment />
          <span>{post.commentsCount}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 hover:text-indigo-600"
        >
          <FaShare />
          <span>{post.sharesCount}</span>
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
            <button
              type="submit"
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Comment
            </button>
          </form>
          {comments &&
            comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Post;
