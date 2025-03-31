"use client";

import { FormEvent, useEffect, useState } from "react";
import MainList from "../components/MainList/MainList";
import { Task } from "@/types/data";
export default function Home() {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchData() {
    const tasks = await fetch("/api/task").then((res) => res.json());
    setTasks(tasks.tasks);
  }

  async function handlePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify({ name, description: desc }),
    })
      .then((res) => res.json())
      .then(() => fetchData());

    setName("");
    setDesc("");
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="main">
      <div className="main__form">
        <h2>Crie uma tarefa</h2>
        <form onSubmit={handlePost}>
          <label>
            <span>Nome: </span>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>Descrição: </span>
            <textarea
              name="description"
              id=""
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </label>
          <button type="submit" className="btn">
            Enviar
          </button>
        </form>
      </div>
      <MainList initialTasks={tasks} />
    </main>
  );
}
