import encrypt from "encryptjs";
import User from "../models/user.js";
import Product from "../models/product.js";
import { CronJob } from "cron";

let job = new CronJob(
    '*/5 */8 * * *',
    () => console.log(" 8 hours 5 minitues.")
)
job.start();

let customJob = new CronJob(
    '*/10 */9 * * *',
    () => console.log("nine hours 10 minutes")
)
customJob.start();

let newJob = new CronJob(
    '*/1 * * * *',
    async () => {
        await Product.updateOne({}, { $unset: { p_color: 1 } })
    }
)
newJob.start();


export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const response = await User.find({ email }).exec();
        if (response.length) return res.send("email already taken.");

        const secretpass = "pass";
        const encryptpass = encrypt.encrypt(password, secretpass, 256);



        const user = new User({
            name,
            email,
            password: encryptpass,
            role
        });

        await user.save();
        return res.send("registration successful");
    } catch (err) {
        return res.send(err);
    }
}

export const addProduct = async (req, res) => {
    try {
        const { p_name, p_price, p_color } = req.body;

        const product = new Product({
            p_name,
            p_price,
            p_color
        });
        await product.save();
        return res.send("Product added successfully.");
    } catch (error) {
        return res.send(error)
    }
}


export const pagination = async (req, res) => {
    try {
        const { page, limit } = req.body;
        const data = await Product.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const countdata = await Product.countDocuments();

        return res.send({
            data,
            totalpages: Math.ceil(countdata / page),
            currentPAge: page
        });



    } catch (error) {
        return res.send(error);
    }
}


export const filterPrice = async (req, res) => {
    try {
        const { price } = req.body;

        const response = await Product.find({}).exec();

        const data = response.filter(items => items.p_price <= price);

        return res.send(data);
        
        
    } catch (err) {
        return res.send(err);
    }
}