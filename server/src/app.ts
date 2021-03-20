import express,{ Application, Request, Response } from 'express'
import bodyParser, { json } from 'body-parser'
import { router } from '../routes/'
class App {
    app: any
    constructor() {
        this.app = express()
        this._init()
    } 
    _init() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended : true}))
        this.app.use(json)
        this.app.use(router)
    }
}

export default App
