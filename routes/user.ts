import Express from "express";
import controller from "controllers/user";
const router = Express.Router();

const NAMESPACE = "USER ROUTER";

router.post('/', controller.create_user);

export default router;