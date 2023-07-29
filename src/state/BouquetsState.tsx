import { create } from "zustand";

export interface BouquetImage {
  original: string;
  thumbnail: string;
  alt: string;
}
export interface Bouquet {
  id: string;
  images: BouquetImage[];
  name: string;
  count: string;
  material: string;
  price: string;
}

interface BouquetsState {
  bouquets: Bouquet[];
  removeItems: (ids: string) => void;
  addCount: (ids: string) => void;
  removeCount: (ids: string) => void;
  setBouquets: (newBouquet: Bouquet[]) => void;
  removeAll: () => void;
}

export const useBouquetsStore = create<BouquetsState>((set) => ({
  bouquets: [],
  setBouquets: (newBouquets: Bouquet[]) => {
    set((state) => {
      const updatedBouquets: Bouquet[] = state.bouquets.map(
        (existingBouquet) => {
          const matchingNewBouquet = newBouquets.find(
            (newBouquet) => newBouquet.id === existingBouquet.id
          );
          if (matchingNewBouquet) {
            return {
              ...existingBouquet,
              count: (Number(existingBouquet.count) + 1).toString(),
            };
          } else {
            return existingBouquet;
          }
        }
      );

      const newItems = newBouquets.filter(
        (newBouquet) =>
          !state.bouquets.some((item) => item.id === newBouquet.id)
      );
      updatedBouquets.push(...newItems);

      return { bouquets: updatedBouquets };
    });
  },
  removeItems: (ids) => {
    set((state) => ({
      bouquets: state.bouquets.filter((item) => !ids.includes(item.id)),
    }));
  },
  addCount: (id: string) => {
    set((state) => {
      const updatedBouquets: Bouquet[] = state.bouquets.map((bouquet) => {
        if (bouquet.id === id) {
          const newCount = Number(bouquet.count) + 1;
          return {
            ...bouquet,
            count: newCount.toString(),
          };
        } else {
          return bouquet;
        }
      });

      return { bouquets: updatedBouquets };
    });
  },
  removeCount: (id: string) => {
    set((state) => {
      const updatedBouquets: Bouquet[] = state.bouquets.map((bouquet) => {
        if (bouquet.id === id) {
          const newCount = Math.max(Number(bouquet.count) - 1, 0);
          return {
            ...bouquet,
            count: newCount.toString(),
          };
        } else {
          return bouquet;
        }
      });

      return {
        bouquets: updatedBouquets.filter(
          (bouquet) => Number(bouquet.count) > 0
        ),
      };
    });
  },
  removeAll: () => {
    set({ bouquets: [] }); // Обнулить состояние bouquets
  },
}));
