
const path = require('path');
const { readFileSync, writeFileSync} = require('fs');


/**
 * @desc Get all user
 * @name GET /api/v1/user
 * @access Public
 */
const getAllUser = ( req, res )=> {

    //Get users Data from json DB
   const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')))

   //show user Data
    res.json(users)

}


/**
 * @desc Create user
 * @name POST /api/v1/user
 * @access Public
 */
 const createUser = ( req, res )=> {

    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')))

    const { name, skill } = req.body;

    //validation
    if ( !name || !skill ) {
       
        res.status(400).json({
            message : "The name & skill is required!"
        })

    }else {


        users.push({
            id : Math.floor(Math.random() *100000),
            name : name,
            skill : skill
        });

        writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(users));

        res.status(201).json({
            message : "Sent Data sucess!"
        });

    }
   
    
}


/**
 * @desc Get single user
 * @name GET /api/v1/user/id
 * @access Public
 */
 const singleUser = ( req, res )=> {

    //Get users Data from json DB
   const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));

   const singleUserData = users.find( data=> data.id == req.params.id);

   if (singleUserData) {
        res.status(200).json(singleUserData)
   } else {
    res.status(404).json({
        message : "Sing user not found!"
    })
   }

   

}


/**
 * @desc Delete user
 * @name Delete /api/v1/user/id
 * @access Public
 */
 const deleteUser = ( req, res )=> {

    //Get users Data from json DB
   const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));

   const data = users.filter( data=> data.id != req.params.id);

    if (users.some(data => data.id == req.params.id)) {
        
           writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(data));
           res.status(200).json({
            message : "User Delete successfull!"
           })
    } else {

        res.status(404  ).json({
            message : "User not found!"
           })
    }



}



/**
 * @desc Update user
 * @name PUT/PATCH /api/v1/user/id
 * @access Public
 */
 const updateUser = ( req, res )=> {

    const {name, skill} = req.body;

    //Get users Data from json DB
   const users = JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));


   if (users.some( data => data.id == req.params.id )) {


    users[users.findIndex(data=> data.id == req.params.id)] = {
        ...users[users.findIndex(data=> data.id == req.params.id)],
        name : name,
        skill : skill
       }
    
       writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(users));
    
       res.status(200).json({
        message : "User Data updated successfully"
       })


   } else {

        res.status(404).json({
        message : "user Data not found!"
       })

   }

  

  

}




module.exports = {
    getAllUser,
    createUser,
    singleUser,
    deleteUser,
    updateUser
}