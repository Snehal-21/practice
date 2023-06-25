import product from "../models/product.js";
import user from "../models/user.js";
import encrypt from "encryptjs";
  

export const checks=async(req,res,next)=>{
    try{
        const{name,email,password,confirmpassword}=req.body;
        if(!name) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmpassword) return res.send("Confirm your passwprd");

        if(password <=5 || confirmpassword <=5) return res.send("password and confirm password must be more than 5 digits");
        if(password !=confirmpassword) return res.send("password and confirmpassword must be equal");

        next();

    }catch(err){
        return res.send(err)
    }
}

export  const checkRole=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        if(!email) return res.send("email is required");
        if(!password) return res.send("password is required");

        const response=await user.find({email}).exec();
        if(!response.length) return res.send("user not found");

        const secretpass="pass";
        const decipherpass=encrypt.decrypt(response[0].password,secretpass,256);

        if(decipherpass!=password){
            return res.send("Incorrect Password.");
        }

        if(response[0].role == 'seller'){
            next();
        }else{
            return res.send("Kindly register as a seller.");
        }

    }catch(err){
        return res.send(err)
    }
}
