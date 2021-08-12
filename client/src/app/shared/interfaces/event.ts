import { IUser } from "./user";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  location: string;
  date: Date;
  dateMonth: string;
  dateDay: number;
  dateYear: number;
  imageUrl: string;
  isOwner: boolean;
  time: string;
  attendees: IUser[];
  companyId: {
    _id: string;
    name: string;
    address: string;
    description: string;
    ownerId : IUser;
  };
}
