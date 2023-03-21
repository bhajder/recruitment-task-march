import Datastore from "nedb-promises";

const usersDB = Datastore.create("users.db"); // stored in browsers' indexedDB

export default usersDB;
