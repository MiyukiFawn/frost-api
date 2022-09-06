import Express from "express";
import controller from "controllers/auth";
const router = Express.Router();

const NAMESPACE = "AUTH ROUTER";

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.delete('/logout', controller.logout);

export default router;