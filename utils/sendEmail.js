import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";
import { hashString } from "./index.js";
import Verification from "../models/emailVerification.js";
import PasswordReset from "../models/passwordReset.js";

dotenv.config();

const {AUTH_EMAIL,AUTH_PASSWORD,APP_URL}=process.env;

let transporter = nodemailer.createTransport({
    //host: "smtp-mail.outlook.com",
    service: 'gmail',
    auth:{
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

export const sendVerificationEmail = async(user,res)=>{

const {_id,email,lastName}=user;
const token = _id + uuidv4();
const link = APP_URL+"users/verify/"+_id+"/"+token;

const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",


    html: `<div>
    <h1>Please verify your email address</h1>
    <hr>
    <h4>Hi ${lastName},</h4>

    <p>
      Please verify your email address so we can know that it's really you.
      <br>
      <p>This link expires in one hour</p>
      <br>
      <a href=${link}>
        Email Address
      </a>
    </p>
  </div>`,
};

try {
    const hashedToken = await hashString(token);

    const newVerifiedEmail = await Verification.create({
        userId : _id,
        token: hashedToken,
        createdAt : Date.now(),
        expiresAt: Date.now() + 3600000,
    });

    if(newVerifiedEmail){
        transporter.sendMail(mailOptions)
        .then(()=>{
            res.status(201).send({
                success: "PENDING",
                message: "Verification email has been sent to your account.Check your email for further instructions."
            });
            
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json({message:"Something went wrong."});
        });
    }

} catch (error) {
    console.log(error);
    res.status(404).json({message:"Something went wrong"});
}

};

export const resetPasswordLink = async (user,res)=>{
    const {_id,email} = user;

    const token = _id + uuidv4();

    const link = APP_URL+"users/reset-password/" + _id + "/" + token;

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
    
    
        html: `<div>
        <p>
          Please click the link below to reset your password.
          <br>
          <p>This link expires in 10 minutes</p>
          <br>
          <a href=${link}>
            Email Address
          </a>
        </p>
      </div>`,
    };

    try {
        const hashedToken = await hashString(token);

        const resetEmail = await PasswordReset.create({
            userId : _id,
            email: email,
            token : hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
        });

        if(resetEmail){
            transporter.sendMail(mailOptions).then(()=>{
                res.status(201).send({
                    success: "PENDING",
                    message: "Reset password Link has been sent to your account.",
                });
            })
            .catch((err)=>{
                console.log(err);
                res.status(404).json({message : "Something went wrong"});
            });
        }

    } catch (error) {
        console.log(error);
                res.status(404).json({message : "Something went wrong"});
    }

}