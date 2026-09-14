import { Bouquet, BouquetImage } from "../state/BouquetsState";

/**
 * Пути к картинкам в JSON хранятся от корня ("/img/..."), а реальный базовый
 * путь зависит от хостинга: на Vercel это "/", на GitHub Pages —
 * "/edible-bouquet". CRA подставляет его в PUBLIC_URL на этапе сборки.
 */
export const assetUrl = (path: string): string =>
  `${process.env.PUBLIC_URL}${path}`;

export const withAssetUrls = (bouquets: Bouquet[]): Bouquet[] =>
  bouquets.map((bouquet) => ({
    ...bouquet,
    images: bouquet.images.map(
      (image): BouquetImage => ({
        ...image,
        original: assetUrl(image.original),
        thumbnail: assetUrl(image.thumbnail),
      })
    ),
  }));
