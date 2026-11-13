const {db}=require("../config/db")


const findOne=(email,callback)=>{
    const sql="SELECT * FROM users WHERE email=?"
    db.query(sql,[email],(err,result)=>{
        if(err){
            return callback(err)
        }
        callback(null,result[0]||null)
    })
}
const createUser=(name,email,password,callback)=>{
    const sql=`INSERT INTO users (name,email,password)
         VALUES(?,?,?) 
         `
         db.query(sql,[name,email,password],callback)
}
const getallUsers=(callback)=>{
     const sql="SELECT name,email,password FROM users"
     db.query(sql,callback)
}


const updateUSer=(id,name,email,password,callback)=>{
    const sql=`UPDATE users
     SET name=? ,  email=? , password=?
     WHERE id=?
    `
    db.query(sql,[name,email,password,id],(err,result)=>{
         if(err){
        return callback(err)

    }
    
    callback(null,result)
    })
   
}

const deletUser=(id,callback)=>{
    const sql="DELETE FROM users"

    db.query(sql,[id],(err,result)=>{
        if(err){
            return callback(err)
        }
        callback(null,result)
    })
}
module.exports={
     findOne,
     createUser,
     getallUsers,
     updateUSer,
     deletUser
}