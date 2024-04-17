import express from 'express'
import {
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  handleGetAllUsers
} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/').get(handleGetAllUsers).post(createUser)

userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)

export default userRouter
