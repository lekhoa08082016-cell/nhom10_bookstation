import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  slug: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  remove: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.slug === item.slug);
          return {
            items: exists
              ? state.items.filter((i) => i.slug !== item.slug)
              : [...state.items, item],
          };
        }),
      remove: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      isInWishlist: (slug) => get().items.some((i) => i.slug === slug),
    }),
    { name: "bsWishlist" }
  )
);
