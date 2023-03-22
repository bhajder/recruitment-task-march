import Datastore from "nedb-promises";
import { DBUser } from "../models/User";
import bcrypt from "bcryptjs";

const usersDB = Datastore.create("users.db"); // stored in browsers' indexedDB

usersDB.on("load", async (db) => {
  db.ensureIndex({ fieldName: "username", unique: true });
  const user = await db.findOne({ username: "admin" });
  if (user) return;

  const hash = await bcrypt.hash("zaq1@WSX", 10);
  if (!hash) return;

  await db.insert({ username: "admin", password: hash });
});

export default usersDB;
