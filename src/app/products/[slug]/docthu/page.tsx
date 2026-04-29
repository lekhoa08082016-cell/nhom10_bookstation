import { fetchBooks } from "@/lib/supabaseBooks";
import BookPreviewClient from "./BookPreviewClient";

export async function generateStaticParams() {
  const books = await fetchBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BookPreviewClient slug={slug} />;
}
