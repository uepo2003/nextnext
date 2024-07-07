"use server";

import {
  DocumentData,
  Query,
  addDoc,
  getDoc,
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
import { boolean } from "zod";
import { revalidatePath } from "next/cache";

const todosCollection = collection(db, "todos");

export async function getData(id: string): Promise<Todo> {
  const docSnap = await getDoc(doc(db, "todos", id));
  const data = docSnap.data()! as Todo;
  return data;
}

export async function getSearchData(param: string): Promise<Todo[]> {
  const querySnapshot = await getDocs(
    query(todosCollection, where("title", "==", param)),
  );
  const data = querySnapshot.docs.map((doc) => doc.data() as Todo);
  return data;
}

export async function addData(d: Todo) {
  await setDoc(doc(db, "todos", d.id), d);
}

export async function editData(d: Todo) {
  await setDoc(doc(db, "todos", d.id), d);
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
