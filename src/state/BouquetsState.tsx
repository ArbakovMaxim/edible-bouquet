import { create } from "zustand";

interface Bouquet {
  id: string;
  images: { original: string; thumbnail: string; alt: string }[];
  name: string;
  count: string;
  material: string;
  price: string;
}

interface BouquetsState {
  bouquets: Bouquet[];
  removeItems: (ids: string[]) => void;
  setBouquets: (newBouquet: Bouquet[]) => void;
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
}));
