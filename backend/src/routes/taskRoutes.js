const express=require("express")
const { createTaskController, getallTaskController, updateTaskController, deletTaskController, updateTaskStatusController } = require("../contollers/TaskController")
const authMiddleware = require("../middleware/authMiddleware")

const routes=express.Router()

routes.post("/create",authMiddleware,createTaskController)
routes.get("/get",getallTaskController)
routes.put("/updateTask/:id",authMiddleware,updateTaskController)
routes.delete("/deleteTask/:id",deletTaskController)
routes.patch("/:id/status",updateTaskStatusController)
module.exports=routes