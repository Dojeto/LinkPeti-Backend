import express from 'express';
import cors from 'cors'
import { config } from 'dotenv';
import auth from './routes/jwtauth.js'
import dashboard from './routes/dashboard.js'
// import mongo from './models/db.js'
import mongoose from 'mongoose';
import managelinks from './routes/managelinks.js'
import home from './routes/home.js'
import corsOptions from "./config/corsOptions.js";

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

const app = express();
config();

app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.use('/',home)
app.use('/auth',auth);
app.use('/dashboard',dashboard);
app.use('/manage',managelinks);

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`listening on ${port}`);
    })
})