import { Router } from "express";
import { z } from "zod";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

import {
  ItemCreateSchema,
  ItemIdSchema,
  ItemSchema,
} from "../schemas/itemSchema.js";
import { registry } from "../utils/util.js";
import { validate } from "../middlewares/validate.js";

const itemRoutes = Router();

const ITEM_ROUTE_PREFIX = "/api/items";

registry.registerPath({
  method: "get",
  path: ITEM_ROUTE_PREFIX,
  description: "Get all items",
  summary: "Get all items",
  responses: {
    200: {
      description: "A list of items.",
      content: {
        "application/json": {
          schema: z.array(ItemSchema),
        },
      },
    },
  },
});
itemRoutes.get("/", getItems);

registry.registerPath({
  method: "get",
  path: `${ITEM_ROUTE_PREFIX}/{id}`,
  description: "Get an item by ID",
  summary: "Get item by ID",
  request: {
    params: ItemIdSchema,
  },
  responses: {
    200: {
      description: "Item details.",
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
    },
    404: {
      description: "Item not found",
    },
  },
});

itemRoutes.get("/:id", validate({ params: ItemIdSchema }), getItemById);

registry.registerPath({
  method: "post",
  path: ITEM_ROUTE_PREFIX,
  description: "Create a new item",
  summary: "Create item",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ItemCreateSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Item created successfully.",
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
    },
    400: {
      description: "Invalid input",
    },
  },
});
itemRoutes.post("/", validate({ body: ItemCreateSchema }), createItem);

registry.registerPath({
  method: "put",
  path: `${ITEM_ROUTE_PREFIX}/{id}`,
  description: "Update an item by ID",
  summary: "Update item by ID",
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: ItemCreateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Item updated successfully.",
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
    },
    404: {
      description: "Item not found",
    },
  },
});
itemRoutes.put(
  "/:id",
  validate({ params: ItemIdSchema, body: ItemCreateSchema }),
  updateItem
);

registry.registerPath({
  method: "delete",
  path: `${ITEM_ROUTE_PREFIX}/{id}`,
  description: "Delete an item by ID",
  summary: "Delete item by ID",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Item deleted successfully.",
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
    },
    404: {
      description: "Item not found",
    },
  },
});
itemRoutes.delete("/:id", validate({ params: ItemIdSchema }), deleteItem);

export default itemRoutes;
