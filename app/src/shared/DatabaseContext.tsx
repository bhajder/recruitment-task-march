import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { User, DBUser } from "../models/User";
import { getAllItems, getItem, saveItem, updateItem } from "./databaseService";

const defaultHandler = () => {
  throw Error("cannot find DatabaseContext Provider!");
};

interface DatabaseContextType {
  allItems: DBUser[];
  currentItem?: DBUser;
  handleSaveItem: (item: User) => void;
  handleUpdateItem: (item: DBUser) => void;
}

const DatabaseContext = React.createContext<DatabaseContextType>({
  allItems: [],
  currentItem: undefined,
  handleSaveItem: defaultHandler,
  handleUpdateItem: defaultHandler,
});

export const DatabaseContextProvider = ({ children }: PropsWithChildren) => {
  const [allItems, setAllItems] = useState<DBUser[]>([]);
  const [currentItem, setCurrentItem] = useState<DBUser>();
  const { id: currentItemParamId } = useParams();

  const handleSaveItem = (item: User) => {
    saveItem(item);
    return handleGetAllItems();
  };

  const handleUpdateItem = (item: DBUser) => {
    updateItem(item);
    setCurrentItem(item);
    return handleGetAllItems();
  };

  const handleGetAllItems = async () => {
    try {
      const items = await getAllItems();
      setAllItems(items);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentItem = async () => {
    if (!currentItemParamId) return;
    const item = await getItem(currentItemParamId);
    if (!item) return;
    setCurrentItem(item);
  };

  useEffect(() => {
    getCurrentItem();
  }, [currentItemParamId]);

  useEffect(() => {
    handleGetAllItems();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        allItems,
        currentItem,
        handleSaveItem,
        handleUpdateItem,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
