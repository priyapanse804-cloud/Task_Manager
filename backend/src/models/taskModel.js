const {db}=require("../config/db")

const findOne = (user_id, callback) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ?";

    db.query(sql, [user_id], (err, result) => {
        if(err){
            return callback(err);
        }

        callback(null, result[0] || null);
    });
}

const createTask=( title,description, priority , due_date, user_id ,callback)=>{
    const sql=`
       INSERT INTO tasks(title,description, priority,due_date,user_id)
       VALUES(?,?,?,?,?)
       `
 db.query(sql, [title,description, priority,due_date, user_id], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
}

// const getallTask=(callback)=>{
//     const sql=`SELECT title,description, priority,due_date, user_id FROM 
//       tasks
//     `
//     db.query(sql,callback)
// }

const getallTask = (callback) => {
    const sql = `SELECT * FROM tasks`;

    db.query(sql, callback);
};

const updateTask = (id, title, description, priority, due_date, user_id, callback) => {

    const sql = `
        UPDATE tasks
        SET title=?, description=?, priority=?, due_date=?
        WHERE id=? AND user_id=?
    `;

    db.query(sql, [title, description, priority, due_date, id, user_id], (err, result) => {

        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
};

const deletTask=(id,callback)=>{
    const sql="DELETE FROM tasks  WHERE id = ?"

    db.query(sql,[id],(err,result)=>{
        if(err){
            return callback(err)
        }
        callback(null,result)
    })
}

const updateTaskStatus = (id, status, callback) => {

    const sql = `
        UPDATE tasks
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
};
module.exports={
    createTask,
    findOne,
    getallTask,
     updateTask,
     deletTask,
     updateTaskStatus
}