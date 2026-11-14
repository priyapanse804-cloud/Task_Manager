const mysql2=require("mysql2")

const db=mysql2.createConnection({
     host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

const InitalDatabase=(callback)=>{
    db.connect((err)=>{
        if(err){
            return callback(err)
        }
        console.log("Mysql database connect");
        
    })
   
    db.query("CREATE DATABASE IF NOT EXISTS task_manager",(err)=>{
        if(err){
            return callback(err)
        }
        console.log("Database created");
        
    })
    db.changeUser({database:"task_manager"},(err)=>{
        if(err){
            return callback(err)
        }
        const createTable=`
        CREATE TABLE IF NOT EXISTS users (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                           name VARCHAR(100) NOT NULL,
                            email VARCHAR(100) UNIQUE NOT NULL,
                           password VARCHAR(255) NOT NULL
                        )
        `
        db.query(createTable,(err)=>{
            if(err){
                return callback(err)
            }
        })
        console.log("usertable creted");
        callback(null)
    })


    const createTaskTable=`
    CREATE TABLE IF NOT EXISTS tasks (
        id INT PRIMARY KEY AUTO_INCREMENT,

        title VARCHAR(100) NOT NULL,

        description TEXT,

        priority ENUM('Low', 'Medium', 'High')
        DEFAULT 'Medium',

        status ENUM('Pending', 'Completed')
        DEFAULT 'Pending',

        due_date DATE,

        user_id INT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
`
db.query(createTaskTable,(err)=>{
    if(err){
        return callback(err)
    }
    console.log("task table creted");
    
})

}
module.exports={
    db,
    InitalDatabase
}