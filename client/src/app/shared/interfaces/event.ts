export interface IEvent {
  _id: string;
  name: string;
  description: string;
  location: string;
  date: Date;
  dateMonth: string;
  dateDay: number;
  imageUrl: string;
  time: string;
  companyId: {
    _id: string;
    name: string;
    address: string;
    description: string;
  };
}
