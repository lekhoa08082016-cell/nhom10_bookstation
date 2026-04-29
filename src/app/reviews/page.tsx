"use client";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Review {
  id: number;
  author: string;
  content: string;
}

export default function ReviewsPage() {
  // Dùng useLocalStorage thay cho useState + useEffect để đọc/ghi localStorage
  // 'bs-reviews' là key trong localStorage, [] là giá trị khởi tạo
  const [reviews, setReviews] = useLocalStorage<Review[]>("bs-reviews", []);

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newReview: Review = {
      id: Date.now(),
      author,
      content,
    };

    // Hàm setReviews sẽ tự động cập nhật state và lưu vào localStorage
    setReviews([...reviews, newReview]);

    // Reset form
    setAuthor("");
    setContent("");
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Viết Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tên của bạn" className="w-full border p-2 rounded" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nội dung review..." className="w-full border p-2 rounded" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Gửi Review</button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Các Review đã gửi</h2>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border p-4 rounded-lg">
            <p className="font-bold">{review.author}</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
