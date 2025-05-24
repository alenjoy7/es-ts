import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma.js";
import { ItemCreate, ItemId } from "../schemas/itemSchema.js";

// Create an item
export const createItem = async (
  req: Request<unknown, unknown, ItemCreate>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newItem = await prisma.item.create({ data });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Read all items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = async (
  req: Request<ItemId>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) {
      return next({
        status: 404,
        message: "Item not found",
      });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = async (
  req: Request<ItemId, unknown, ItemCreate>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedItem = await prisma.item.update({ where: { id }, data });
    res.json(updatedItem);
  } catch (error) {
    if (error instanceof Error && (error as any).code === "P2025") {
      next({
        status: 404,
        message: "Item not found",
      });
    } else {
      next(error);
    }
  }
};

// Delete an item
export const deleteItem = async (
  req: Request<ItemId>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedItem = await prisma.item.delete({ where: { id } });
    if (!deletedItem) {
      return next({
        status: 404,
        message: "Item not found",
      });
    }
    res.send(deletedItem);
  } catch (error) {
    next(error);
  }
};
