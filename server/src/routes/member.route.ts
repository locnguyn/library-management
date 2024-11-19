import { MemberService } from "@services/MemberService";
import { Router } from "express";
import MemberController from "src/controllers/MemberController";
import { Member } from "src/models/Member";

const controller = new MemberController(new MemberService(Member));

const memberRoute = Router();

memberRoute.post("/", controller.create.bind(controller));
memberRoute.get("/", controller.list.bind(controller));

export default memberRoute;
