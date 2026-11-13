const express=require("express")
const { registerController, loginController, getallUsersController, updateUSerController, logoutController, deletUserController } = require("../contollers/UserController")
const authMiddleware = require("../middleware/authMiddleware")

const routes=express.Router()

routes.post("/register",registerController)
routes.post("/login",loginController)
routes.get("/get",authMiddleware,getallUsersController)
routes.put("/update/:id",updateUSerController)
routes.post("/logout",logoutController)
routes.delete("/delete/:id",deletUserController)
module.exports=routes