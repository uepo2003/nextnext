
import express from 'express';

import cors from 'cors';
import admin from 'firebase-admin';


import { decryptGCPServiceAccount } from "./decrypt";

// ServiceAccountKeyを複合化する
const serviceAccountJson = decryptGCPServiceAccount();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
});

const db = admin.firestore();

// ... 既存のコード ...
app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(express.json());

  server.get("/todos", async (req, res) => {
    const snapshot = await db.collection("todos").get();
    const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
    res.json(todoList);
  });

  server.get("/item/:id", async (req, res) => {
    const { id } = req.params;
    const doc = await db.collection("todos").doc(id).get();
    const todoList = doc.data();
    res.json(todoList);
  });

  server.get("/complete", async (req, res) => {
    const todosRef = db.collection("todos");
    const snapshot = await todosRef.where("completed", "==", true).get();
    const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
    res.json(todoList);
  });

  server.get("/incomplete", async (req, res) => {
    const todosRef = db.collection("todos");
    const snapshot = await todosRef.where("completed", "==", false).get();
    const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
    res.json(todoList);
  });

  server.get("/search/:keyword", async (req, res) => {
    const { keyword } = req.params;
    const todosRef = db.collection("todos");
    const snapshot = await todosRef.where("title", "==", keyword).get();
    const todoList = await Promise.all(snapshot.docs.map((doc) => doc.data()));
    res.json(todoList);
  });

  server.post("/todos", async (req, res) => {
    const data = req.body;
    await db.collection("todos").doc(data.todo.id).set(data.todo);
  });

  server.put("/edit/:id", async (req, res) => {
    const data = req.body;
    await db.collection("todos").doc(data.todo.id).update(data.todo);
  });

  server.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const completed = req.body;
    await db.collection("todos").doc(id).update(completed);
  });

  server.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await db.collection("todos").doc(id).delete();
  });

  server.all("/completed", async (req, res) => {
    try {
      const snapshot = await db.collection("todos").get();
      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      res.status(204).end(); // Respond with 204 No Content on success
    } catch (error) {
      console.error("Error deleting completed todos:", error);
      res.status(500).json({ error: "Failed to delete completed todos" }); // Handle error response
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
  });
});
