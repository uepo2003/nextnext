"use server";

import {
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { Todo } from "../../common/types/Todo";
import { db } from "@/firebaseConfig";

const todosCollection = collection(db, "todos");

export async function getData(id: string): Promise<Todo> {
  const docSnap = await getDoc(doc(db, "todos", id));
  const data = docSnap.data()! as Todo;
  return data;
}

export async function getSearchData(param: string): Promise<Todo[]> {
  try {
    const querySnapshot = await getDocs(
      query(todosCollection, where("title", "==", param)),
    );
    const data = querySnapshot.docs.map((doc) => doc.data() as Todo);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function addData(d: Todo) {
  try {
    await setDoc(doc(db, "todos", d.id), d);
  } catch (e) {
    throw e;
  }
}

export async function editData(d: Todo) {
  try {
    await setDoc(doc(db, "todos", d.id), d);
  } catch (e) {
    throw e;
  }
}

export async function changeCompletedData(id: string, completed: boolean) {
  try {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
  } catch (e) {
    throw e;
  }
}
export async function deleteData(id: string) {
  try {
    await deleteDoc(doc(db, "todos", id));
    return {
      boolean: true,
      value: "削除完了しました",
    };
  } catch (e) {
    return {
      boolean: false,
      value: `${e}:削除中にエラーが発生しました`,
    };
  }
}
