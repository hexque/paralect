export type Vacancy = {
  _id: string;
  company: string;
  position: string;
  salaryFork: string;
  status: 'Applied' | 'Invitation' | 'Rejected' | 'Archived';
  note?: string;
};
