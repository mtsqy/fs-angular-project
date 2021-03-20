import express from 'express'
import * as userApi from '../controllers/user'

const router = express.Router()

router.get('/ping', userApi.ping)
router.post('/api/login', userApi.login)
router.post('/api/register', userApi.register)

export { router }