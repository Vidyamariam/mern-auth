import express from 'express';
import { login, getUsers, createUser } from '../controllers/admin.controller.js';

const router = express();

router.post('/adminlogin', login);
router.get('/users', getUsers);
router.post('/create', createUser);

export default router;
