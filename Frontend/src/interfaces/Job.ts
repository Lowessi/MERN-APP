export interface Job {
  _id: string;
  Title: string;
  Description: string;
  Requirements: string;
  Budget: number;
  Deadline: string;
  UserId: {
    _id: string;
    Email: string;
  };
}
