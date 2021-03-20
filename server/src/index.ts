import { config } from './config'
import { app } from './app'

app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${config.port}`);
});