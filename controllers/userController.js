
const path = require('path');
const { readFileSync, writeFileSync} = require('fs');


/**
 * @desc Get all user
 * @name GET /api/v1/user
 * @access Public
 */
const getAllUser = ( req, res )=> {

    //Get users Data from json DB
   const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')))

   //show user Data
    res.json(users)

}


/**
 * @desc Create user
 * @name POST /api/v1/user
 * @access Public
 */
 const createUser = ( req, res )=> {

    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')))

    const { name, skill } = req.body;

    //validation
    if ( !name || !skill ) {
       
        res.status(400).json({
            message : "The name & skill is required!"
        })

    }else {


        users.push(req.body);

        writeFileSync(path.join(__dirname, '../db/user.json'), JSON.stringify(users));


        res.status(201).json({
            message : "Sent to DB sucess!"
        })

    }
   
    
}




module.exports = {
    getAllUser,
    createUser
}