export interface User {
  _id?: string;
  userId?: string; // ✅ Add this line (for profiles)
  name?: string;
  Email?: string;
  email?: string; // depending on whether you use `email` or `Email`
  location?: string;
  skills?: string[];
  workExperience?: {
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
  }[];
  title?: string;
}
