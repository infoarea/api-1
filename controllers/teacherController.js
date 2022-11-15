

const path = require('path');
const { readFileSync, writeFileSync} = require('fs');


/**
 * @decs Get all teacher
 * @name Get /api/v1/teacher
 * @access Public
 */

const getAllTeacher = ( req, res )=> {

    //Get users Data from json DB
   const teachers = JSON.parse(readFileSync(path.join(__dirname, '../db/teacher.json')))

   //show user Data
    res.status(200).json(teachers);

}




/**
 * @desc Create Teacher
 * @name POST /api/v1/user
 * @access Public
 */
 const createTeacher = ( req, res )=> {

    const teachers = JSON.parse(readFileSync(path.join(__dirname, '../db/teacher.json')))

    const { name, age, cell} = req.body;

    //validation
    if ( !name || !age || !cell ) {
       
        res.status(400).json({
            message : "The name & desig is required!"
        })

    }else {


        teachers.push({
            id : Math.floor(Math.random() *100000),
            name : name,
            age : age,
            cell : cell
        });

        writeFileSync(path.join(__dirname, '../db/teacher.json'), JSON.stringify(teachers));

        res.status(201).json({
            message : "Sent Data sucess!"
        });

    }
   
    
}



module.exports = {
    getAllTeacher,
    createTeacher
}


