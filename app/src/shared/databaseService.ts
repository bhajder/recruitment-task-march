import { User, DBUser } from "../models/User";
import db from "../db";

interface DatabaseService {
  saveItem: (item: User) => Promise<void>;
  updateItem: (item: DBUser) => Promise<void>;
  getAllItems: () => Promise<DBUser[]>;
  getItem: (id: string) => Promise<DBUser | null>;
  getUser: (username: string) => Promise<DBUser | null>;
}

export const useDatabaseService = (): DatabaseService => {
  const saveItem = async (item: User) => {
    await db.insert(item);
  };

  const updateItem = async (item: DBUser) => {
    await db.update({ _id: item._id }, { $set: item }, { multi: true });
  };

  const getAllItems = async () => {
    return await db.find<User>({});
  };

  const getItem = async (id: string) => {
    return await db.findOne<User>({ _id: id });
  };

  const getUser = async (username: string) => {
    return await db.findOne<DBUser>({ username });
  };

  return { saveItem, updateItem, getAllItems, getItem, getUser };
};
