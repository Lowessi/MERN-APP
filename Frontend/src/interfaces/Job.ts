export interface Job {
  _id: string;
  Title: string;
  Description: string;
  Requirements?: string;
  Budget: number;
  Currency: string; // <-- Add Currency here
  Deadline: string;
  createdAt?: string;
  UserId?: {
    Email?: string;
  };
}
