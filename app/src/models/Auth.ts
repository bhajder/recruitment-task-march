export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthPersistance {
  id: string;
  hash: string;
}
