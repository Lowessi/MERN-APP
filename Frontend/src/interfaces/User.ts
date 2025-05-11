export interface User {
  _id: string;
  Email: string;
  name?: string;
  address?: string;
  // Add optional fields if your ProfileModel includes more
  skills?: string[];
  experience?: {
    company: string;
    role: string;
    duration: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
