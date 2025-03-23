export interface busesInterface {
    id: number;
    plateNumber: string;
    busTypeID: number;
    driverId: number;
    status: 'active' | 'inactive';
    totalSeats: number;
}