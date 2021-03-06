import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import LoginController from './logins/controller'
import BatchController from './batches/controller'
import EvaluationController from './evaluations/controller'
import StudentController from './students/controller'
import TeacherController from './teachers/controller'
import { Action, BadRequestError } from 'routing-controllers'
import { verify } from './jwt'
import Teacher from './teachers/entity'

export const app = createKoaServer({
  cors: true,
  controllers: [
    LoginController,
    BatchController,
    EvaluationController,
    StudentController,
    TeacherController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      if (token) {
        const { id } = verify(token)
        return Teacher.findOneById(id)
      }
    }
    return undefined
  }
})
