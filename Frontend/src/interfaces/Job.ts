export interface Job {
  _id: string;
  Title: string;
  Description: string;
  Requirements?: string;
  Budget: number;
<<<<<<< HEAD
  Currency: string;
=======
  Currency: string; // <-- Add Currency here
>>>>>>> f29c7156ce917162de4ac27e468a56a73ca6e7da
  Deadline: string;
  createdAt?: string;
  UserId?: {
    Email?: string;
  };
}
