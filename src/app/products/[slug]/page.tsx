import { fetchBooks } from "@/lib/supabaseBooks";
import BookDetailsClient from "./BookDetailsClient";

export async function generateStaticParams() {
  const books = await fetchBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BookDetailsClient slug={slug} />;
}
