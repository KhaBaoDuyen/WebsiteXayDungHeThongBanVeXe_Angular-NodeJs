export interface busesInterface {
    id?: number;
    plateNumber: string;
    busTypeId: number;
    status: 'active' | 'inactive';
    totalSeats?: number;
}