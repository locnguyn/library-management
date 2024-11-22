import { BookService } from "@services/BookSevice";
import { LoanService } from "@services/LoanService";
import { Service } from "@services/Service";
import { Router } from "express";
import { Controller } from "src/controllers/Controller";
import { Member } from "src/models/Member";
import { Route } from "src/routes/Route";

const bookRoute = new Route(new Controller(new BookService()));
const memberRoute = new Route(new Controller(new Service(Member)));
const loanRoute = new Route(new Controller(new LoanService()));

const indexRoute = Router();

indexRoute.use("/member", memberRoute.route);
indexRoute.use("/book", bookRoute.route);
indexRoute.use("/loan", loanRoute.route);

export default indexRoute;
