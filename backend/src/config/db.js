import { connect } from "mongoose";


const db = async() => {
    try {
        const mongoDb = await connect(process.env.MONGO_URI)
        console.log(`Database connected`)
    } catch (e) {
        console.log(`Database connection failed`, e)
    }
}

export default db
