export interface bookingInterface {
    id?: number;
    userId?: number;
    startPoint?: string;
    endPoint?: string;
    createdAt?: Date;
    finalPrice?: number;
    status?: 'pending' | 'confirmed' | 'canceled';
    fullName?: string;
    phone?: string;
    email?: string;
    startDate?: Date;
    totalSeat?: number;
  }
  