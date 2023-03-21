export interface User {
  name: string;
  about: string;
  email: string;
  dateOfBirthTimestamp: number;
  password: string;
}

export interface DBUser extends User {
  _id: string;
}
