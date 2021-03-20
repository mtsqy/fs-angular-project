import express from 'express'
import * as userApi from '../controllers/user'

const api = express.Router()

api.get('/ping', userApi.ping)
api.post('/api/login', userApi.login)
api.post('/api/register', userApi.register)

export { api }