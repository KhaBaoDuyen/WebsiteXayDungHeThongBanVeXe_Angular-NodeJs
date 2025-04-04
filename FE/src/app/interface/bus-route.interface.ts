export interface BusRoute {
    id: number;
    route: string | number;
    departure: string;
    arrival: string;
    price: number;
    status: string;
    busID: number;
    driverID: number;
}