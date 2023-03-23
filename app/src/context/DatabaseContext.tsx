import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { User, DBUser } from "../models/User";
import { useDatabaseService } from "../services/databaseService";
import loadingReducer from "../reducers/loadingReducer";

const defaultHandler = () => {
  throw Error("Cannot find DatabaseContext Provider");
};

interface DatabaseContextType {
  allItems: DBUser[];
  isLoading: boolean;
  handleSaveItem: (item: User) => void;
}

const DatabaseContext = React.createContext<DatabaseContextType>({
  allItems: [],
  isLoading: false,
  handleSaveItem: defaultHandler,
});

export const DatabaseContextProvider = ({ children }: PropsWithChildren) => {
  const [allItems, setAllItems] = useState<DBUser[]>([]);
  const { getAllItems, saveItem } = useDatabaseService();
  const [isLoading, dispatch] = useReducer(loadingReducer, {});

  const handleSaveItem = async (item: User) => {
    dispatch({ type: "START_LOADING", key: "saveItem" });
    await saveItem(item);
    await handleGetAllItems();
    dispatch({ type: "STOP_LOADING", key: "saveItem" });
  };

  const handleGetAllItems = async () => {
    dispatch({ type: "START_LOADING", key: "getAllItems" });
    try {
      const items = await getAllItems();
      setAllItems(items);
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: "STOP_LOADING", key: "getAllItems" });
  };

  useEffect(() => {
    handleGetAllItems();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        allItems,
        isLoading: Object.values(isLoading).some((loading) => loading),
        handleSaveItem,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
