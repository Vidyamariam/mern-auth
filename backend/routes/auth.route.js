import express from 'express';
import { login, signup, google } from '../controllers/auth.controller.js';

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);

export default router;