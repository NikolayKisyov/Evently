export interface ICompany {
  _id: string;
  name: string;
  address: string;
  description: string;
  ownerId: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
