import { IEvent } from "./event";

export interface IUser {
    _id: string,
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    eventsAttending: IEvent[];
}