import { BookService } from "@services/BookService";
import { Router } from "express";
import { BookController } from "src/controllers/BookController";
import { Book } from "src/models/Book";

const controller = new BookController(new BookService(Book));

const bookRoute = Router();

bookRoute.get("/", controller.list.bind(controller));

export default bookRoute;
