export interface userInterface {
   id?: number,
   image: string;
   fullName: string;
   email: string;
   phone: string;
   role: 'admin' | 'customer';
   status: number;
   password: string;
}