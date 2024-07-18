const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');


const Kategory = require("../model/kategoryModel")
const Food = require("../model/food.Model")


const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) {
            throw err
        }
    })
}
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const kategoryCtrl = {
    
addKategory: async (req,res) => {

    try {
        if(req.user.isAdmin){
            if(req.files){
                const {photo} = req.files
                const result = await cloudinary.v2.uploader.upload(photo.tempFilePath,{folder: 'BekkendJ4Pizza01'}, async (err, result)=>{
                    if (err) {
                        throw err
                    }
                    removeTemp(photo.tempFilePath)
                    return result
                })
                const kategoryImg = {url: result.secure_url, public_id:result.public_id}
    
                req.body.kategoryImg = kategoryImg;
                const newKategoryI = await Kategory.create(req.body)
        
                res.status(201).send({message: "succes",newKategoryI})
            }else {
                res.status(400).send({message: "iltmos rasm yuboring"})
            }
        }
    } catch (error) {
    return res.status(503).send({message: error.message})
    }
    },
    getKategory: async (req,res) => {
        const {id} = req.params
        try {
            const kategory = await Kategory.findById(id)
            if(kategory){
                res.status(200).send({message: "succes",kategory})
            }else {
              res.status(404).send({message: "kategory not found"})
            }
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
    getAllKategory: async (req,res) => {
        try {
            const kategory = await Kategory.find()
            if(kategory.length > 0){
                res.status(200).send({message: "succes",kategory})
            }else {
              res.status(404).send({message: "kategory not found"})
            }
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
    deleteKategory: async (req,res) => {
        const {id} = req.params
        try {
            if(req.user.isAdmin){
              const kategory = await Kategory.findById(id)
                if(kategory){
                    let public_id = kategory.kategoryImg.public_id
                    await cloudinary.v2.uploader.destroy(public_id,async (err) => {
                        if(err){
                            throw err
                        }
                    })
                   const kategor = await Kategory.findByIdAndDelete(id)
                //    ovqatlarni o'chirish
                const foods = await Food.find({kategoryId: id})
                    if(foods.length > 0){
                       foods.map(async(foods)=>{
                        let public_id = foods.foodImg.public_id
                        let deletImg = await cloudinary.v2.uploader.destroy(public_id,async (err) => {
                            if(err){
                             throw err
                            }
                        })
                        })

                    }else {
                        res.status(404).send({message: "food not found"})
                    }
                const food = await Food.deleteMany({kategoryId: id})
                   return res.status(200).send({message: "succes deleted kategory",kategor,food})
                }else {
                    return res.status(404).send({message: "kategory not found"})
                }
            }

 
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
    updateKategory: async (req,res) => {
        const {id} = req.params
        
        try {
            if(req.user.isAdmin){
                let kategory = await Kategory.findById(id)
                if(kategory){
                    if(req.files){
                        const {photo} = req.files
                        let public_id = kategory.kategoryImg.public_id
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
                        const kategoryImg = {url: result.secure_url, public_id:result.public_id}
            
                        req.body.kategoryImg = kategoryImg;
                    }
                   kategory = await Kategory.findByIdAndUpdate(id,req.body,{new:true})
                    res.status(200).send({message: "succes update kategory",kategory})
                }else {
                  res.status(404).send({message: "kategory not found"})
                }
            }

 
        } catch (error) {
            return res.status(503).send({message: error.message})   
        }
    },
}

module.exports = kategoryCtrl