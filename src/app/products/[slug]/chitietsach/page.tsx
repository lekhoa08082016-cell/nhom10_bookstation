import { redirect } from "next/navigation";
import { fetchBooks } from "@/lib/supabaseBooks";

export async function generateStaticParams() {
  const books = await fetchBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export default async function ChiTietSachRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/products/${slug}`);
}
