import express from 'express';

import {Test, updateUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', Test)
router.post('/update/:id', verifyToken, updateUser );
router.delete('/delete/:id', verifyToken, deleteUser );

export default router;