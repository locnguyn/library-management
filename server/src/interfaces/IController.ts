import { Request, Response } from "express";

export default interface IController<T> {
    create(req: Request, res: Response): void;
    list(req: Request, res: Response): void;
    get(req: Request, res: Response): void;
    update(req: Request, res: Response): void;
    delete(req: Request, res: Response): void;
}
