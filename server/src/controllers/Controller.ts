import { Service } from "@services/Service";
import { Request, Response } from "express";
import { Document } from "mongoose";
import IController from "src/interfaces/IController";

export class Controller<T extends Document> implements IController<T> {
  protected service: Service<T>;

  constructor(service?: Service<T>) {
    if (!service) {
      throw new Error("Service must be provided");
    }
    this.service = service;
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body as Partial<T>;
      const doc = await this.service.create(data);
      res.status(201).json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to create document",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const doc = await this.service.getById(id);
      if (!doc) {
        res.status(404).json({ error: "Document not found" });
        return;
      }
      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to fetch document",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const docs = await this.service.getAll();
      res.json(docs);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to list documents",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body as Partial<T>;
      const doc = await this.service.update(id, data);
      console.log(doc);
      if (!doc) {
        res.status(404).json({ error: "Document not found" });
        return;
      }
      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to update document",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const doc = await this.service.delete(id);
      if (!doc) {
        res.status(404).json({ error: "Document not found" });
        return;
      }
      res.json({ message: "Document deleted successfully", doc });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to delete document",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const searchTerm = req.query.q as string;
      console.log(searchTerm);
      const results = await this.service.search(searchTerm);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to search document",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
