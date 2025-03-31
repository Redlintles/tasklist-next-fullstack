import Task from "@/models/Task";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  const t = await Task.findByPk(id);

  if (!t) {
    return Response.json({ message: "Tarefa não encontrada" }, { status: 404 });
  }

  return Response.json(
    { message: "Tarefa encontrada com sucesso!", task: t },
    { status: 200 }
  );
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const t = await Task.findByPk(id);

  const rows: number = await Task.destroy({ where: { id } });

  if (rows === 0 && !t) {
    return Response.json(
      { message: "Tarefa não encontrada!" },
      { status: 404 }
    );
  } else {
    return Response.json(
      { message: "Tarefa excluída com sucesso!", task: t },
      { status: 200 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const body = await req.json();

  const toUpdate = await Task.findByPk(id);

  if (!toUpdate) {
    return Response.json({ message: "Tarefa não encontrada" }, { status: 404 });
  }
  const oldObj = JSON.parse(JSON.stringify(toUpdate.get()));

  await toUpdate.set({
    name: body.name || toUpdate.get("name"),
    description: body.description || toUpdate.get("description"),
  });

  const savedObj = await toUpdate.save();

  if (savedObj) {
    return Response.json(
      {
        message: "Tarefa Atualizada com sucesso",
        oldTask: oldObj,
        newTask: toUpdate,
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        message: "Tarefa Não pôde ser atualizada, erro interno do servidor",
        task: toUpdate,
      },
      { status: 500 }
    );
  }
}
