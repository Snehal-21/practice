import bcrypt from "bcryptjs";
import encryptjs from "encryptjs";

export const bcryptRegister = (req,res) =>{
    try{
        const {name, email, password} = req.body;

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, (err, salt) =>{
            if(err){
                return res.send(err);
            }
            bcrypt.hash(password, salt, (err,encryptedPass) =>{
                if(err){
                    return res.send(err)
                }
                return res.send(encryptedPass);
            })
        });
    }catch(err){
        return res.send(err);
    }
}


export const checkBcrypt = (req,res) =>{
    try{
        const {email, password} = req.body;
        const hashedPassword = "$2a$10$F51Ls1QAxTG34gMJIeLRUO4aSoW7fooFWbxfRBRJZv.tN38m6Un96";
        bcrypt.compare(password, hashedPassword, (err, result) =>{
            if(err){
                return res.send(err);
            }
            if(result){
                return res.send("Correct.");
            }else{
                return res.send("Incorrect.");
            }
        });
        
    }catch(err){
        return res.send(err);
    }
}