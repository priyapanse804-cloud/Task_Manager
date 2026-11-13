const taskModel=require("../models/taskModel")


const createTaskController=(req,res)=>{
    let user_id = req.user.id;
    let{title,description, priority , due_date}=req.body;
    if(!title || !description || !priority  || !due_date){
        return res.status(400).json({
            message:"All feilds are required"
        })
    }
    
    // taskModel.findOne(user_id,(err,task)=>{
    //     if(err){
    //         return res.status(500).json({
    //             err:err
    //         })
    //     }
    //     if(task){
    //         return res.status(409).json({
    //             message:"Task already exists"
    //         })
    //     }
    //     taskModel.createTask(title,description,priority,due_date,user_id,(err,result)=>{
    //         if(err){
    //             return res.status(500).json({
    //                 err:err
    //             })
    //         }
    //      return res.status(200).json({
    //         message:"task creteded succsfully",
    //         taskId:result.insertId
    //      })
    //     })
    // })
     
    // taskModel.findOne(user_id, (err, task) => {

    // if (err) {
    //     return res.status(500).json({ err });
    // }

    // if (task) {
    //     return res.status(409).json({
    //         message: "Task already exists"
    //     });
    // }

    // YAHAN CREATE TASK LIKHNA HAI
    taskModel.createTask(
        title, description, priority, due_date, user_id,
        (err, result) => {

            if (err) {
                return res.status(500).json({ err });
            }

            return res.status(201).json({
                message: "Task created successfully",
                taskId: result.insertId
            });
        }
    );
};


const getallTaskController=(req,res)=>{
    taskModel.getallTask((err,tasks)=>{
        if(err){
            return res.status(500).json({
                err:err
            })
        }
        return res.status(200).json({
            message:"All tasks",
            tasks:tasks
        })
    })
}

const updateTaskController=(req,res)=>{
    console.log("Update controller called");
    let{id}=req.params
    let{title,description, priority , due_date}=req.body
      let user_id = req.user.id;
    if(!title || !description || !priority  || !due_date){
        return res.status(400).json({
            message:"All feilds are required"
        })
    }
    console.log("User ID:", req.user);
console.log("Task ID:", id);
console.log("Before model call");
    taskModel.updateTask(id,title,description, priority , due_date, user_id ,(err,result)=>{
        if(err){
            return res.status(500).json({
                err:err
            })
        }
        return res.status(200).json({
            message:"Task updated successfully",
            taskId:result.insertId
        })
    })
}

const deletTaskController=(req,res)=>{
    let{id}=req.params

    taskModel.deletTask(id,(err,result)=>{
           if(err){
            return res.status(500).json({
                err:err
            })
           }
           if(result.affectedRows===0){
            return res.status(404).json({
                message:"Tasks not found"
            })
           }
           return res.status(200).json({
            message:"Tasks deleted successfully"
          
           })
    })
}



const updateTaskStatusController = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    const allowedStatus = ["Pending", "In Progress", "Completed"];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    taskModel.updateTaskStatus(id, status, (err, result) => {

        if (err) {
            return res.status(500).json({
                err: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task status updated successfully"
        });
    });
};


module.exports={
    createTaskController,
    getallTaskController,
    updateTaskController,
    deletTaskController,
    updateTaskStatusController
}