import { User, DBUser } from "../models/User";
import db from "../db";

interface DatabaseService {
  saveItem: (item: User) => Promise<void>;
  updateItem: (item: DBUser) => Promise<void>;
  getAllItems: () => Promise<DBUser[]>;
  getItem: (id: string) => Promise<DBUser | null>;
  getUser: (username: string) => Promise<DBUser | null>;
}

const wait = (): Promise<void> => {
  const delay = Math.floor(Math.random() * 2000) + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const useDatabaseService = (): DatabaseService => {
  const saveItem = async (item: User) => {
    await wait();
    await db.insert(item);
  };

  const updateItem = async (item: DBUser) => {
    await wait();
    await db.update({ _id: item._id }, { $set: item }, { multi: true });
  };

  const getAllItems = async () => {
    await wait();
    return await db.find<User>({});
  };

  const getItem = async (id: string) => {
    await wait();
    return await db.findOne<User>({ _id: id });
  };

  const getUser = async (username: string) => {
    await wait();
    return await db.findOne<DBUser>({ username });
  };

  return { saveItem, updateItem, getAllItems, getItem, getUser };
};
