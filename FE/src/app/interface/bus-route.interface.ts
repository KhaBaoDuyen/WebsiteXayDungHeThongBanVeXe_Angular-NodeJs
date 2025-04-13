export interface busRouteInterface {
    id?: number;
    routeId: number;
    busID: number;
    driverId: number;
    departureTime: string;
    arrivalTime: string;
    price: number;
    status: string;
    routes?: {
        id: number;
        startPoint: string;
        endPoint: string;
        distance: number;
    };
    drivers?: {
        id: number;
        fullName: string;
    };
    buses?: {
        id: number;
        plateNumber: string;
        seats: {
            id: number;
            seatNumber: string;
            status: string;
        }[];
    }
}