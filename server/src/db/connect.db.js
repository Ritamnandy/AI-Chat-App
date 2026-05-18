

import mongoose from "mongoose";
import { db_Name } from "../constants.js"

const connectDB = async () => {
    try {

        const response = await mongoose.connect(`${process.env.MONGO_DB_URL}/${db_Name}`)
        console.log("Data Base connected !! DB host :- ", response.connection.host);


    } catch (error) {
        console.log(error);

    }
}


export { connectDB }