export interface reviewInterface {
  id: number;
  userID: number;
  tripID: number;
  rating: number;
  comment: string;
  createAt: Date;
  updateAt: Date;
  image?: string;
  status: string;
}