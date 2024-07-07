import useSWR from "swr";
import { db } from "@/firebaseConfig";
import {
  DocumentData,
  Query,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const fetcher = async (key: string): Promise<DocumentData[]> => {
  let collectionPath: Query<DocumentData, DocumentData>;
  console.log(key);
  switch (key) {
    case "all":
      collectionPath = query(collection(db, "todos"));
      console.log(collectionPath);
      break;
    case "complete":
      collectionPath = query(
        collection(db, "todos"),
        where("completed", "==", true),
      );
      break;
    case "incomplete":
      collectionPath = query(
        collection(db, "todos"),
        where("completed", "==", false),
      );
      break;
    default:
      collectionPath = query(collection(db, "todos"));
      break;
  }
  try {
    const querySnapshot = await getDocs(collectionPath);
    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const useTodoFetch = (key: string) => {
  const dummy = [
    { id: "ダミー", title: "ダミー", description: "ダミー", completed: true },
  ];
  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnReconnect: false,
    suspense: true,
    fallbackData: dummy,
  });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return {
    todos: data,
    isError: error,
    isLoading,
  };
};
