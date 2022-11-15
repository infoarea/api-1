
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const userRoute = require('./routes/user');
const teacherRoute = require('./routes/teacher');


//express init
const app = express();
 
//dotenv init
dotenv.config();
const PORT = process.env.PORT || 4000;


//Data manage
app.use(express.json());
app.use(express.urlencoded({ extended : false }));



app.use('/api/v1/user', userRoute);
app.use('/api/v1/teacher', teacherRoute);

app.listen(PORT, ()=> {
    console.log(`server is running ${PORT}`.bgGreen.black);
}); 
