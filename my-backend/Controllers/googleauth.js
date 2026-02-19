import express from "express";
import dotenv from "dotenv";  
import passport from "passport";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
    
router.get('/auth/google', (req, res, next) => {
    passport.authenticate('google', { 
        scope: ['profile', 'email'], 
        session: false 
    })(req, res, next);
});
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  const user = req.user;

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
  
  res.redirect("/"); 
});

export default router;
