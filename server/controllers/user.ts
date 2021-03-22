import { Handler, Request, Response } from 'express'

export const ping = (Request: Request, res: Response) => {
    res.status(200).json('pong!');
    res.end()
}

export const login = (req: Request, res: Response, next: Handler) => {
    if (req.body.email === 'test@test.com') {
        res.status(200).json({
          status: 'success',
          token: '1234567'
        });
    } else {
        res.status(400).json({
            status: 'error'
        });
    }
}

export const register = (req: Request, res: Response, next: Handler) => {
    if (req.body.email === 'test@test.com') {
        res.status(201).json({
          status: 'success',
          token: '1234567'
        });
    } else {
        res.status(400).json({
            status: 'error'
        });
    }
}