import mongoose, { ConnectOptions } from "mongoose";

const dbUri='mongodb://localhost/test';

mongoose.connect(dbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(db=>console.log("🚀 conectado a mongodb!" ))
    .catch(err => console.log(err));



