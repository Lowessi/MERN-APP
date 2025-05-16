export interface User {
  _id: string;
  Email: string;
  name?: string;
  location?: string;
  title?: string;
  skills?: string[];
  workExperience?: {
    company: string;
    jobTitle: string;
    role: string;
    duration: string;
    description: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
