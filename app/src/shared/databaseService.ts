import { User, DBUser } from "../models/User";
import db from "../db";

export const saveItem = async (item: User) => {
  await db.insert(item);
};

export const updateItem = async (item: DBUser) => {
  await db.update({ _id: item._id }, { $set: item }, { multi: true });
};

export const getAllItems = async () => {
  return await db.find<DBUser>({});
};

export const getItem = async (id: string) => {
  return await db.findOne<DBUser>({ _id: id });
};

export const getUser = async (username: string) => {
  return await db.findOne<DBUser>({ username });
};
