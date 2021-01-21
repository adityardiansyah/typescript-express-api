/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface"

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();

        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    
    try {
        const item: Item = await ItemService.find(id);
        return res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body;
        const newItem = await ItemService.create(item);
        res.status(200).send(newItem);
    } catch (error) {
        res.status(200).send(error.message);
    }
})
// PUT items/:id
itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const itemUpdate: Item = req.body;

        const existingItem: Item = await ItemService.find(id);
        if(existingItem){
            const updateItem = await ItemService.update(id, itemUpdate);
            return res.status(200).json(updateItem);
        }
        const newItem = await ItemService.create(itemUpdate);
        return res.status(200).json(newItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        await ItemService.remove(id);
        res.status(200).send("Success");
    } catch (error) {
        res.status(500).send(error.message);
    }
});