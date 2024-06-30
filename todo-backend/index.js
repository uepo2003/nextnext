const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const admin = require("firebase-admin");

const serviceAccount = require("./react-prac-f6336-firebase-adminsdk-8t4kl-5c7c433dd1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("/todos", async (req, res) => {
  const snapshot = await db.collection("todos").get();
  const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
  res.json(todoList);
});

app.get("/item/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id, "ゴムゴムのーーーーーージェットピストルーーーー");
  const doc = await db.collection("todos").doc(id).get();
  const todoList = doc.data();
  console.log(todoList);
  res.json(todoList);
});

app.get("/complete", async (req, res) => {
  console.log("呼び出せてるよ");
  const todosRef = db.collection("todos");
  const snapshot = await todosRef.where("completed", "==", true).get();
  const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
  res.json(todoList);
});

app.get("/incomplete", async (req, res) => {
  console.log("呼び出せてるよ");
  const todosRef = db.collection("todos");
  const snapshot = await todosRef.where("completed", "==", false).get();
  const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
  res.json(todoList);
});

app.get("/search/:keyword", async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const todosRef = db.collection("todos");
  const snapshot = await todosRef.where("title", "==", keyword).get();
  const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
  console.log(todoList);
  res.json(todoList);
});

app.post("/todos", async (req, res) => {
  const data = req.body;
  console.log(data.todo);
  await db.collection("todos").doc(data.todo.id).set(data.todo);
});

app.put("/edit/:id", async (req, res) => {
  const data = req.body;
  console.log(data.todo);
  await db.collection("todos").doc(data.todo.id).update(data.todo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const completed = req.body;
  console.log(completed);
  await db.collection("todos").doc(id).update(completed);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await db.collection("todos").doc(id).delete();
});

app.all("/completed", async (req, res) => {
  try {
    const snapshot = await db.collection("todos").get();
    console.log(snapshot);
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  } catch (error) {
    console.error("Error deleting completed todos:", error);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
