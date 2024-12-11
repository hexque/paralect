export const STATUSES = ['Applied', 'Invitation', 'Rejected', 'Archived'];

export const STATUS_COLOR = {
  Applied: { circle: 'bg-green-600', text: 'text-green-600' },
  Invitation: { circle: 'bg-blue-500', text: 'text-blue-500' },
  Rejected: { circle: 'bg-red-600', text: 'text-red-600' },
  Archived: { circle: 'bg-gray-400', text: 'text-gray-400' }
};

export enum ROUTE_PATH {
  VACANCIES = '/vacancies'
}
