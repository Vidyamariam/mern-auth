import express from 'express';
import { login, getUsers, createUser, editUser } from '../controllers/admin.controller.js';

const router = express();

router.post('/adminlogin', login);
router.get('/users', getUsers);
router.post('/create', createUser);
router.post('/edit-user/:id', editUser);

export default router;
