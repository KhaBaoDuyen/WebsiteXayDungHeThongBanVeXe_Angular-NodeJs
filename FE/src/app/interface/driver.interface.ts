import { SafeUrl } from '@angular/platform-browser';
export interface driveriInterface {
  id?: number;
  fullName?: string;
  phone?: string;
  licenseType?:string;
  licenseNumber?: string;
  experienceYears?: number;
  YearBirthDate?: Date;
  status?: string;
  createdAt?: string;
  age?: number;
  image?: string;
  avatar?:string,
}

export interface DriverFile {
  file: File;
  url: SafeUrl | string;
  fileName?: string;
}
