export interface Job {
  _id: string;
  Title: string;
  Description: string;
  Requirements: string;
  Budget: number;
  Currency: string;
  Deadline: string;
  UserId: {
    _id: string;
    Email: string;
  };
}
