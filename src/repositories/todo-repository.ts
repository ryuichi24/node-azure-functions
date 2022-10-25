import { initDB } from "../db/db-config";

const db = initDB();

const getOnes = async () => {
  const { container } = await db;
  const { resources } = await container.items.readAll().fetchAll();
  return resources;
};

const getOneById = async (id: string) => {
  const { container } = await db;
  const { resource } = await container.item(id, id).read();
  return resource;
};

const createOne = async (todo: any) => {
  const { container } = await db;
  const { resource } = await container.items.create(todo);
  return resource;
};

const removeOneById = async (id: string) => {
  const { container } = await db;
  await container.item(id, id).delete();
};

const update = async (todo: any) => {
  const { container } = await db;
  await container.item(todo.id, todo.id).replace(todo);
};

export const todoRepository = {
  getOnes,
  getOneById,
  createOne,
  removeOneById,
  update,
};
