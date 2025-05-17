import mongoose from 'mongoose';

export const ConnectDB = async () => {
    try {
        const Conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Mongo DB Connected Successfull To ', Conn.connection.host)
    } catch (error) {
        console.log('Failed To Connect To  Mongo DB ')
        process.exit(1)
    }
}