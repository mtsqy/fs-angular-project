import Config from './config'
import App from './app'

let { app } = new App();
let config = new Config();

app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${config.port}`);
});