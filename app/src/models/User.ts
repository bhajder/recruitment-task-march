import { AuthPayload } from "./Auth";

export interface User extends AuthPayload {
  about: string;
  email: string;
  dateOfBirthTimestamp: number;
  isEditor: boolean;
}

export interface DBUser extends User {
  _id: string;
}
