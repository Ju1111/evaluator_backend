import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import LoginController from './logins/controller'
import BatchController from './batches/controller'
import EvaluationController from './evaluations/controller'
import StudentController from './students/controller'
import { Action, BadRequestError } from 'routing-controllers'
import { verify } from './jwt'

export const app = createKoaServer({
  cors: true,
  controllers: [
    LoginController,
    BatchController,
    EvaluationController,
    StudentController
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
})
