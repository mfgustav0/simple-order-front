export type Product = {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  image: string;
};

const images: string[] = [
  'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
  'https://cdn.vuetifyjs.com/images/cards/hotel.jpg',
  'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
];

export function randomImage (): string {
  const index = Math.floor(Math.random() * images.length);

  return images[index];
}
