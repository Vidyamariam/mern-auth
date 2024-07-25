import express from 'express';
import { login, signup, google, logout } from '../controllers/auth.controller.js';

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", logout);

export default router;