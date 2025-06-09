export interface Job {
  _id: string;
  id: string; // <-- Add id here
  Title: string;
  Description: string;
  Requirements?: string;
  Budget: number;
  Currency: string; // <-- Add Currency here
  Deadline: string;
  createdAt?: string;
  status?: "Open" | "On Work" | "Completed";
  UserId?: {
    _id: string;
    Email?: string;
  };
}
