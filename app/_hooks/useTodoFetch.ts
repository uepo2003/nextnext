import axios from "axios";
import useSWR from "swr";
import { Todo } from "../../common/types/Todo";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as Promise<Todo[] | null>);

const API_URL = process.env.API_URL;

const generateUrl = (key: string): string => {
  switch (key) {
    case "all":
      return `${API_URL}/todos`;
    case "complete":
      return `${API_URL}/complete`;
    case "incomplete":
      return `${API_URL}/incomplete`;
    default:
      return `${API_URL}/todos`;
  }
};

export const useTodoFetch = (key: string) => {
  const dummy = [
    { id: "ダミー", title: "ダミー", description: "ダミー", completed: true },
  ];
  const { data, error, isLoading } = useSWR(generateUrl(key), fetcher, {
    refreshInterval: 1000,
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
