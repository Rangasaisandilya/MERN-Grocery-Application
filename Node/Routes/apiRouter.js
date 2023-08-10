const express = require('express');
const router = express.Router();
const Product = require('../Models/Product')
const {request, response} = require("express");


// get all the products

router.get('/products',async(request,response)=>{
    try {
        let findAllProducts = await Product.find();

        if (findAllProducts ){
            response.status(200).json({
                success:true,
                products:findAllProducts
            })
        }
    }
    catch (e) {
        console.log(e);
        response.status(500).json({
            message:e.message
        })
    }
})

// find single products by id


router.get('/products/:id',async(req,res)=>{
    try {
        const findproduct = req.params.id;
        const product = await Product.findById(findproduct);
        if(product){
            res.status(200).json({
                success:true,
                product:product
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:'No products found'
            })
        }
    }
    catch (e) {
        console.log(e);
        response.status(500).json({
            message:e.message
        })
    }

})

// create product

router.post('/products',async(request,response)=>{
    try{
        let newProduct = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            quantity : request.body.quantity,
            info : request.body.info
        };

        //product exits or not

        let product = await Product.findOne({name:request.body.name})
        if (product){
            return response.status(401).json({
                success:false,
                message:'Product already exists'
            })
        }

        product = new Product(newProduct);
        product = await product.save();
        response.status(200).json({
            success:true,
            message:'product created successfully',
            product:product

        })
    }
    catch (e) {
        response.status(500).json({
            message:e.message
        })
    }
} )

//update the product by id

router.put('/products/:id',async(request,response)=>{

    try{
        let productId = request.params.id;
        console.log(productId);
        let updatedProduct = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            quantity : request.body.quantity,
            info : request.body.info
        }

        let product = await Product.findById(productId);
        if(!product){
            return response.status(401).json({
                success:false,
                message:'Product not found'
            })
        }

        product = await Product.findByIdAndUpdate(productId,{$set:updatedProduct},{new:true});
        response.status(200).json({
            success:true,
            product:product
        })
    }
    catch (e) {
        response.status(500).json({
            message:e.message
        })
    }

})

//delete product by id

router.delete('/products/:id',async(request,response)=>{
    try{
        let productId = request.params.id;
        let product = await Product.findById(productId);
        if(!product){
            return response.status(401).json({
                success:false,
                message:'Product not found'
            })
        }

        product = await Product.findByIdAndDelete(productId);
        response.status(200).json({
            success:true,
            message:'product deleted successfully',
            product:product
        })
    }

    catch (e) {
        response.status(500).json({
            message:e.message
        })
    }
})




module.exports= router;