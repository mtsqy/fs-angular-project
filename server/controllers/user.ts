export const ping = (req: any, res: any) => {
    res.status(200).json('pong!');
    console.log('wawa')
    res.end()
}


export const login = (req: any, res: any, next: any) => {
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

export const register = (req: any, res: any, next: any) => {
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