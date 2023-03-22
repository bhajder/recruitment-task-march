import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, DBUser } from "../models/User";
import { useDatabaseService } from "./databaseService";

const defaultHandler = () => {
  throw Error("Cannot find DatabaseContext Provider");
};

interface DatabaseContextType {
  allItems: DBUser[];
  handleSaveItem: (item: User) => void;
}

const DatabaseContext = React.createContext<DatabaseContextType>({
  allItems: [],
  handleSaveItem: defaultHandler,
});

export const DatabaseContextProvider = ({ children }: PropsWithChildren) => {
  const [allItems, setAllItems] = useState<DBUser[]>([]);
  const { getAllItems, saveItem } = useDatabaseService();

  const handleSaveItem = async (item: User) => {
    await saveItem(item);
    await handleGetAllItems();
  };

  const handleGetAllItems = async () => {
    try {
      const items = await getAllItems();
      setAllItems(items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAllItems();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        allItems,
        handleSaveItem,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
