export type Order = {
  id: string;
  status: string;
  total: number;
  date: Date;
};

export function translateStatus (status: string): string {
  if(status == 'finished') {
    return 'Finalizado';
  }

  return 'Pendente';
}
