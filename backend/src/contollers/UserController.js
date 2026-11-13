const userModel=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const registerController = (req, res) => {

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    userModel.findOne(email, (err, users) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (users) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        bcrypt.hash(password, 10, (err, hashPassword) => {

            if (err) {
                return res.status(500).json({ err });
            }

            userModel.createUser(
                name,
                email,
                hashPassword,
                (err, result) => {

                    if (err) {
                        return res.status(500).json({ err });
                    }

                    const token = jwt.sign(
                        { id: result.insertId },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );

                    res.cookie("token", token);

                    return res.status(201).json({
                        message: "User created successfully",
                        userId: result.insertId
                    });
                }
            );
        });
    });
};
const loginController = (req, res) => {

    let { email,name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    userModel.findOne(email, (err, users) => {

        if (err) {
            return res.status(500).json({ err });
        }

        if (!users) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        bcrypt.compare(password, users.password, (err, isMatch) => {

            if (err) {
                return res.status(500).json({ err });
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            const token = jwt.sign(
                { id: users.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.cookie("token", token);

            return res.status(200).json({
                message: "User logged in successfully",
                userId: users.id,
                 name: users.name
            });
        });
    });
};
const getallUsersController=(req,res)=>{
    userModel.getallUsers((err,users)=>{
       if(err){
        return res.status(500).json({
            err:err
        })
     }
     if(!users){
        return res.status(200).json({
            message:"user not found"
        })
     }
     return res.status(200).json({
        message:"All users",
        users:users
     })
    })
    
    
}

const updateUSerController=(req,res)=>{
    let{id}=req.params
  let{name,email,password}=req.body;
  if(!name || !email || !password){
    return res.status(400).json({
        message:"All feilds are required"
    })
  }
 bcrypt.hash(password,10,(err,hashPassword)=>{
    if(err){
        return res.status(500).json({
            err:err
        })
    }
    userModel.updateUSer(
        id,
        name,
        email,
        hashPassword,
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    err:err
                })
            }
            if(result.affectedRows==0){
                return res.status(404).json({
                    message:"user not found"
                })
            }
         return res.status(200).json({
            message:"user update succesfully",
            
         })
        }
    )
    
 })
}

const deletUserController=(req,res)=>{
    let{id}=req.params

    userModel.deletUser(id,(err,result)=>{
        if(err){
            return res.status(500).json({
                err:err
            })
        }
        return res.status(200).json({
            message:"USer Deleted succesfully",
            userId:result.insertId
        })
    })
}

const logoutController = (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout successfully"
    });
};


module.exports={
    registerController,
    loginController,
    getallUsersController,
    updateUSerController,
    logoutController,
    deletUserController
}