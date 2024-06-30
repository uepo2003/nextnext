import axios from "axios";
import useSWR from "swr";
import { Todo } from "../../common/types/Todo";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as Promise<Todo[] | null>);

const generateUrl = (key: string): string => {
  switch (key) {
    case "all":
      return "http://localhost:5000/todos";
    case "complete":
      return "http://localhost:5000/complete";
    case "incomplete":
      return "http://localhost:5000/incomplete";
    default:
      return "http://localhost:5000/todos";
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
