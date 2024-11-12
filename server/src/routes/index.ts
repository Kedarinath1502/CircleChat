import {Router} from "express"
import AuthController from "../controllers/AuthController.js"
import AuthMiddleware from "../middlewares/AuthMiddleware.js"
import ChatGroupController from "../controllers/ChatGroupController.js"
import ChatGroupUserController from "../controllers/ChatGroupUserController.js"
import ChatsController from "../controllers/ChatController.js"


const router = Router()
router.post("/auth/login", AuthController.login, () => console.log("route called"))

router.post("/chat-group", AuthMiddleware, ChatGroupController.store)
router.get("/chat-group", AuthMiddleware, ChatGroupController.index)
router.get("/chat-group/:id", ChatGroupController.show)
router.put("/chat-group/:id", AuthMiddleware, ChatGroupController.update)
router.delete("/chat-group/:id", AuthMiddleware, ChatGroupController.destroy)

router.get("/chat-group-user", ChatGroupUserController.index);
router.post("/chat-group-user", ChatGroupUserController.store);

router.get("/chats/:groupId", ChatsController.index);

export default router