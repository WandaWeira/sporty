"use client";
import React from "react";
import Link from "next/link";

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  date: string;
  author: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Local Team Wins Championship",
    summary:
      "The city's beloved football team secures a historic victory in the national league.",
    date: "2023-05-30",
    author: "John Doe",
  },
  {
    id: 2,
    title: "New Sports Complex Announced",
    summary:
      "City officials reveal plans for a state-of-the-art sports complex to be built next year.",
    date: "2023-05-28",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Rising Star Athlete Profile",
    summary:
      "Meet the young prodigy who's taking the basketball world by storm.",
    date: "2023-05-25",
    author: "Mike Johnson",
  },
];

const NewsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sports News</h1>
      <div className="space-y-6">
        {newsArticles.map((article) => (
          <Link href={`/news/${article.id}`} key={article.id}>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.summary}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{article.date}</span>
                <span>By {article.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
