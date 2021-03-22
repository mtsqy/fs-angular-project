import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import { api } from '../api/'

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(api)

export { app }
