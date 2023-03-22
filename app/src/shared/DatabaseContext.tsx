import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { User, DBUser } from "../models/User";
import { useDatabaseService } from "./databaseService";

const defaultHandler = () => {
  throw Error("Cannot find DatabaseContext Provider");
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
  const { getAllItems, getItem, saveItem, updateItem } = useDatabaseService();
  const { id: currentItemParamId } = useParams();

  const handleSaveItem = async (item: User) => {
    await saveItem(item);
    await handleGetAllItems();
  };

  const handleUpdateItem = async (item: DBUser) => {
    setCurrentItem(item);
    await updateItem(item);
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
