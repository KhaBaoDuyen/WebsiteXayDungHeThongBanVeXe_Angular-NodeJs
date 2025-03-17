export interface driveriInterface {
  id: number;
  fullName: string;
  phone: string;
  licenseNumber: string;
  experienceYears: number;
  birthDate: string;
  status: 'active' | 'inactive';
  createdAt: string;
  age: number;
  image: string;
}
