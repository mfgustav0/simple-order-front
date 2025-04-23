export type Order = {
  id: string;
  status: string;
  total: number;
  date: Date;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export function translateStatus (status: string): string {
  if(status == 'finished') {
    return 'Finalizado';
  }

  return 'Pendente';
}
