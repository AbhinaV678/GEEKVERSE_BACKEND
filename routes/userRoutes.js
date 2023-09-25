import express from "express";
import path from "path";
import { changePassword, requestPassswordReset, resetPassword, verifyEmail } from "../controllers/userController.js";
import { resetPasswordLink } from "../utils/sendEmail.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token",verifyEmail);
router.post("/request-passwordreset",requestPassswordReset);

router.get("/reset-password/:userId/:token",resetPassword);

router.post("/request-password",changePassword);

router.get("/verified",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/build","index.html"));
});

router.get("/resetpassword",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/build","index.html"));
});

export default router;