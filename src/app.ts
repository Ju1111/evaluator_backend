import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"

export const app = createKoaServer({
  cors: true,
  controllers: [
  ],
})
