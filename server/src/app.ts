import express, { Application, Request, Response } from 'express'
import bodyParser, { json, urlencoded } from 'body-parser'
import { api } from '../api/'

const cors = require('cors')
const app = express()

app.use(cors)
app.use(json)
app.use(urlencoded({extended: false}))
app.use(api)

export { app }