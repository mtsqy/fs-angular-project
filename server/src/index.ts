import { config } from './config'
import { app } from './app'

app.listen(config.port, () => {
  // tslint:disable-next-line: no-console
  console.log(
    `⚡️[server]: Server is running at https://localhost:${config.port}`
  )
})
