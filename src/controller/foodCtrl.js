const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');


const Food = require("../model/food.Model")


const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) {
            throw err
        }
    })
}
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const foodCtrl = {
addFood: async (req,res) => {
try {
    const {photo} = req.files
    if(req.user.isAdmin){

        if(req.files){

            const result = await cloudinary.v2.uploader.upload(photo.tempFilePath,{folder: 'BekkendJ4Pizza01'}, async (err, result)=>{
                if (err) {
                    throw err
                }
                removeTemp(photo.tempFilePath)
                return result
            })
            // const food = req.body
            const foodImg = {url: result.secure_url, public_id:result.public_id}

            req.body.foodImg = foodImg;
            const newFood = await Food.create(req.body)
            // console.log(image);
    
            res.status(201).send({message: "succes",newFood})
        }else {
            res.status(400).send({message: "iltmos rasm yuboring"})
        }
    }
} catch (error) {
    return res.status(503).send({message: error.message})
     }
    },
    getFood: async (req,res) => {
        const {id} = req.params
        try {
            const food = await Food.findById(id)
            if(food){
                res.status(200).send({message: "succes",food})
            }else {
              res.status(404).send({message: "food not found"})
            }
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
    getAllFood: async (req,res) => {
        try {
            const foods = await Food.find()
            if(foods){
                res.status(200).send({message: "succes",foods})
            }else {
              res.status(404).send({message: "food not found"})
            }
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
    deleteFood: async (req,res) => {
        const {id} = req.params
        try {
            if(req.user.isAdmin){
              const food = await Food.findById(id)
                if(food){
                    let public_id = food.foodImg.public_id
                    await cloudinary.v2.uploader.destroy(public_id,async (err) => {
                        if(err){
                            throw err
                        }
                    })
                   const fod = await Food.findByIdAndDelete(id)
                    res.status(200).send({message: "succes deleted food",food})
                }else {
                  res.status(404).send({message: "food not found"})
                }
            }

 
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
    updateFood: async (req,res) => {
        const {id} = req.params
        try {
            if(req.user.isAdmin){
              let food = await Food.findById(id)
                if(food){
                    if(req.files){
                        let public_id = food.foodImg.public_id
                        await cloudinary.v2.uploader.destroy(public_id,async (err) => {
                            if(err){
                                throw err
                            }
                        })

                        const result = await cloudinary.v2.uploader.upload(photo.tempFilePath,{folder: 'BekkendJ4Pizza01'}, async (err, result)=>{
                            if (err) {
                                throw err
                            }
                            removeTemp(photo.tempFilePath)
                            return result
                        })
                        const foodImg = {url: result.secure_url, public_id:result.public_id}
            
                        req.body.foodImg = foodImg;
                        // const updateFood = await Food.findByIdAndUpdate(req.body)
                
                        // res.status(201).send({message: "succes",updateFood})
                    }
                   food = await Food.findByIdAndUpdate(id,req.body,{new:true})
                    res.status(200).send({message: "succes update food",food})
                }else {
                  res.status(404).send({message: "food not found"})
                }
            }

 
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
}

module.exports = foodCtrl