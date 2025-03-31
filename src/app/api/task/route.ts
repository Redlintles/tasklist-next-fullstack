import Task from "@/models/Task";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Dados Recebidos", body);

  const t = await Task.create({
    name: body.name,
    description: body.description,
  });

  return new Response(
    JSON.stringify({ message: "Tarefa criada com sucesso!", task: t }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function GET() {
  const allTasks = await Task.findAll();

  return new Response(
    JSON.stringify({
      message: "Tasks encontradas com sucesso!",
      tasks: allTasks,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
