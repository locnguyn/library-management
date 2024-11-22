import { Router } from "express";
import { Document } from "mongoose";
import { Controller } from "src/controllers/Controller";

export class Route<T extends Document> {
    private _route: Router;
    private _controller: Controller<T>;

    constructor(controller: Controller<T>){
        this._controller = controller;
        this._route = Router();
        this._route.get('/', this._controller.list.bind(this._controller));
        this._route.get('/search', this._controller.search.bind(this._controller));
        this._route.get('/:id', this._controller.get.bind(this._controller));
        this._route.post('/', this._controller.create.bind(this._controller));
        this._route.patch('/:id', this._controller.update.bind(this._controller));
        this._route.delete('/:id', this._controller.delete.bind(this._controller));
    }

    public get route(): Router{
        return this._route;
    }
}
