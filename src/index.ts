import 'reflect-metadata'
import setupDb from './db'
import { app } from "./app"

const port = process.env.PORT || 4000

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
