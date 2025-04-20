export interface BusTypeInterface {
    id?: number | string;
    typeName?: string;
    status?: 'active' | 'inactive';
    totalSeat?:number,
  }