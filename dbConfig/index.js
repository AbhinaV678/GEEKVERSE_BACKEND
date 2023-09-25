import mongoose from "mongoose";


const dbConnection = async ()=>{
    try {
        
        const connection = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        
        console.log("Connection successful");
    } catch (error) {
        console.log(error);
    }

    //db.js

// const url ="mongodb+srv://abhinav:gloxinia@cluster201.6nvldeq.mongodb.net/test";

// const connectionParams={
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to the database yippeee! ');
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. n${err}`);
//     })
};

export default dbConnection;