class Config {
    port: any;
    db: string;
    constructor() {
        this.port = process.env.PORT || 5000;
        this.db = process.env.MONGODB || 'mongodb://localhost:27017/shop'
    }
}

export default Config