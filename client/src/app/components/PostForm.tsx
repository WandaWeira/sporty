"use client";
import React, { useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import { useCreatePostMutation } from "@/state/api";
import Image from "next/image";
import imageCompression from "browser-image-compression";

const PostForm: React.FC = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("userId", "1"); // Replace with actual user ID
      if (image) {
        formData.append("image", image);
      }
      if (video) {
        if (video.size > 100 * 1024 * 1024) {
          alert("Video file size should be less than 100MB");
          return;
        }
        formData.append("video", video);
      }

      console.log("form data:", Object.fromEntries(formData));
      const response = await createPost(formData).unwrap();

      console.log("Post created successfully:", response);
      setContent("");
      setImage(null);
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
    } catch (error: any) {
      console.error("Failed to create post:", error);
      if (error.data) {
        console.error("Server error:", error.data);
      }
      // Display error message to the user
      alert(`Error creating post: ${error.message || "Unknown error"}`);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "image") {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setVideoPreview(null);
      } else {
        setVideo(file);
        setVideoPreview(URL.createObjectURL(file));
        setImagePreview(null);
      }
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  const compressVideo = async (file: File): Promise<File> => {
    // For now, we'll just return the original file
    // Implementing video compression in the browser is complex and may require a dedicated library or service
    return file;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
              className="hidden"
            />
            <FaImage
              size={20}
              className="text-gray-500 hover:text-indigo-600"
            />
          </label>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, "video")}
              className="hidden"
            />
            <FaVideo
              size={20}
              className="text-gray-500 hover:text-indigo-600"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
      {imagePreview && (
        <div className="mt-4">
          <Image
            src={imagePreview}
            alt="Image preview"
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>
      )}
      {videoPreview && (
        <div className="mt-4">
          <video src={videoPreview} controls width={200} height={200} />
        </div>
      )}
    </form>
  );
};

export default PostForm;
