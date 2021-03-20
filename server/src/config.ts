const config = {
    port: process.env.PORT || 3300,
    db: process.env.MONGODB || 'mongodb://localhost:27017/shop'
}

export { config }