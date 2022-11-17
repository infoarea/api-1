
const path = require('path');
const { readFileSync, writeFileSync} = require('fs');


/**
 * @desc Get all Product
 * @name GET /api/v1/product
 * @access Public
 */
const getAllProduct = ( req, res )=> {

    //Get users Data from json DB
   const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')))

   //show user Data
    res.json(products);

}



/**
 * @desc Create a Product
 * @name POST /api/v1/Product
 * @access Public
 */
 const createProduct = ( req, res )=> {

    //Get product data from json DB
   const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')))

   const { name, regularPrice, sellPrice, stock, photo } = req.body;

   //validation
   if ( !name || !regularPrice || !sellPrice  ) {
      
       res.status(400).json({
        message : "All fields are required!"
       })

   }else {


    products.push({
           id : Math.floor(Math.random() *100000),
           name : name,
           regularPrice : regularPrice,
           sellPrice : sellPrice,
       });

       writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(products));

       res.status(201).json({
           message : "Product created sucessfully!"
       });

   }



}



/**
 * @desc Get single product
 * @name GET /api/v1/product/id
 * @access Public
 */
 const singleProduct = ( req, res )=> {

    //Get product Data from json DB
   const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

   const singleProduct = products.find( data=> data.id == req.params.id);

   if (singleProduct) {
        res.status(200).json(singleProduct)
   } else {
    res.status(404).json({
        message : "Product not found!"
    })
   }
   

}



/**
 * @desc Delete product
 * @name Delete /api/v1/product/id
 * @access Public
 */
 const deleteProduct = ( req, res )=> {

    //Get product Data from json DB
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

   const productData = products.filter( data=> data.id != req.params.id);

    if (products.some(data => data.id == req.params.id)) {
        
           writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(productData));

           res.status(200).json({
            message : "Product Delete successfully!"
           });

    } else {

        res.status(404  ).json({
            message : "Product not found!"
           });
    }



}




/**
 * @desc Update Product
 * @name PUT/PATCH /api/v1/product/id
 * @access Public
 */
 const updateProduct = ( req, res )=> {

    const { name, regularPrice, sellPrice, stock, photo } = req.body;

    //Get product Data from json DB
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));


   if (products.some( data => data.id == req.params.id )) {


    products[products.findIndex(data=> data.id == req.params.id)] = {
        ...products[products.findIndex(data=> data.id == req.params.id)],
        name : name,
        regularPrice : regularPrice,
        sellPrice : sellPrice,
        stock : stock
       }
    
       writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(products));
    
       res.status(200).json({
        message : "Product Data updated successfully"
       })


   } else {

        res.status(404).json({
        message : "Product Data not found!"
       })

   }

  

}




//Exports module
module.exports = {
    getAllProduct,
    createProduct,
    singleProduct,
    deleteProduct,
    updateProduct
}