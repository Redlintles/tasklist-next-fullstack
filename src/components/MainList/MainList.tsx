"use client";
import { Task } from "@/types/data";
import React, { FormEvent, useEffect, useState } from "react";
import "./style.css";
import { IoMdClose } from "react-icons/io";
interface MainListProps {
  initialTasks: Task[];
}

function MainList({ initialTasks }: MainListProps) {
  const [toUpdate, setToUpdate] = useState<number>(-1);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  async function fetchData() {
    const tasks = await fetch("/api/task").then((res) => res.json());
    setTasks(tasks.tasks);
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`/api/task/${toUpdate}`, {
      method: "PATCH",
      body: JSON.stringify({ name, description: desc }),
    })
      .then((res) => res.json())
      .then(() => fetchData());
    setToUpdate(-1);
  }

  async function deleteTask(id: number) {
    const res = await fetch(`/api/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchData());

    console.log(res);
  }

  return (
    <>
      <h2>Lista de Tarefas:</h2>
      <div className="main-list">
        {toUpdate > 0 && (
          <div className="main-list-form">
            <div className="main-list-form__header">
              <h5>Atualizar Tarefa</h5>

              <button onClick={() => setToUpdate(-1)}>
                <IoMdClose />
              </button>
            </div>

            <form onSubmit={handleUpdate}>
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
                Atualizar
              </button>
            </form>
          </div>
        )}

        {tasks && tasks.length > 0 ? (
          tasks.map((item) => (
            <div key={item.id} className="main-list__item">
              <h4 className="item__title">{item.name}</h4>
              <p className="item__desc">{item.description}</p>
              <div className="item__buttons">
                <button
                  onClick={() => {
                    setToUpdate(item.id);
                    setDesc(item.description);
                    setName(item.name);
                  }}
                  className="btn"
                >
                  Editar Tarefa
                </button>
                <button onClick={() => deleteTask(item.id)} className="btn">
                  Excluir Tarefa
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="main-list__no-items">Nenhuma Tarefa!</h3>
        )}
      </div>
    </>
  );
}

export default MainList;
