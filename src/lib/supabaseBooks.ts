import { supabase } from "./supabase";
import type { Book } from "./booksData";

// Chuyển row từ Supabase về kiểu Book dùng trong frontend
function rowToBook(row: Record<string, unknown>): Book {
  return {
    slug: row.slug as string,
    title: row.title as string,
    author: row.author as string,
    price: row.price as number,
    originalPrice: (row.original_price as number) ?? undefined,
    discount: (row.discount as number) ?? undefined,
    image: (row.image_url as string) ?? "",
    publisher: row.publisher as string,
    provider: row.provider as string,
    coverType: row.cover_type as string,
    rating: row.rating as number,
    reviews: row.reviews as number,
    sold: row.sold as number,
    hot: row.hot as boolean,
    description: row.description as string,
    googleBookId: (row.google_book_id as string) ?? undefined,
    category: (row.category as string) ?? undefined,
    language: (row.language as string) ?? undefined,
    previewText: (row.preview_text as string) ?? undefined,
  };
}

export async function fetchBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return data.map(rowToBook);
}

export async function fetchBookBySlug(slug: string): Promise<Book | null> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return rowToBook(data);
}

export async function fetchRelatedBooks(currentSlug: string, limit = 4): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .neq("slug", currentSlug)
    .limit(limit);
  if (error || !data) return [];
  return data.map(rowToBook);
}

export async function fetchHotBooks(limit = 8): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("hot", true)
    .limit(limit);
  if (error || !data) return [];
  return data.map(rowToBook);
}

export async function fetchDiscountBooks(limit = 5): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .not("discount", "is", null)
    .order("discount", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map(rowToBook);
}

export async function fetchNewBooks(limit = 6): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map(rowToBook);
}

export async function searchBooksRemote(query: string): Promise<Book[]> {
  if (!query.trim()) return fetchBooks();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .or(`title.ilike.%${query}%,author.ilike.%${query}%`);
  if (error || !data) return [];
  return data.map(rowToBook);
}
