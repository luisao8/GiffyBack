import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .get('/', getAllUsers)
  .post('/register', registerUser)
  .post('/login', loginUser) 
  .post('/logout', loginUser)

export default userRouter;