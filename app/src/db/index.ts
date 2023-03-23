import Datastore from "nedb-promises";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { getRandomDate } from "../shared/helpers";

const usersDB = Datastore.create("users.db"); // stored in browsers' indexedDB

usersDB.on("load", async (db) => {
  db.ensureIndex({ fieldName: "username", unique: true });
  const user = await db.findOne({ username: "admin" });
  if (user) return;

  const hash = await bcrypt.hash("zaq1@WSX", 10);
  if (!hash) return;

  await db.insert({
    username: "admin",
    password: hash,
    about: `Duis a dignissim nibh. Morbi in fermentum justo.
    Praesent pellentesque vitae leo at pretium.Curabitur vulputate faucibus tortor,
    vitae pulvinar velit mattis sit amet. Mauris sed feugiat ante. Proin cursus risus a nibh porttitor,
    ac facilisis ante feugiat. Phasellus posuere imperdiet sem vel ornare.`,
    dateOfBirthTimestamp: getRandomDate(),
    email: "admin@admin.com",
    isSpecial: true,
  } as User);
});

export default usersDB;
