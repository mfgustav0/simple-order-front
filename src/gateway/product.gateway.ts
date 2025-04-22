import { type Product, randomImage } from '@/entities/product';
import type { Axios } from 'axios';

export interface ProductGateway {
  getList(): Promise<Product[]>;

  getProductsBanners(): Promise<Product[]>;

  getProductById(id: string): Promise<Product>;
}

export class ProductGatewayAxios implements ProductGateway {
  constructor (private readonly httpClient: Axios) {}

  async getList (): Promise<Product[]> {
    const response = await this.httpClient.get('/products');

    return response.data.map((product: Product) => {
      product.image = randomImage();

      return product;
    });
  }

  async getProductsBanners (): Promise<Product[]> {
    const response = await this.httpClient.get('/products');

    return response.data.map((product: Product) => {
      product.image = randomImage();

      return product;
    });
  }

  async getProductById (id: string): Promise<Product> {
    const response = await this.httpClient.get(`/products/${id}`);

    const product = response.data as Product;

    product.image = randomImage();

    return product;
  }
}
