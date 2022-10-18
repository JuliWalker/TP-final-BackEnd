import 'dotenv/config'

const options = {
    mongoDB:{
        URL: process.env.DB_MONGO,
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}

export default options