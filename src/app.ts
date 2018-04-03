import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import LoginController from './logins/controller'
import BatchController from './batches/controller'
import { Action, BadRequestError } from 'routing-controllers'
import { verify } from './jwt'

export const app = createKoaServer({
  cors: true,
  controllers: [
    LoginController,
    BatchController
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
