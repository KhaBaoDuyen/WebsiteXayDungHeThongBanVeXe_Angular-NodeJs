export interface ticketInterface {
    id: number;
    userID: number;
    tripID: number;
    seatID: string;
    createdAt: Date;
    status: string;
    finalPrice: number;
    userName: string;
    phone: string;
}